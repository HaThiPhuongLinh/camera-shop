package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemRequest {
    private long cartId;
    private long variantId;
    private int quantity;
}
