package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.request.BrandRequest;
import vn.edu.fit.iuh.camerashop.entity.Brand;

import java.util.List;

public interface IBrandService {
    List<Brand> getAll();

    Brand findById(long id);

    void add(BrandRequest request);

    void update(long id, BrandRequest request);

    void delete(long id);
}
