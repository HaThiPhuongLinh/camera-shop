package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.fit.iuh.camerashop.entity.Camera;
import vn.edu.fit.iuh.camerashop.service.Impl.CameraServiceImpl;

import java.util.List;

@RestController("/camera")
public class CameraController {
    @Autowired
    private CameraServiceImpl cameraService;

    @GetMapping
    public List<Camera> getAllCamera() {
        return cameraService.getAllCameras();
    }


}
