package vn.edu.fit.iuh.camerashop.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UnauthorizedException extends RuntimeException {
    private int errorCode = 401;

    public UnauthorizedException(int errorCode, String message){
        super(message);
        this.errorCode = errorCode;
    }

    public UnauthorizedException(String message){
        super(message);
    }
}
