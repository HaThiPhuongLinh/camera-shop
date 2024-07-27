package vn.edu.fit.iuh.camerashop.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.response.OrderResponse;
import vn.edu.fit.iuh.camerashop.exception.BadRequestException;
import vn.edu.fit.iuh.camerashop.service.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import vn.edu.fit.iuh.camerashop.utils.EmailTemplate;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements IEmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public void sendEmail(String recipient, String subject, String body) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setFrom(sender);
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(body, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new BadRequestException("Failed to send email");
        }
    }

    public void sendSubscriptionEmail(String recipient) {
        String subject = "Welcome to EYESEE!";
        String body = EmailTemplate.getSubscriptionTemplate(recipient);
        sendEmail(recipient, subject, body);
    }

    public void sendRegistrationConfirmationEmail(String recipient, String userName) {
        String subject = "Welcome to EYESEE!";
        String body = EmailTemplate.getRegistrationConfirmationTemplate(recipient, userName);
        sendEmail(recipient, subject, body);
    }

    public void sendOrderConfirmationEmail(String recipient, OrderResponse orderResponse) {
        String subject = "[EYESEE] Order Confirmation";
        System.out.println("orderResponse receive: " + orderResponse);
        String body = EmailTemplate.getOrderConfirmationTemplate(recipient, orderResponse);
        sendEmail(recipient, subject, body);
    }

}
