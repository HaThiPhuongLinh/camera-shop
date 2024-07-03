package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.dto.CartItemDTO;
import vn.edu.fit.iuh.camerashop.dto.request.CartItemRequest;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;
import vn.edu.fit.iuh.camerashop.service.ICartItemService;

import java.util.List;

@RestController
@RequestMapping("/cart-item")
public class CartItemController {
    @Autowired
    private ICartItemService cartItemService;

    @GetMapping("/cart/{cartId}")
    public ResponseEntity<List<CartItemDTO>> getCartItemsByCartId(@PathVariable long cartId) {
        return ResponseEntity.ok(cartItemService.getCartItemsByCartId(cartId));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse> addCartItem(@RequestBody CartItemRequest request) {
        cartItemService.addCartItem(request);
        return ResponseEntity.ok(new SuccessResponse("Created cart-item successfully"));
    }

    @PutMapping
    public ResponseEntity<SuccessResponse> updateCartItem(@RequestBody CartItemRequest request) {
        cartItemService.updateCartItem(request);
        return ResponseEntity.ok(new SuccessResponse("Updated cart-item successfully"));
    }

    @DeleteMapping("/{cartId}/{variantId}")
    public ResponseEntity<SuccessResponse> deleteCartItem(@PathVariable long cartId, @PathVariable long variantId) {
        cartItemService.deleteCartItem(cartId, variantId);
        return ResponseEntity.ok(new SuccessResponse("Deleted cart-item successfully"));
    }
}