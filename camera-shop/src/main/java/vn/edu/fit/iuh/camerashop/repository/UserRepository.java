package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.fit.iuh.camerashop.entity.User;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT COUNT(DISTINCT u.id) FROM User u WHERE u.createAt BETWEEN :start AND :end")
    long countDistinctUsers(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}