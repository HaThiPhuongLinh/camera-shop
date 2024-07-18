package vn.edu.fit.iuh.camerashop.dto.dto;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class VariantDTO {
    private long id;
    private String source;
    private String color;
    private String style;

    @Column(name = "kit")
    private String set;

    private double discount;
    private double price;
    private boolean active;
    private List<String> images;
}