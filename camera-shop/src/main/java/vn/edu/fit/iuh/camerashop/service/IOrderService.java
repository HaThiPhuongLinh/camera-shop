package vn.edu.fit.iuh.camerashop.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import vn.edu.fit.iuh.camerashop.dto.request.OrderRequest;
import vn.edu.fit.iuh.camerashop.dto.response.OrderResponse;
import vn.edu.fit.iuh.camerashop.dto.response.RecentOrderResponse;
import vn.edu.fit.iuh.camerashop.entity.Order;
import vn.edu.fit.iuh.camerashop.dto.dto.SalesReport;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;

import java.time.LocalDate;
import java.util.List;

public interface IOrderService {

    List<OrderResponse> getAllOrders();

    Order getOrderById(String orderId);

    OrderResponse getOrderDTOById(String orderId);

    OrderResponse createOrder(OrderRequest orderRequest) throws JsonProcessingException;

    void updateOrderStatus(String orderId, Status newStatus);

    List<OrderResponse> getAllOrdersByUserId(long userId);

    void cancelOrder(String orderId);

    SalesReport calculateSalesReport(LocalDate startMonth, LocalDate endMonth);

    List<SalesReport> calculateMonthlySalesReports(LocalDate startMonth, LocalDate endMonth);

    List<RecentOrderResponse> getRecentOrders(int limit);
}
