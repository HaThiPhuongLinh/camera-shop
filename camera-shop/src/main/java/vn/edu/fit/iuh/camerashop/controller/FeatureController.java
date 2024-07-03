package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.request.FeatureRequest;
import vn.edu.fit.iuh.camerashop.entity.Feature;
import vn.edu.fit.iuh.camerashop.service.IFeatureService;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;

import java.util.List;

@RestController
@RequestMapping("/feature")
public class FeatureController {
    @Autowired
    private IFeatureService featureService;

    @GetMapping
    public ResponseEntity<List<Feature>> getAllFeatures() {
        return ResponseEntity.ok(featureService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feature> getFeatureById(@PathVariable long id) {
        return ResponseEntity.ok(featureService.findById(id));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse> addFeature(@RequestBody FeatureRequest request) {
        featureService.add(request);
        return ResponseEntity.ok(new SuccessResponse("Created feature successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> updateFeature(@PathVariable long id, @RequestBody FeatureRequest request) {
        featureService.update(id, request);
        return ResponseEntity.ok(new SuccessResponse("Updated feature successfully"));
    }

}