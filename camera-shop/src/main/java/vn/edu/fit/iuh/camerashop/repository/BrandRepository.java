package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fit.iuh.camerashop.entity.Brand;

import java.util.List;

public interface BrandRepository extends JpaRepository<Brand, Integer> {

    List<Brand> findAllByActiveIsTrue();

}