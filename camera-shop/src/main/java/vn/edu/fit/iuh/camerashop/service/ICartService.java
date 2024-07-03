package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.request.CartRequest;
import vn.edu.fit.iuh.camerashop.entity.Cart;

public interface ICartService {

    Cart getCartByUserId(long userId);

    void createCart(CartRequest cartRequest);

    void calculateTotalPrice(long cartId);

    Cart getCartById(long cartId);
}
