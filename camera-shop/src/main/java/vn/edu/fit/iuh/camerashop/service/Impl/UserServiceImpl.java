package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.dto.UserDTO;
import vn.edu.fit.iuh.camerashop.dto.request.UserRequest;
import vn.edu.fit.iuh.camerashop.entity.User;
import vn.edu.fit.iuh.camerashop.exception.BadRequestException;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.UserRepository;
import vn.edu.fit.iuh.camerashop.service.IUserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserDTO> getAll() {
        List<User> userList = userRepository.findAll();

        List<UserDTO> userDTOs = userList.stream()
                .map(user -> UserDTO.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .dateOfBirth(user.getDateOfBirth())
                        .role(user.getRole())
                        .build()
                ).toList();

        return userDTOs;
    }

    @Override
    public UserDTO getById(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User is not found"));

        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .address(user.getAddress())
                .dateOfBirth(user.getDateOfBirth())
                .role(user.getRole())
                .build();
    }

    @Override
    public User getUserById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User is not found"));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public void add(UserRequest userRequest) {
        Map<String, String> infoMessage = new HashMap<String, String>();

        if (userRequest.getEmail() == null){
            infoMessage.put("email","Email must be required.");
        }
        if (userRequest.getFullName() == null){
            infoMessage.put("name","Name must be required.");
        }
        if (userRequest.getPhone() == null){
            infoMessage.put("phone","Phone must be required.");
        }
        if (userRequest.getAddress() == null){
            infoMessage.put("address","Address must be required.");
        }
        if (!infoMessage.isEmpty()){
            throw new BadRequestException("Bad request", infoMessage);
        }

        User user = User.builder()
                .fullName(userRequest.getFullName())
                .email(userRequest.getEmail())
                .phone(userRequest.getPhone())
                .address(userRequest.getAddress())
                .dateOfBirth(userRequest.getDateOfBirth())
                .build();

        userRepository.save(user);
    }

    @Override
    public void update(long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User is not found"));

        user.setFullName(userRequest.getFullName());
        user.setEmail(userRequest.getEmail());
        user.setPhone(userRequest.getPhone());
        user.setAddress(userRequest.getAddress());
        user.setDateOfBirth(userRequest.getDateOfBirth());

        userRepository.save(user);
    }

    @Override
    public void delete(long id) {
         userRepository.deleteById(id);
    }
}
