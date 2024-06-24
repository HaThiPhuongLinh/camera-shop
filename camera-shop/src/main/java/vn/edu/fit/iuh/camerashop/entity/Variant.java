package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"camera_id", "source", "color", "style", "kit"})
})
public class Variant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "camera_id")
    private Camera camera;
    private String source;
    private String color;
    private String style;

    @Column(name = "kit")
    private String set;

    private int quantity;
    private double discount;
    private double price;

    @ElementCollection
    @CollectionTable(name = "variant_images", joinColumns = @JoinColumn(name = "variant_id"))
    private List<String> images;
}
