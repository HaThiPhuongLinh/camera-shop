package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.request.AuthRequest;
import vn.edu.fit.iuh.camerashop.dto.request.RefreshTokenRequest;
import vn.edu.fit.iuh.camerashop.dto.request.RegistrationRequest;
import vn.edu.fit.iuh.camerashop.dto.response.AuthResponse;
import vn.edu.fit.iuh.camerashop.entity.User;

public interface IAuthService {
    AuthResponse login(AuthRequest authRequest);

    void register(RegistrationRequest registrationRequest);

    AuthResponse refreshToken(RefreshTokenRequest refreshToken);
}
