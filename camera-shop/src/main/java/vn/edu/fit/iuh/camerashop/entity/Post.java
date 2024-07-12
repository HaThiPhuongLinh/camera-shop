package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    @Column(columnDefinition = "LONGTEXT")
    private String summary;
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    private String authorName;
    private Date publishedAt;
    private String image;
}
