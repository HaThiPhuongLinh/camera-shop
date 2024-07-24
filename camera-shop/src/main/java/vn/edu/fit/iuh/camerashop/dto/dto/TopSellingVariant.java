package vn.edu.fit.iuh.camerashop.dto.dto;

import lombok.*;

@Data
@Builder
public class TopSellingVariant {
    private long variantId;
    private String cameraName;
    private int quantitySold;
    private double price;
    private String imgURL;
}
