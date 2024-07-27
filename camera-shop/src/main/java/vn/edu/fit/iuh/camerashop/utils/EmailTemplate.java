package vn.edu.fit.iuh.camerashop.utils;

import vn.edu.fit.iuh.camerashop.dto.response.OrderResponse;
import vn.edu.fit.iuh.camerashop.entity.OrderDetail;

public class EmailTemplate {

    public static String getRegistrationConfirmationTemplate(String recipientEmail, String userName) {
        return "<html>" +
                "<body style='font-family: Arial, sans-serif; color: #23496d;'>" +
                "<div style='width: 600px; margin: auto; text-align: left;'>" +
                "<img src='https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2F99ebd22c5d514d0b8099a6ffdc33dea0' alt='EYESEE Logo' style='width: 100%; max-width: 600px; height: auto;' />" +
                "<h1 style='color: #23496d;'>Welcome to EYESEE!</h1>" +
                "<p>Hello " + userName + ",</p>" +
                "<p>Thank you for creating an account with us!</p>" +
                "<p>We are thrilled to have you on board. You can now enjoy our exclusive offers, track your orders, and much more.</p>" +
                "<p>If you have any questions, feel free to contact us.</p>" +
                "<p>Best Regards,</p>" +
                "<p>The EYESEE Team</p>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

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

    public static String getOrderConfirmationTemplate(String recipientEmail, OrderResponse order) {
        StringBuilder orderDetailsHtml = new StringBuilder();
        for (OrderDetail detail : order.getOrderDetails()) {
            double totalPrice = detail.getPrice() * detail.getQuantity() * (1 - detail.getDiscount() / 100);
            orderDetailsHtml.append("<tr>")
                    .append("<td style='border: 1px solid #ddd; padding: 8px; text-align: left;'>")
                    .append(detail.getVariant().getCamera().getName()).append("</td>")
                    .append("<td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>")
                    .append(detail.getQuantity()).append("</td>")
                    .append("<td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>")
                    .append(detail.getPrice()).append("</td>")
                    .append("<td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>")
                    .append(detail.getDiscount()).append("</td>")
                    .append("<td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>")
                    .append(String.format("$%.2f", totalPrice)).append("</td>")
                    .append("</tr>");
        }

        return "<html>" +
                "<body style='font-family: Arial, sans-serif; color: #23496d; margin: 0; padding: 0;'>" +
                "<div style='width: 100%; max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;'>" +
                "<h1 style='color: #23496d; text-align: center;'>Order Confirmation</h1>" +
                "<p>Hello <strong>" + order.getCustomerName() + "</strong>,</p>" +
                "<p>Thank you for your order! Here are the details:</p>" +
                "<table style='width: 100%; border-collapse: collapse; margin-bottom: 20px;'>"+
                "<thead>"+
                "<tr>"+
                "<th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Product</th>"+
                "<th style='border: 1px solid #ddd; padding: 8px; text-align: center;'>Quantity</th>"+
                "<th style='border: 1px solid #ddd; padding: 8px; text-align: center;'>Price</th>"+
                "<th style='border: 1px solid #ddd; padding: 8px; text-align: center;'>Discount</th>"+
                "<th style='border: 1px solid #ddd; padding: 8px; text-align: center;'>Total</th>"+
                "</tr>"+
                "</thead>"+
                "<tbody>"+
                orderDetailsHtml.toString() +
                "</tbody>"+
                "<tfoot>"+
                "<tr>"+
                "<td colspan='4' style='border: 1px solid #ddd; padding: 8px; text-align: right;'><strong>Grand Total:</strong></td>"+
                "<td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>"+ "$" + String.format("%.2f", order.getTotal()) +"</td>"+
                "</tr>"+
                "</tfoot>"+
                "</table>"+
                "<p>Your order will be shipped to:</p>" +
                "<p>" + order.getShipAddress() + "</p>" +
                "<p>We will notify you once your order is on its way. If you have any questions, feel free to contact us:</p>" +
                "<p>Email: <a href='mailto:support@eyesee.com' style='color: #23496d;'>support@eyesee.com</a></p>" +
                "<p>Phone: <a href='tel:+1234567890' style='color: #23496d;'>+1 234-567-890</a></p>" +
                "<p>Thank you for shopping with us!</p>" +
                "<p style='text-align: end;'>Best Regards,<br>The EYESEE Team</p>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

}
