package vn.edu.fit.iuh.camerashop.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.dto.CartItemDTO;
import vn.edu.fit.iuh.camerashop.dto.request.CartItemRequest;
import vn.edu.fit.iuh.camerashop.entity.Cart;
import vn.edu.fit.iuh.camerashop.entity.CartItem;
import vn.edu.fit.iuh.camerashop.entity.CartItem_PK;
import vn.edu.fit.iuh.camerashop.entity.Variant;
import vn.edu.fit.iuh.camerashop.repository.CartItemRepository;
import vn.edu.fit.iuh.camerashop.service.ICartItemService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements ICartItemService {

    private final CartItemRepository cartItemRepository;
    private final VariantServiceImpl variantService;
    private final CartServiceImpl cartService;

    @Override
    public CartItem getCartItemByCartIdAndVariantId(long cartId, long variantId) {
        return cartItemRepository.findByCartIdAndVariantId(cartId, variantId);
    }

    @Override
    public List<CartItemDTO> getCartItemsByCartId(long cartId) {
        List<CartItem> list = cartItemRepository.findByCartId((int) cartId);

        List<CartItemDTO> cartItemDTOList = list.stream().map(cartItem -> {
            Variant variant = cartItem.getVariant();

            return CartItemDTO.builder()
                    .variantId(variant.getId())
                    .cameraName(variant.getCamera().getName())
                    .source(variant.getSource())
                    .color(variant.getColor())
                    .style(variant.getStyle())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getPrice())
                    .images(variant.getImages().get(0))
                    .build();
        }).toList();

        return cartItemDTOList;
    }

    @Override
    public void addCartItem(CartItemRequest cartItemRequest) {
        CartItem existingCartItem = getCartItemByCartIdAndVariantId(cartItemRequest.getCartId(), cartItemRequest.getVariantId());

        if (existingCartItem != null) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItemRequest.getQuantity());
            cartService.calculateTotalPrice(cartItemRequest.getCartId());
            cartItemRepository.save(existingCartItem);
            return;
        }

        Variant variant = variantService.getVariantById((int) cartItemRequest.getVariantId());
        Cart cart = cartService.getCartById(cartItemRequest.getCartId());

        CartItem newCartItem = CartItem.builder()
                .cartItem_pk(CartItem_PK.builder()
                        .cart(cartItemRequest.getCartId())
                        .variant(cartItemRequest.getVariantId()).build())
                .cart(cart)
                .variant(variant)
                .quantity(cartItemRequest.getQuantity())
                .build();

        cartItemRepository.save(newCartItem);
        cartService.calculateTotalPrice(cartItemRequest.getCartId());
    }

    @Override
    public void updateCartItem(CartItemRequest cartItemRequest) {
        CartItem cartItem = getCartItemByCartIdAndVariantId(cartItemRequest.getCartId(), cartItemRequest.getVariantId());

        if (cartItem != null) {
            cartItem.setQuantity(cartItemRequest.getQuantity());
            cartService.calculateTotalPrice(cartItemRequest.getCartId());
            cartItemRepository.save(cartItem);
        }
    }

    @Override
    public void deleteCartItem(long cartId, long variantId) {
        CartItem cartItem = getCartItemByCartIdAndVariantId(cartId, variantId);

        if (cartItem != null) {
            cartItemRepository.delete(cartItem);
            cartService.calculateTotalPrice(cartId);
        }
    }
}
