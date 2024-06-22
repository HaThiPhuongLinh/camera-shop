package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.CategoryRequest;
import vn.edu.fit.iuh.camerashop.entity.Category;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.CategoryRepository;
import vn.edu.fit.iuh.camerashop.service.ICategoryService;

import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {
    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(long id) {
        return categoryRepository.findById((int) id).orElseThrow(() -> new NotFoundException("Category not found"));
    }

    @Override
    public void add(CategoryRequest request) {

        Category category = Category.builder()
                .categoryName(request.getCategoryName())
                .code(request.getCode())
                .active(true)
                .build();

        categoryRepository.save(category);
    }

    @Override
    public void update(long id, CategoryRequest request) {
        Category category = categoryRepository.findById((int) id).orElseThrow(() -> new NotFoundException("Category not found"));

        category.setCategoryName(request.getCategoryName());
        category.setCode(request.getCode());
        category.setActive(request.isActive());

        categoryRepository.save(category);
    }

    @Override
    public void delete(long id) {
        categoryRepository.deleteById((int) id);
    }
}
