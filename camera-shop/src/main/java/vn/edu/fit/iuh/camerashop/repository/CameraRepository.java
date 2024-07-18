package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fit.iuh.camerashop.entity.Camera;

import java.util.List;

public interface CameraRepository extends JpaRepository<Camera, Integer> {

    List<Camera> findByNameContaining(String name);

    List<Camera> findByNameContainingAndActiveIsTrue(String name);

    List<Camera> findByBrandIdAndActiveIsTrue(Integer brandId);

    List<Camera> findByCategoryIdAndActiveIsTrue(Integer categoryId);

    List<Camera> findByBrandId(Integer brandId);

    List<Camera> findByCategoryId(Integer categoryId);

    List<Camera> findByActiveIsTrue();

    List<Camera> findByHot(boolean hot);

    List<Camera> findByHotAndActiveIsTrue(boolean hot);

}