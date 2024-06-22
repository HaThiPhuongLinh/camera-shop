package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.request.CameraRequest;
import vn.edu.fit.iuh.camerashop.entity.Camera;

import java.util.List;

public interface ICameraService {

    List<Camera> getAll();

    Camera findById(long id);

    void add(CameraRequest request);

    void update(long id, CameraRequest request);

    void delete(long id);
}
