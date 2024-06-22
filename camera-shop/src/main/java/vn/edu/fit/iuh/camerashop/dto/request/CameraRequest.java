package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
public class CameraRequest {
    private String name;
    private long brandId;
    private long categoryId;
    private String warrantyPeriod;
    private List<Long> features;
    private String description;
    private String ISO;
    private String shootingSpeed;
    private String imageStabilization;
    private String resolution;
    private String sensorType;
    private String videoResolution;
    private String battery;
    private float weight;
    private List<String> images;
    private boolean active;
}
