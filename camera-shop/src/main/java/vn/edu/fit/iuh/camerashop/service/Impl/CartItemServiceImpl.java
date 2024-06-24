package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.dto.CartItemDTO;
import vn.edu.fit.iuh.camerashop.dto.request.CartItemRequest;
import vn.edu.fit.iuh.camerashop.entity.CartItem;
import vn.edu.fit.iuh.camerashop.entity.CartItem_PK;
import vn.edu.fit.iuh.camerashop.entity.Variant;
import vn.edu.fit.iuh.camerashop.repository.CartItemRepository;
import vn.edu.fit.iuh.camerashop.service.ICartItemService;

import java.util.List;

@Service
public class CartItemServiceImpl implements ICartItemService {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private VariantServiceImpl variantService;

    @Override
    public CartItem getCartItemByCartIdAndVariantId(long cartId, long variantId) {
        return (CartItem) cartItemRepository.findByCartIdAndVariantId(cartId, variantId);
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
            cartItemRepository.save(existingCartItem);
        }

        Variant variant = variantService.getVariantById((int) cartItemRequest.getVariantId());

        CartItem newCartItem = CartItem.builder()
                .cartItem_pk(new CartItem_PK(cartItemRequest.getCartId(), cartItemRequest.getVariantId()))
                .variant(variant)
                .quantity(cartItemRequest.getQuantity())
                .build();

        cartItemRepository.save(newCartItem);
    }

    @Override
    public void updateCartItem(CartItemRequest cartItemRequest) {
        CartItem cartItem = getCartItemByCartIdAndVariantId(cartItemRequest.getCartId(), cartItemRequest.getVariantId());

        if (cartItem != null) {
            cartItem.setQuantity(cartItemRequest.getQuantity());
            cartItemRepository.save(cartItem);
        }
    }

    @Override
    public void deleteCartItem(long cartId, long variantId) {
        CartItem cartItem = getCartItemByCartIdAndVariantId(cartId, variantId);

        if (cartItem != null) {
            cartItemRepository.delete(cartItem);
        }
    }
}
