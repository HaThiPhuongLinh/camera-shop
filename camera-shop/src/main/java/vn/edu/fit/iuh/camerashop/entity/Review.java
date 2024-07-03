package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Review {
    @EmbeddedId
    private Review_PK review_pk;

    @ManyToOne
    @MapsId("user")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("camera")
    @JoinColumn(name = "camera_id")
    private Camera camera;

    @Lob
    private String content;
    private int rating;
    private LocalDateTime createAt;
}
