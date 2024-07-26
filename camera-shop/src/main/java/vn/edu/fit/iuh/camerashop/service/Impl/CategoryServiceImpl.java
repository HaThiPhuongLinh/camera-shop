package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.CategoryRequest;
import vn.edu.fit.iuh.camerashop.entity.Category;
import vn.edu.fit.iuh.camerashop.entity.enums.Role;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.CategoryRepository;
import vn.edu.fit.iuh.camerashop.service.ICategoryService;

import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(Role.ADMIN.name()));
    }

    @Override
    @Cacheable(value = "categories", key = "'all'")
    public List<Category> getAll() {
        if (isAdmin()) {
            return categoryRepository.findAll();
        } else {
            return categoryRepository.findByActiveIsTrue();
        }
    }

    @Override
    @Cacheable(value = "category", key = "#id")
    public Category findById(long id) {
        Category category = categoryRepository.findById((int) id).orElseThrow(() -> new NotFoundException("Category not found"));

        if (isAdmin() || category.isActive()) {
            return category;
        } else {
            throw new NotFoundException("Category not found");
        }
    }

    @Override
    public void add(CategoryRequest request) {
        Category category = Category.builder()
                .categoryName(request.getCategoryName())
                .image(request.getImage())
                .code(request.getCode())
                .active(true)
                .build();

        categoryRepository.save(category);
    }

    @Override
    @CacheEvict(value = "category", key = "#id")
    public void update(long id, CategoryRequest request) {
        Category category = findById(id);

        category.setCategoryName(request.getCategoryName());
        category.setCode(request.getCode());
        category.setImage(request.getImage());
        category.setActive(request.isActive());

        categoryRepository.save(category);
    }

    @Override
    @CacheEvict(value = "category", key = "#id")
    public void delete(long id) {
        Category category = findById(id);
        category.setActive(false);
        categoryRepository.save(category);
    }
}
