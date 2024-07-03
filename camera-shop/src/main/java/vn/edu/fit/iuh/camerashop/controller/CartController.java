package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.request.CartRequest;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;
import vn.edu.fit.iuh.camerashop.entity.Cart;
import vn.edu.fit.iuh.camerashop.service.ICartService;


@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private ICartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

}