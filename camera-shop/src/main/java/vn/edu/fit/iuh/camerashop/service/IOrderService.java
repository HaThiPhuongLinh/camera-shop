package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.request.OrderRequest;
import vn.edu.fit.iuh.camerashop.entity.Order;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;

public interface IOrderService {

    Order createOrder(OrderRequest orderRequest);

    void updateOrderStatus(String orderId, Status newStatus);
}
