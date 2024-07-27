package vn.edu.fit.iuh.camerashop.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import vn.edu.fit.iuh.camerashop.dto.response.OrderResponse;
import vn.edu.fit.iuh.camerashop.service.Impl.EmailServiceImpl;

import java.util.Map;

@Component
public class EmailMessageListener {

    @Autowired
    private EmailServiceImpl emailService;
    @Autowired
    private ObjectMapper objectMapper;

    @JmsListener(destination = "email_queue")
    public void receiveMessage(Map<String, Object> emailMessage) {
        String recipient = (String) emailMessage.get("recipient");
        String type = (String) emailMessage.get("type");

        try {
            switch (type) {
                case "registration":
                    String userName = (String) emailMessage.get("userName");
                    emailService.sendRegistrationConfirmationEmail(recipient, userName);
                    break;
                case "order_confirmation":
                    String orderResponseJson = (String) emailMessage.get("orderResponse");
                    OrderResponse orderResponse = objectMapper.readValue(orderResponseJson, OrderResponse.class);
                    emailService.sendOrderConfirmationEmail(recipient, orderResponse);
                    break;
                case "subscription":
                    emailService.sendSubscriptionEmail(recipient);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid email type");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to process email message", e);
        }
    }
}
