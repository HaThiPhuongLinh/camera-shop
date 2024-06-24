package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private long userId;
    private int quantity;
    private double total;
    private List<OrderDetailRequest> orderDetails;
}
