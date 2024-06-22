package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.request.CategoryRequest;
import vn.edu.fit.iuh.camerashop.entity.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAll();

    Category findById(long id);

    void add(CategoryRequest request);

    void update(long id, CategoryRequest request);

    void delete(long id);
}
