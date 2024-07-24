package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.dto.CameraDTO;
import vn.edu.fit.iuh.camerashop.dto.request.CameraRequest;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;
import vn.edu.fit.iuh.camerashop.entity.Camera;
import vn.edu.fit.iuh.camerashop.service.ICameraService;

import java.util.List;

@RestController
@RequestMapping("/camera")
public class CameraController {
    @Autowired
    private ICameraService cameraService;

    @GetMapping
    public ResponseEntity<Object> getAllCameras() {
        return ResponseEntity.ok(cameraService.getAllCameras());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Camera> getCameraById(@PathVariable long id) {
        return ResponseEntity.ok(cameraService.getCameraById(id));
    }

    @GetMapping("/dto/{id}")
    public ResponseEntity<CameraDTO> getCameraDTOById(@PathVariable long id) {
        return ResponseEntity.ok(cameraService.getCameraDTOById(id));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse> saveCamera(@RequestBody CameraRequest request) {
        cameraService.saveCamera(request);
        return ResponseEntity.ok(new SuccessResponse("Created camera successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> updateCamera(@PathVariable long id, @RequestBody CameraRequest request) {
        cameraService.updateCamera(id, request);
        return ResponseEntity.ok(new SuccessResponse("Updated camera successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> deleteCamera(@PathVariable long id) {
        cameraService.deleteCamera(id);
        return ResponseEntity.ok(new SuccessResponse("Deleted camera successfully"));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<CameraDTO> getCameraByName(@PathVariable String name) {
        CameraDTO cameraDTO = cameraService.getCameraDTOByName(name);
        return ResponseEntity.ok(cameraDTO);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<Camera>> searchCamerasByName(@PathVariable String name) {
        return ResponseEntity.ok(cameraService.searchCamerasByName(name));
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<CameraDTO>> getCamerasByBrandId(@PathVariable Integer brandId) {
        return ResponseEntity.ok(cameraService.getCamerasByBrandId(brandId));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<CameraDTO>> getCamerasByCategoryId(@PathVariable Integer categoryId) {
        return ResponseEntity.ok(cameraService.getCamerasByCategoryId(categoryId));
    }

    @GetMapping("/hot")
    public ResponseEntity<List<CameraDTO>> getHotCameras() {
        return ResponseEntity.ok(cameraService.getHotCameras());
    }
}