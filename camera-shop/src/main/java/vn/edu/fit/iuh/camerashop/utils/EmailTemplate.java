package vn.edu.fit.iuh.camerashop.utils;

public class EmailTemplate {

    public static String getSubscriptionTemplate(String recipientEmail) {
        return "<html>" +
                "<body style='font-family: Arial, sans-serif; color: #23496d;'>" +
                "<div style='width: 600px; margin: auto; text-align: left;'>" +
                "<img src='https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2F99ebd22c5d514d0b8099a6ffdc33dea0' alt='EYESEE Logo' style='width: 100%; max-width: 600px; height: auto;' />" +
                "<h1 style='color: #23496d;'>Thank You for Subscribing to Our Newsletter!</h1>" +
                "<p>Hello " + recipientEmail + ",</p>" +
                "<p>We are excited to have you as a part of our community.</p>" +
                "<p>You'll be the first to know about our latest collections, exclusive offers, and exciting news.</p>" +
                "<p>Get ready for amazing updates and special discounts, just for you!</p>" +
                "<p>You can unsubscribe at any time.</p>" +
                "<p>Thank you!</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}
