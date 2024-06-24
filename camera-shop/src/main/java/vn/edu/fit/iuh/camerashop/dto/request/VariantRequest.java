package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
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
