package vn.edu.fit.iuh.camerashop.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private Integer errorCode;
    private String message;
    private Map<String, String> infoMessage;

    public ErrorResponse(Integer errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }
}
