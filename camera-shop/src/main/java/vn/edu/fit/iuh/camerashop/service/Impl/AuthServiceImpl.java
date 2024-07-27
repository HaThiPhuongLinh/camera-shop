package vn.edu.fit.iuh.camerashop.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.config.service.JwtService;
import vn.edu.fit.iuh.camerashop.dto.request.AuthRequest;
import vn.edu.fit.iuh.camerashop.dto.request.CartRequest;
import vn.edu.fit.iuh.camerashop.dto.request.RefreshTokenRequest;
import vn.edu.fit.iuh.camerashop.dto.request.RegistrationRequest;
import vn.edu.fit.iuh.camerashop.dto.response.AuthResponse;
import vn.edu.fit.iuh.camerashop.entity.User;
import vn.edu.fit.iuh.camerashop.entity.enums.Role;
import vn.edu.fit.iuh.camerashop.exception.BadRequestException;
import vn.edu.fit.iuh.camerashop.repository.UserRepository;
import vn.edu.fit.iuh.camerashop.service.IAuthService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CartServiceImpl cartService;
    private final JmsTemplate jmsTemplate;

    @Override
    public AuthResponse login(AuthRequest authRequest) {
        if (authRequest.getEmail() == null || authRequest.getPassword() == null)
            throw new BadRequestException("Please fill full info");

        if(!userRepository.existsByEmail(authRequest.getEmail()))
            throw new BadRequestException("Email not found");

        User user = userRepository.findByEmail(authRequest.getEmail()).get();
        if(!new BCryptPasswordEncoder().matches(authRequest.getPassword(), user.getPassword()))
            throw new BadRequestException("Password is incorrect");

        String token = jwtService.generateToken(user);

        if (cartService.getCartByUserId(user.getId()) == null) {
            CartRequest cartRequest = CartRequest.builder()
                    .userId(user.getId())
                    .build();
            cartService.createCart(cartRequest);
        }

        return AuthResponse.builder()
                .token(token)
                .refreshToken(jwtService.generateRefreshToken(user))
                .id(user.getId())
                .build();
    }

    @Override
    public void register(RegistrationRequest registrationRequest) {
        Map<String, String> infoMessage = new HashMap<String, String>();
        if (registrationRequest.getEmail() == null){
            infoMessage.put("email","Email must be required.");
        }
        if (registrationRequest.getPassword() == null){
            infoMessage.put("password","Password must be required.");
        }
        if (registrationRequest.getFullName() == null){
            infoMessage.put("name","Name must be required.");
        }
        if (registrationRequest.getPhone() == null){
            infoMessage.put("phone","Phone must be required.");
        }

        if (registrationRequest.getAddress() == null){
            infoMessage.put("address","Address must be required.");
        }

        if (!infoMessage.isEmpty()){
            throw new BadRequestException("Please complete all required fields to proceed.", infoMessage);
        }

        if(userRepository.existsByEmail(registrationRequest.getEmail()))
            throw new BadRequestException("Email address already in use");

        userRepository.save(User.builder()
                .email(registrationRequest.getEmail())
                .password(new BCryptPasswordEncoder().encode(registrationRequest.getPassword()))
                .fullName(registrationRequest.getFullName())
                .phone(registrationRequest.getPhone())
                .address(registrationRequest.getAddress())
                .role(Role.USER)
                .dateOfBirth(registrationRequest.getDateOfBirth())
                .createAt(LocalDateTime.now())
                .status(true)
                .build());

        Map<String, Object> emailMessage = new HashMap<>();
        emailMessage.put("recipient", registrationRequest.getEmail());
        emailMessage.put("userName", registrationRequest.getFullName());
        emailMessage.put("type", "registration");

        jmsTemplate.convertAndSend("email_queue", emailMessage);
    }

    @Override
    public AuthResponse refreshToken(RefreshTokenRequest refreshToken) {
        String email = jwtService.extractEmail(refreshToken.getRefreshToken());

        if (email == null) {
            throw new BadRequestException("Invalid Refresh Token: Email extraction failed");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User not found"));

        if (jwtService.validateToken(refreshToken.getRefreshToken(), user)) {
            String token = jwtService.generateToken(user);
            return AuthResponse.builder()
                    .token(token)
                    .refreshToken(refreshToken.getRefreshToken())
                    .id(user.getId())
                    .build();
        } else {
            throw new BadRequestException("Invalid Refresh Token");
        }
    }

}
