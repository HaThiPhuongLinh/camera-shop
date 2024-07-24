package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.dto.CameraDTO;
import vn.edu.fit.iuh.camerashop.dto.request.CameraRequest;
import vn.edu.fit.iuh.camerashop.entity.Camera;

import java.util.List;

public interface ICameraService {

    Object getAllCameras();

    Camera getCameraById(long id);

    CameraDTO getCameraDTOById(long id);

    CameraDTO getCameraDTOByName(String name);

    void saveCamera(CameraRequest request);

    void updateCamera(long id, CameraRequest request);

    void deleteCamera(long id);

    List<Camera> searchCamerasByName(String name);

    List<CameraDTO> getCamerasByBrandId(Integer brandId);

    List<CameraDTO> getCamerasByCategoryId(Integer categoryId);

    List<CameraDTO> getHotCameras();
}
