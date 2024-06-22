package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fit.iuh.camerashop.entity.Variant;

import java.util.List;

public interface VariantRepository extends JpaRepository<Variant, Integer> {

    List<Variant> findVariantsByCameraId(Integer cameraId);

}