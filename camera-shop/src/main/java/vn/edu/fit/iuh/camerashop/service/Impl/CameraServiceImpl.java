package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.CameraRequest;
import vn.edu.fit.iuh.camerashop.entity.Brand;
import vn.edu.fit.iuh.camerashop.entity.Camera;
import vn.edu.fit.iuh.camerashop.entity.Category;
import vn.edu.fit.iuh.camerashop.entity.Feature;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.CameraRepository;
import vn.edu.fit.iuh.camerashop.service.ICameraService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CameraServiceImpl implements ICameraService {
    @Autowired
    private CameraRepository cameraRepository;

    @Autowired
    private BrandServiceImpl brandServiceImpl;

    @Autowired
    private CategoryServiceImpl categoryServiceImpl;

    @Autowired
    private FeatureServiceImpl featureServiceImpl;

    @Override
    public List<Camera> getAll() {
        return cameraRepository.findAll();
    }

    @Override
    public Camera findById(long id) {
        return cameraRepository.findById((int) id).orElseThrow(() -> new NotFoundException("Camera not found"));
    }

    @Override
    public void add(CameraRequest request) {
        Brand brand = brandServiceImpl.findById(request.getBrandId());

        Category category = categoryServiceImpl.findById(request.getCategoryId());

        List<Feature> features = request.getFeatures().stream()
                .map(featureId -> featureServiceImpl.findById(featureId))
                .collect(Collectors.toList());

        Camera camera = Camera.builder()
                .name(request.getName())
                .brand(brand)
                .category(category)
                .warrantyPeriod(request.getWarrantyPeriod())
                .features(features)
                .description(request.getDescription())
                .ISO(request.getISO())
                .shootingSpeed(request.getShootingSpeed())
                .imageStabilization(request.getImageStabilization())
                .resolution(request.getResolution())
                .sensorType(request.getSensorType())
                .videoResolution(request.getVideoResolution())
                .battery(request.getBattery())
                .weight(request.getWeight())
                .images(request.getImages())
                .active(true)
                .build();

         cameraRepository.save(camera);

    }

    @Override
    public void update(long id, CameraRequest request) {
        Camera camera = cameraRepository.findById((int) id).orElseThrow(() -> new NotFoundException("Camera not found"));

        camera.setName(request.getName());
        camera.setWarrantyPeriod(request.getWarrantyPeriod());
        camera.setDescription(request.getDescription());
        camera.setISO(request.getISO());
        camera.setShootingSpeed(request.getShootingSpeed());
        camera.setImageStabilization(request.getImageStabilization());
        camera.setResolution(request.getResolution());
        camera.setSensorType(request.getSensorType());
        camera.setVideoResolution(request.getVideoResolution());
        camera.setBattery(request.getBattery());
        camera.setWeight(request.getWeight());
        camera.setImages(request.getImages());
        camera.setActive(request.isActive());

        Brand brand = brandServiceImpl.findById(request.getBrandId());
        Category category = categoryServiceImpl.findById(request.getCategoryId());
        camera.setBrand(brand);
        camera.setCategory(category);

        List<Feature> features = request.getFeatures().stream()
                .map(featureId -> featureServiceImpl.findById(featureId))
                .collect(Collectors.toList());
        camera.setFeatures(features);

        cameraRepository.save(camera);
    }

    @Override
    public void delete(long id) {
        cameraRepository.deleteById((int) id);
    }
}
