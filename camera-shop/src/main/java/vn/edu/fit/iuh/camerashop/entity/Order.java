package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "`order`")
@ToString
public class Order {
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private int quantity;
    private double total;
    private LocalDateTime createAt;
}
