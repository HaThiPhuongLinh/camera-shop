package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.response.ItemStatusResponse;
import vn.edu.fit.iuh.camerashop.service.IItemStatusService;

@RestController
@RequestMapping("/item-status")
public class ItemStatusController {
    @Autowired
    private IItemStatusService itemStatusService;

    @GetMapping("/{orderId}")
    public ResponseEntity<ItemStatusResponse> getStatusByOrderId(@PathVariable String orderId) {
        return ResponseEntity.ok(itemStatusService.getByOrderId(orderId));
    }
}