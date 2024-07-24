package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.fit.iuh.camerashop.dto.dto.TopSellingVariant;
import vn.edu.fit.iuh.camerashop.entity.OrderDetail;
import vn.edu.fit.iuh.camerashop.entity.OrderDetail_PK;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetail_PK> {

    List<OrderDetail> findByOrderId(String orderId);
}