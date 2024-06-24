package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Builder
public class UserRequest {
    private String email;
    private String fullName;
    private String phone;
    private String address;
    private LocalDate dateOfBirth;
}
