package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.fit.iuh.camerashop.entity.ItemStatus;
import vn.edu.fit.iuh.camerashop.entity.Order;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;

import java.time.LocalDateTime;
import java.util.List;

public interface ItemStatusRepository extends JpaRepository<ItemStatus, Integer> {

    List<ItemStatus> findByOrderId(String orderId);

    boolean existsByOrderIdAndStatus(String orderId, Status status);

    boolean existsByOrderId(String orderId);
}