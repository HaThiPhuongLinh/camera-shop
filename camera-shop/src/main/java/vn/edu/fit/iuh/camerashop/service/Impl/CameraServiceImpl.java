package vn.edu.fit.iuh.camerashop.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.CameraRequest;
import vn.edu.fit.iuh.camerashop.entity.Brand;
import vn.edu.fit.iuh.camerashop.entity.Camera;
import vn.edu.fit.iuh.camerashop.entity.Category;
import vn.edu.fit.iuh.camerashop.entity.Feature;
import vn.edu.fit.iuh.camerashop.entity.enums.Role;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.CameraRepository;
import vn.edu.fit.iuh.camerashop.service.ICameraService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CameraServiceImpl implements ICameraService {

    private final CameraRepository cameraRepository;
    private final BrandServiceImpl brandServiceImpl;
    private final CategoryServiceImpl categoryServiceImpl;
    private final FeatureServiceImpl featureServiceImpl;

    @Override
    public List<Camera> getAllCameras() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(Role.ADMIN.name()))) {
            return cameraRepository.findAll();
        } else {
            return cameraRepository.findByActiveIsTrue();
        }
    }

    @Override
    public Camera getCameraById(long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Camera camera = cameraRepository.findById((int) id).orElseThrow(() -> new NotFoundException("Camera not found"));

        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(Role.ADMIN.name()))) {
            return camera;
        } else {
            if (camera.isActive()) {
                return camera;
            } else {
                throw new NotFoundException("Camera not found");
            }
        }
    }

    @Override
    public void saveCamera(CameraRequest request) {
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
                .stabilization(request.getStabilization())
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
    public void updateCamera(long id, CameraRequest request) {
        Camera camera = getCameraById(id);

        Brand brand = brandServiceImpl.findById(request.getBrandId());

        Category category = categoryServiceImpl.findById(request.getCategoryId());

        List<Feature> features = request.getFeatures().stream()
                .map(featureId -> featureServiceImpl.findById(featureId))
                .collect(Collectors.toList());
        camera.setFeatures(features);

        camera.setName(request.getName());
        camera.setWarrantyPeriod(request.getWarrantyPeriod());
        camera.setDescription(request.getDescription());
        camera.setISO(request.getISO());
        camera.setShootingSpeed(request.getShootingSpeed());
        camera.setStabilization(request.getStabilization());
        camera.setResolution(request.getResolution());
        camera.setSensorType(request.getSensorType());
        camera.setVideoResolution(request.getVideoResolution());
        camera.setBattery(request.getBattery());
        camera.setWeight(request.getWeight());
        camera.setImages(request.getImages());
        camera.setActive(request.isActive());
        camera.setBrand(brand);
        camera.setCategory(category);

        cameraRepository.save(camera);
    }

    @Override
    public void deleteCamera(long id) {
        Camera camera = getCameraById(id);
        camera.setActive(false);
        cameraRepository.save(camera);
    }

    @Override
    public List<Camera> searchCamerasByName(String name) {
        return cameraRepository.findByNameContaining(name);
    }

    @Override
    public List<Camera> getCamerasByBrandId(Integer brandId) {
        return cameraRepository.findByBrandId(brandId);
    }

    @Override
    public List<Camera> getCamerasByCategoryId(Integer categoryId) {
        return cameraRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Camera> getActiveCameras() {
        return cameraRepository.findByActiveIsTrue();
    }

    @Override
    public List<Camera> getHotCameras(boolean hot) {
        return cameraRepository.findByHot(hot);
    }
}
