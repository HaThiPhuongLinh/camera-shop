package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.dto.CartItemDTO;
import vn.edu.fit.iuh.camerashop.dto.request.CartItemRequest;
import vn.edu.fit.iuh.camerashop.entity.CartItem;

import java.util.List;

public interface ICartItemService {

    CartItem getCartItemByCartIdAndVariantId(long cartId, long variantId);

    List<CartItemDTO> getCartItemsByCartId(long cartId);

    void addCartItem(CartItemRequest cartItemRequest);

    void updateCartItem(CartItemRequest cartItemRequest);

    void deleteCartItem(long cartId, long variantId);
}
