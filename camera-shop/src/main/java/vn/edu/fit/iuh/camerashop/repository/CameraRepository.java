package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.fit.iuh.camerashop.entity.Camera;

import java.util.List;

public interface CameraRepository extends JpaRepository<Camera, Integer> {

    List<Camera> findByNameContaining(String name);

    @Query("SELECT c FROM Camera c WHERE LOWER(REPLACE(c.name, ' ', '-')) = LOWER(REPLACE(:name, ' ', '-'))")
    Camera findByName(String name);

    List<Camera> findByNameContainingAndActiveIsTrue(String name);

    List<Camera> findByBrandIdAndActiveIsTrue(Integer brandId);

    List<Camera> findByCategoryIdAndActiveIsTrue(Integer categoryId);

    List<Camera> findByBrandId(Integer brandId);

    List<Camera> findByCategoryId(Integer categoryId);

    List<Camera> findByActiveIsTrue();

    List<Camera> findByHotIsTrue();

    List<Camera> findByHotIsTrueAndActiveIsTrue();

}