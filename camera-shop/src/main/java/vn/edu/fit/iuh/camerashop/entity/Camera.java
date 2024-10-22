package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Camera {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private String warrantyPeriod;

    @ManyToMany
    @JoinTable(
            name = "camera_feature",
            joinColumns = @JoinColumn(name = "camera_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )

    private List<Feature> features;

    @Column(columnDefinition = "LONGTEXT")
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

    @ElementCollection()
    @CollectionTable(name = "camera_images", joinColumns = @JoinColumn(name = "camera_id"))
    private List<String> images;

    private boolean active;
}


