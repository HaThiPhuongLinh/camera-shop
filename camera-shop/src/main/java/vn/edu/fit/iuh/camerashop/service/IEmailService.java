package vn.edu.fit.iuh.camerashop.service;

public interface IEmailService {
    void sendEmail(String recipient, String subject, String body);
}
