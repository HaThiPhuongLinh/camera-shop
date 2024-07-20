package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private long userId;
    private int quantity;
    private double total;
    private List<OrderDetailRequest> orderDetails;
    private String shipAddress;
    private String customerName;
    private String customerPhone;
}
