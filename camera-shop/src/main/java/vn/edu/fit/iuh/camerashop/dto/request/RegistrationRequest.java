package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {
    private String email;
    private String password;
    private String fullName;
    private String phone;
    private String address;
}
