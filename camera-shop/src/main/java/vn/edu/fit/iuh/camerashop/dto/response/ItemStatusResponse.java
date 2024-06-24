package vn.edu.fit.iuh.camerashop.dto.response;

import lombok.*;
import vn.edu.fit.iuh.camerashop.entity.ItemState;
import vn.edu.fit.iuh.camerashop.entity.Order;

import java.util.List;

@Getter
@Setter
@Builder
public class ItemStatusResponse {
    private Order order;
    private List<ItemState> state;
}
