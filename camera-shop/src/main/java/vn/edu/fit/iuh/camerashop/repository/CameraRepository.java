package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fit.iuh.camerashop.entity.Camera;

import java.util.List;

public interface CameraRepository extends JpaRepository<Camera, Integer> {

    List<Camera> findByNameContaining(String name);

    List<Camera> findByBrandId(Integer brandId);

    List<Camera> findByCategoryId(Integer categoryId);

    List<Camera> findByActiveIsTrue();

    List<Camera> findByHot(boolean hot);

}