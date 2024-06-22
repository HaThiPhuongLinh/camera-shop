package vn.edu.fit.iuh.camerashop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBadRequestException(BadRequestException exception){
        return new ErrorResponse(exception.getErrorCode(), exception.getMessage(), exception.getInfoMessage());
    }

    @ExceptionHandler(HttpClientErrorException.Forbidden.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponse handleForbiddenException(ForbiddenException exception){
        return new ErrorResponse(exception.getErrorCode(), exception.getMessage());
    }

    @ExceptionHandler(MethodNotAllowedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleMethodNotAllowedException(MethodNotAllowedException exception){
        return new ErrorResponse(exception.getErrorCode(), exception.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFoundException(NotFoundException exception){
        return new ErrorResponse(exception.getErrorCode(), exception.getMessage());
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleUnAuthorizedException(UnauthorizedException exception){
        return new ErrorResponse(exception.getErrorCode(), exception.getMessage());
    }
}
