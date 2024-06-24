package vn.edu.fit.iuh.camerashop.dto.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class CartItemDTO {
    private long variantId;
    private String cameraName;
    private String source;
    private String color;
    private String style;
    private int quantity;
    private double price;
    private String images;
}
