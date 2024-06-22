package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fit.iuh.camerashop.entity.Camera;

import java.util.List;

public interface CameraRepository extends JpaRepository<Camera, Integer> {

    List<Camera> findCamerasByBrandId(Integer brandId);

    List<Camera> findCamerasByCategoryId(Integer categoryId);

    List<Camera> findCamerasByActive(boolean active);

}