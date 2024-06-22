package vn.edu.fit.iuh.camerashop.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForbiddenException extends RuntimeException{
    private int errorCode = 403;

    public ForbiddenException(int errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public ForbiddenException(String message) {
        super(message);
    }
}
