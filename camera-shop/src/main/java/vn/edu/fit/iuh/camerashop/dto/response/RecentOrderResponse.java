package vn.edu.fit.iuh.camerashop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecentOrderResponse {
    private String orderId;
    private LocalDateTime orderDate;
    private double total;
    private String shippingAddress;
    private Status status;
}
