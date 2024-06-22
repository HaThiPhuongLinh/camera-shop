package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.request.AuthRequest;
import vn.edu.fit.iuh.camerashop.dto.request.RefreshTokenRequest;
import vn.edu.fit.iuh.camerashop.dto.request.RegistrationRequest;
import vn.edu.fit.iuh.camerashop.dto.response.AuthResponse;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;
import vn.edu.fit.iuh.camerashop.service.Impl.AuthServiceImpl;

@Controller
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthServiceImpl authServiceImpl;

    @PostMapping("/login")
    private ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authServiceImpl.login(authRequest));
    }

    @PostMapping("/register")
    private ResponseEntity<SuccessResponse> register(@RequestBody RegistrationRequest registrationRequest) {
        authServiceImpl.register(registrationRequest);
        return ResponseEntity.ok(new SuccessResponse("User registered successfully"));
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest refreshToken) throws Exception {
        return ResponseEntity.ok( authServiceImpl.refreshToken(refreshToken));
    }
}
