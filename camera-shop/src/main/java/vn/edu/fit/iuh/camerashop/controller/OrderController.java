package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.request.OrderRequest;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;
import vn.edu.fit.iuh.camerashop.service.IOrderService;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @PostMapping
    public ResponseEntity<SuccessResponse> createOrder(@RequestBody OrderRequest orderRequest) {
        orderService.createOrder(orderRequest);
        return ResponseEntity.ok(new SuccessResponse("Created order successfully"));
    }

    @PutMapping("/{orderId}/status/{newStatus}")
    public ResponseEntity<SuccessResponse> updateOrderStatus(@PathVariable String orderId,
                                                             @PathVariable Status newStatus) {
        orderService.updateOrderStatus(orderId, newStatus);
        return ResponseEntity.ok(new SuccessResponse("Updated order status successfully"));
    }
}