package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.dto.TopSellingVariant;
import vn.edu.fit.iuh.camerashop.dto.request.VariantRequest;
import vn.edu.fit.iuh.camerashop.entity.Variant;
import vn.edu.fit.iuh.camerashop.service.IVariantService;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;

import java.util.List;

@RestController
@RequestMapping("/variant")
public class VariantController {
    @Autowired
    private IVariantService variantService;

    @GetMapping
    public ResponseEntity<List<Variant>> getAllVariants() {
        return ResponseEntity.ok(variantService.getAllVariants());
    }

    @GetMapping("/hot")
    public ResponseEntity<List<Variant>> getVariantsByHotCameras() {
        return ResponseEntity.ok(variantService.getVariantsByHotCameras());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Variant> getVariantById(@PathVariable Integer id) {
        return ResponseEntity.ok(variantService.getVariantById(id));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse> saveVariant(@RequestBody VariantRequest variantRequest) {
        variantService.saveVariant(variantRequest);
        return ResponseEntity.ok(new SuccessResponse("Created variant successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> updateVariant(@PathVariable Integer id, @RequestBody VariantRequest variantRequest) {
        variantService.updateVariant(id, variantRequest);
        return ResponseEntity.ok(new SuccessResponse("Updated variant successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> deleteVariant(@PathVariable Integer id) {
        variantService.deleteVariant(id);
        return ResponseEntity.ok(new SuccessResponse("Deleted variant successfully"));
    }

    @GetMapping("/camera/{cameraId}")
    public ResponseEntity<List<Variant>> getVariantsByCameraId(@PathVariable Integer cameraId) {
        return ResponseEntity.ok(variantService.getVariantsByCameraId(cameraId));
    }

    @GetMapping("/top-selling-variants")
    public ResponseEntity<List<TopSellingVariant>> getTopSellingVariants() {
        List<TopSellingVariant> topSellingVariants = variantService.getTopSellingVariants();
        return ResponseEntity.ok(topSellingVariants);
    }

}