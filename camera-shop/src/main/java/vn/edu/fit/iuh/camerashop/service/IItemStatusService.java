package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.response.ItemStatusResponse;
import vn.edu.fit.iuh.camerashop.entity.ItemStatus;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;

public interface IItemStatusService {

    boolean existsByOrderIdAndStatus(String orderId, Status status);

    boolean existsByOrderId(String orderId);

    ItemStatus add(ItemStatus itemStatus);

    ItemStatusResponse getByOrderId(String orderId);
}
