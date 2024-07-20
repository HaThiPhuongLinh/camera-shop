package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDetail {
    @EmbeddedId
    private OrderDetail_PK orderDetail_pk;

    @ManyToOne
    @MapsId("order")
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @MapsId("variant")
    @JoinColumn(name = "variant_id")
    private Variant variant;

    private int quantity;
    private Double discount;
    private Double price;
}

