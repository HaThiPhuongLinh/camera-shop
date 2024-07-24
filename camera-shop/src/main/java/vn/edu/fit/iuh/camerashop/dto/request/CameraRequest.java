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
    private String size;
    private String shootingSpeed;
    private String stabilization;
    private String resolution;
    private String sensorType;
    private String videoResolution;
    private String battery;
    private String weight;
    private boolean hot;
    private List<String> images;
    private boolean active;
}
