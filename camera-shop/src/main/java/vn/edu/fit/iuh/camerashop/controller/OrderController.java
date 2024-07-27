package vn.edu.fit.iuh.camerashop.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.dto.TopSellingVariant;
import vn.edu.fit.iuh.camerashop.dto.request.OrderRequest;
import vn.edu.fit.iuh.camerashop.dto.response.OrderResponse;
import vn.edu.fit.iuh.camerashop.dto.response.RecentOrderResponse;
import vn.edu.fit.iuh.camerashop.dto.dto.SalesReport;
import vn.edu.fit.iuh.camerashop.entity.Order;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;
import vn.edu.fit.iuh.camerashop.service.IOrderService;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderByOrderId(@PathVariable String orderId) {
        return ResponseEntity.ok(orderService.getOrderDTOById(orderId));
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest) throws JsonProcessingException {
        return ResponseEntity.ok(orderService.createOrder(orderRequest));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getAllOrdersByUserId(@PathVariable long userId) {
        List<OrderResponse> orders = orderService.getAllOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/{orderId}/status/{newStatus}")
    public ResponseEntity<SuccessResponse> updateOrderStatus(@PathVariable String orderId,
                                                             @PathVariable Status newStatus) {
        orderService.updateOrderStatus(orderId, newStatus);
        return ResponseEntity.ok(new SuccessResponse("Updated order status successfully"));
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<SuccessResponse> cancelOrder(@PathVariable String orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok(new SuccessResponse("Canceled order successfully"));
    }

    @GetMapping("/sales-report")
    public ResponseEntity<SalesReport> getSalesReport(@RequestParam("startMonth") String startMonth, @RequestParam("endMonth") String endMonth) {
        LocalDate start = LocalDate.parse(startMonth + "-01");
        LocalDate end = LocalDate.parse(endMonth + "-01");

        SalesReport report = orderService.calculateSalesReport(start, end);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/monthly-sales-reports")
    public ResponseEntity<List<SalesReport>> getMonthlySalesReports(@RequestParam("startMonth") String startMonth, @RequestParam("endMonth") String endMonth) {
        LocalDate start = LocalDate.parse(startMonth + "-01");
        LocalDate end = LocalDate.parse(endMonth + "-01");

        List<SalesReport> reports = orderService.calculateMonthlySalesReports(start, end);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/recent-orders")
    public ResponseEntity<List<RecentOrderResponse>> getRecentOrders() {
        List<RecentOrderResponse> recentOrders = orderService.getRecentOrders(6);
        return ResponseEntity.ok(recentOrders);
    }
}