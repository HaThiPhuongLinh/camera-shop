package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.request.CameraRequest;
import vn.edu.fit.iuh.camerashop.entity.Camera;

import java.util.List;

public interface ICameraService {

    List<Camera> getAllCameras();

    Camera getCameraById(long id);

    void saveCamera(CameraRequest request);

    void updateCamera(long id, CameraRequest request);

    void deleteCamera(long id);

    List<Camera> searchCamerasByName(String name);

    List<Camera> getCamerasByBrandId(Integer brandId);

    List<Camera> getCamerasByCategoryId(Integer categoryId);

    List<Camera> getActiveCameras(boolean active);

    List<Camera> getHotCameras(boolean hot);
}
