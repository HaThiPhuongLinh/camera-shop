package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.request.BrandRequest;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;
import vn.edu.fit.iuh.camerashop.entity.Brand;
import vn.edu.fit.iuh.camerashop.service.IBrandService;

import java.util.List;

@RestController
@RequestMapping("/brand")
public class BrandController {
    @Autowired
    private IBrandService brandService;

    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrands() {
        return ResponseEntity.ok(brandService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrandById(@PathVariable long id) {
        return ResponseEntity.ok(brandService.findById(id));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse> addBrand(@RequestBody BrandRequest request) {
        brandService.add(request);
        return ResponseEntity.ok(new SuccessResponse("Created brand successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> updateBrand(@PathVariable long id, @RequestBody BrandRequest request) {
        brandService.update(id, request);
        return ResponseEntity.ok(new SuccessResponse("Updated brand successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> deleteBrand(@PathVariable long id) {
        brandService.delete(id);
        return ResponseEntity.ok(new SuccessResponse("Deleted brand successfully"));
    }
}