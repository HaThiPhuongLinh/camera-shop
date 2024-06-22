package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CartItem_PK implements Serializable {

    private static final long serialVersionUID = 1L;

    private long cart;
    private long variant;
}
