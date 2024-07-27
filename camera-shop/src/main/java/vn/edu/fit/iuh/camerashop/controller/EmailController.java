package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;
import vn.edu.fit.iuh.camerashop.service.Impl.EmailServiceImpl;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private JmsTemplate jmsTemplate;

    @PostMapping("/subscribe")
    public ResponseEntity<SuccessResponse> subscribe(@RequestParam String email) {
        Map<String, Object> emailMessage = new HashMap<>();
        emailMessage.put("recipient", email);
        emailMessage.put("type", "subscription");

        jmsTemplate.convertAndSend("email_queue", emailMessage);

        return ResponseEntity.ok(new SuccessResponse("Subscription email sent successfully"));
    }
}
