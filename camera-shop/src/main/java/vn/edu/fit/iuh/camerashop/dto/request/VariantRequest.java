package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VariantRequest {
    private long cameraId;
    private String source;
    private String color;
    private String style;
    private String set;
    private int quantity;
    private double discount;
    private double price;
    private List<String> images;
}
