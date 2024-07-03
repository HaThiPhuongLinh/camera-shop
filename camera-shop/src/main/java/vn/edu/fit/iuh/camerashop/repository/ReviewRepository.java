package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fit.iuh.camerashop.entity.Review;
import vn.edu.fit.iuh.camerashop.entity.Review_PK;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Review_PK> {

    List<Review> findByCameraId(int cameraId);

    Review findByUserIdAndCameraId(long userId, long cameraId);
}