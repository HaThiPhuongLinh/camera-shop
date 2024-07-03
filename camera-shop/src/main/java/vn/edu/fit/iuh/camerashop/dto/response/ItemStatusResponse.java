package vn.edu.fit.iuh.camerashop.dto.response;

import lombok.*;
import vn.edu.fit.iuh.camerashop.entity.ItemState;
import vn.edu.fit.iuh.camerashop.entity.Order;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemStatusResponse {
    private Order order;
    private List<ItemState> state;
}
