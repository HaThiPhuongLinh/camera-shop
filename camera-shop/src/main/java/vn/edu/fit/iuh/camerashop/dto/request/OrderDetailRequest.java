package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailRequest {
    private long variantId;
    private int quantity;
    private double discount;
    private double price;
}
