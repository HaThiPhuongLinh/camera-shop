package vn.edu.fit.iuh.camerashop.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.CartRequest;
import vn.edu.fit.iuh.camerashop.entity.Cart;
import vn.edu.fit.iuh.camerashop.entity.CartItem;
import vn.edu.fit.iuh.camerashop.entity.User;
import vn.edu.fit.iuh.camerashop.exception.BadRequestException;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.CartItemRepository;
import vn.edu.fit.iuh.camerashop.repository.CartRepository;
import vn.edu.fit.iuh.camerashop.service.ICartService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements ICartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserServiceImpl userService;

    @Override
    public Cart getCartByUserId(long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public void createCart(CartRequest cartRequest) {

        Cart existingCart = getCartByUserId(cartRequest.getUserId());

        if(existingCart != null) {
            throw new BadRequestException("Cart already exists");
        }

        User user = userService.getUserById(cartRequest.getUserId());

        Cart newCart = Cart.builder()
                .user(user)
                .totalItems(0)
                .totalPrice(0)
                .build();

        cartRepository.save(newCart);
    }

    @Override
    public void calculateTotalPrice(long cartId) {
        List<CartItem> cartItems = cartItemRepository.findByCartId((int) cartId);

        Cart cart = getCartById(cartId);

        int totalItems = cartItems.stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        double totalPrice = cartItems.stream()
                .mapToDouble(CartItem::getPrice)
                .sum();

        cart.setTotalPrice(totalPrice);
        cart.setTotalItems(totalItems);
        cartRepository.save(cart);
    }

    @Override
    public Cart getCartById(long cartId) {
        return cartRepository.findById((int) cartId)
                .orElseThrow(() -> new NotFoundException("Cart not found"));
    }
}
