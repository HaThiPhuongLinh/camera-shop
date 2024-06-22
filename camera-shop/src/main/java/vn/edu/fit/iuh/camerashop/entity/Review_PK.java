package vn.edu.fit.iuh.camerashop.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Review_PK implements Serializable {

    private static final long serialVersionUID = 1L;

    private long user;
    private long camera;
}
