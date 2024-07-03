package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.request.CategoryRequest;
import vn.edu.fit.iuh.camerashop.entity.Category;
import vn.edu.fit.iuh.camerashop.service.ICategoryService;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable long id) {
        return ResponseEntity.ok(categoryService.findById(id));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse> addCategory( @RequestBody CategoryRequest request) {
        categoryService.add(request);
        return ResponseEntity.ok(new SuccessResponse("Created category successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> updateCategory(@PathVariable long id, @RequestBody CategoryRequest request) {
        categoryService.update(id, request);
        return ResponseEntity.ok(new SuccessResponse("Updated category successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> deleteCategory(@PathVariable long id) {
        categoryService.delete(id);
        return ResponseEntity.ok(new SuccessResponse("Deleted category successfully"));
    }
}