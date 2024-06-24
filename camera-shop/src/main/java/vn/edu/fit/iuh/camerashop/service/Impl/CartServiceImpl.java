package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
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
public class CartServiceImpl implements ICartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserServiceImpl userService;

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
    public void calculateTotalPrice(Cart cart) {
        List<CartItem> cartItems = cartItemRepository.findByCartId((int) cart.getId());

        cart.setTotalItems(cartItems.size());

        cart.setTotalPrice(cartItems.stream()
                .mapToDouble(CartItem::getPrice)
                .sum());

        cartRepository.save(cart);
    }
}
