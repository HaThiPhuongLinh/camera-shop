package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fit.iuh.camerashop.entity.OrderDetail;
import vn.edu.fit.iuh.camerashop.entity.OrderDetail_PK;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetail_PK> {

    List<OrderDetail> findByOrderId(String orderId);
}