package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fit.iuh.camerashop.entity.ItemStatus;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;

import java.util.List;

public interface ItemStatusRepository extends JpaRepository<ItemStatus, Integer> {

    List<ItemStatus> findAllByOrderId(String orderId);

    boolean existsByOrderIdAndStatus(String orderId, Status status);

    boolean existsByOrderId(String orderId);
}