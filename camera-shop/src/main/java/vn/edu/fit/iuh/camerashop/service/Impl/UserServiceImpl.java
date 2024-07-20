package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.dto.UserDTO;
import vn.edu.fit.iuh.camerashop.dto.request.UserRequest;
import vn.edu.fit.iuh.camerashop.entity.User;
import vn.edu.fit.iuh.camerashop.entity.enums.Role;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.UserRepository;
import vn.edu.fit.iuh.camerashop.service.IUserService;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserDTO> getAll() {
        List<User> userList = userRepository.findAll();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<UserDTO> userDTOs = userList.stream().map(
                        user -> getUserDTO(authentication, user))
                .toList();

        return userDTOs;
    }

    @Override
    public UserDTO getById(long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = getUserById(id);

        return getUserDTO(authentication, user);
    }

    private UserDTO getUserDTO(Authentication authentication, User user) {
        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(Role.ADMIN.name()))) {
            return UserDTO.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .fullName(user.getFullName())
                    .phone(user.getPhone())
                    .address(user.getAddress())
                    .dateOfBirth(user.getDateOfBirth())
                    .role(user.getRole())
                    .status(user.isStatus())
                    .build();
        } else {
            return UserDTO.builder()
                    .email(user.getEmail())
                    .fullName(user.getFullName())
                    .phone(user.getPhone())
                    .address(user.getAddress())
                    .dateOfBirth(user.getDateOfBirth())
                    .build();
        }
    }

    @Override
    public User getUserById(long id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User is not found"));
    }

    @Override
    public void updateUser(long id, UserRequest userRequest) {
        User user = getUserById(id);

        user.setFullName(userRequest.getFullName());
        user.setEmail(userRequest.getEmail());
        user.setPhone(userRequest.getPhone());
        user.setAddress(userRequest.getAddress());
        user.setDateOfBirth(userRequest.getDateOfBirth());
        user.setStatus(user.isStatus());

        userRepository.save(user);
    }

    @Override
    public void deleteUser(long id) {
        User user = getUserById(id);
        user.setStatus(false);
        userRepository.save(user);
    }
}
