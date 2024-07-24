package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.dto.UserDTO;
import vn.edu.fit.iuh.camerashop.dto.request.UserRequest;
import vn.edu.fit.iuh.camerashop.entity.User;

import java.util.List;

public interface IUserService {

    List<UserDTO> getAll();

    UserDTO getById(long id);

    User getUserById(long id);

    void updateUser(long id, UserRequest userRequest);

    void deleteUser(long id);

    void activeUser(long id);
}
