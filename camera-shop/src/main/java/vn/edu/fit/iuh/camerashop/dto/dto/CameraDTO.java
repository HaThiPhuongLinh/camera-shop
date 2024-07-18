package vn.edu.fit.iuh.camerashop.dto.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CameraDTO {
    private long id;
    private String name;
    private long brandId;
    private long categoryId;
    private String warrantyPeriod;
    private List<Long> features;
    private String description;
    private String ISO;
    private String shootingSpeed;
    private String stabilization;
    private String resolution;
    private String sensorType;
    private String videoResolution;
    private String battery;
    private String weight;
    private String size;
    private boolean hot;
    private List<String> images;
    private boolean active;
    private List<VariantDTO> variants;
}