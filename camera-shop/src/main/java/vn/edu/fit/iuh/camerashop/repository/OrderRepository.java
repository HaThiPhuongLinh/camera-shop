package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.fit.iuh.camerashop.dto.response.OrderResponse;
import vn.edu.fit.iuh.camerashop.entity.Order;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {

    List<Order> findByUserId(long userId);

    List<Order> findTop6ByOrderByCreateAtDesc();

    @Query("SELECT i.order FROM ItemStatus i WHERE i.status = :status AND i.time BETWEEN :start AND :end")
    List<Order> findOrdersByStatusAndTimeBetween(@Param("status") Status status, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT i.order FROM ItemStatus i WHERE i.status = :status")
    List<Order> findOrdersByStatus(@Param("status") Status status);
}