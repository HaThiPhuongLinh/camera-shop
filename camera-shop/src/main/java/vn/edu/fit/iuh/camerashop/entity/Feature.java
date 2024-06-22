package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String featureName;
    private String code;
}
