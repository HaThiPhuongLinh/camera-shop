package vn.edu.fit.iuh.camerashop.dto.dto;

import lombok.*;
import vn.edu.fit.iuh.camerashop.entity.enums.Role;

import java.time.LocalDate;

@Data
@Builder
public class UserDTO {
    private long id;
    private String email;
    private String fullName;
    private String phone;
    private String address;
    private LocalDate dateOfBirth;
    private Role role;
    private boolean status;

}
