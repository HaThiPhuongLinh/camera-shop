package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.config.service.JwtService;
import vn.edu.fit.iuh.camerashop.dto.request.AuthRequest;
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
public class AuthServiceImpl implements IAuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;

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

        return AuthResponse.builder()
                .token(token)
                .refreshToken(jwtService.generateRefreshToken(user))
                .email(user.getEmail())
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
                .build());
    }

    @Override
    public AuthResponse refreshToken(RefreshTokenRequest refreshToken) {
        String email = jwtService.extractEmail(refreshToken.getRefreshToken());
        User user = userRepository.findByEmail(email).get();
        String token = "";

        if (jwtService.isTokenValid(refreshToken.getRefreshToken(), user)) {
             token = jwtService.generateToken(user);
        } else {
            throw new BadRequestException("Invalid Refresh Token");
        }

        return AuthResponse.builder()
                .token(token)
                .refreshToken(refreshToken.getRefreshToken())
                .email(user.getEmail())
                .build();
    }
}
