package vn.edu.fit.iuh.camerashop.dto.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SuccessResponse {
    private int statusCode = 200;
    private String message;

    public SuccessResponse(String message) {
        this.statusCode = getStatusCode();
        this.message = message;
    }
}
