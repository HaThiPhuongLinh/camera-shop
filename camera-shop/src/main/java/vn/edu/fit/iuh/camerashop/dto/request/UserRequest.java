package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {
    private String email;
    private String fullName;
    private String phone;
    private String address;
    private LocalDate dateOfBirth;
}
