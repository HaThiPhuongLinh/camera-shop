package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CartItem {
    @EmbeddedId
    private CartItem_PK cartItem_pk;

    @ManyToOne
    @MapsId("cart")
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne
    @MapsId("variant")
    @JoinColumn(name = "variant_id")
    private Variant variant;

    private int quantity;
}

