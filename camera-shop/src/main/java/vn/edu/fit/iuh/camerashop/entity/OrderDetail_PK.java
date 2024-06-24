package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class OrderDetail_PK implements Serializable {

    private static final long serialVersionUID = 1L;

    private long variant;
    private String order;
}
