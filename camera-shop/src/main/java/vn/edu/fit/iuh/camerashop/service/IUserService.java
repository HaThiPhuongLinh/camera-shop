package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.dto.UserDTO;
import vn.edu.fit.iuh.camerashop.dto.request.UserRequest;
import vn.edu.fit.iuh.camerashop.entity.User;

import java.util.List;

public interface IUserService {

    List<UserDTO> getAll();

    UserDTO getById(long id);

    User getUserById(long id);

    User getUserByEmail(String email);

    void add(UserRequest userRequest);

    void update(long id, UserRequest userRequest);

    void delete(long id);
}
