package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fit.iuh.camerashop.entity.CartItem;
import vn.edu.fit.iuh.camerashop.entity.CartItem_PK;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, CartItem_PK> {

    List<CartItem> findByCartId(Integer cartId);

    CartItem findByCartIdAndVariantId(long cartId, long variantId);

}