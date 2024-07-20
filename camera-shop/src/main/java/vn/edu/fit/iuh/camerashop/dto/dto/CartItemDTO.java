package vn.edu.fit.iuh.camerashop.dto.dto;

import jakarta.persistence.Column;
import lombok.*;

@Data
@Builder
public class CartItemDTO {
    private long variantId;
    private String cameraName;
    private String source;
    private String color;
    private String style;
    @Column(name = "kit")
    private String set;

    private double discount;
    private int quantity;
    private double price;
    private String images;
}
