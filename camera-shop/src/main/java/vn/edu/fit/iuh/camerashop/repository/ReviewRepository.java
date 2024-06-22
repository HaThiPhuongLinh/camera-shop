package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fit.iuh.camerashop.entity.Review;
import vn.edu.fit.iuh.camerashop.entity.Review_PK;

public interface ReviewRepository extends JpaRepository<Review, Review_PK> {
}