package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.dto.UserDTO;
import vn.edu.fit.iuh.camerashop.dto.request.UserRequest;
import vn.edu.fit.iuh.camerashop.service.IUserService;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> updateUser(@PathVariable long id, @RequestBody UserRequest userRequest) {
        userService.updateUser(id, userRequest);
        return ResponseEntity.ok(new SuccessResponse("Updated user successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new SuccessResponse("Deleted user successfully"));
    }
}