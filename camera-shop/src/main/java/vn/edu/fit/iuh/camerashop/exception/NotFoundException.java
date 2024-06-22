package vn.edu.fit.iuh.camerashop.exception;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotFoundException extends RuntimeException {
    private int errorCode = 404;

    public NotFoundException(int errorCode, String message){
        super(message);
        this.errorCode = errorCode;
    }

    public NotFoundException(String message){
        super(message);
    }
}
