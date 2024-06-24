package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.request.OrderRequest;
import vn.edu.fit.iuh.camerashop.entity.Order;

public interface IOrderService {

    Order createOrder(OrderRequest orderRequest);
}
