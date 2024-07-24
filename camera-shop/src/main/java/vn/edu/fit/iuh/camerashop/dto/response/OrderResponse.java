package vn.edu.fit.iuh.camerashop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.fit.iuh.camerashop.entity.OrderDetail;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private String id;
    private long userId;
    private int quantity;
    private double total;
    private LocalDateTime createAt;
    private List<OrderDetail> orderDetails;
    private String shipAddress;
    private String customerName;
    private String customerPhone;
}
