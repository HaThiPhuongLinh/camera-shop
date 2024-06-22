package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.*;
import lombok.*;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ItemStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private Status status;
    private LocalDateTime time;
}
