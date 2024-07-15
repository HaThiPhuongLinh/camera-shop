package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;
import vn.edu.fit.iuh.camerashop.service.Impl.EmailServiceImpl;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private EmailServiceImpl emailService;

    @PostMapping("/subscribe")
    public ResponseEntity<SuccessResponse> subscribe(@RequestParam String email) {
        emailService.sendSubscriptionEmail(email);
        return ResponseEntity.ok(new SuccessResponse("Subscription email sent successfully"));
    }
}
