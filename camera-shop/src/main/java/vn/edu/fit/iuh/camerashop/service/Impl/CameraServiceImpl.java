package vn.edu.fit.iuh.camerashop.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.dto.CameraDTO;
import vn.edu.fit.iuh.camerashop.dto.dto.VariantDTO;
import vn.edu.fit.iuh.camerashop.dto.request.CameraRequest;
import vn.edu.fit.iuh.camerashop.entity.Brand;
import vn.edu.fit.iuh.camerashop.entity.Camera;
import vn.edu.fit.iuh.camerashop.entity.Category;
import vn.edu.fit.iuh.camerashop.entity.Feature;
import vn.edu.fit.iuh.camerashop.entity.enums.Role;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.CameraRepository;
import vn.edu.fit.iuh.camerashop.repository.VariantRepository;
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
    private final VariantRepository variantRepository;

    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(Role.ADMIN.name()));
    }

    @Override
    public Object getAllCameras() {
        List<Camera> cameras;
        if (isAdmin()) {
            cameras = cameraRepository.findAll();
            return cameras;
        } else {
            cameras = cameraRepository.findByActiveIsTrue();
            return getCameraDTOS(cameras);
        }
    }

    @Override
    public Camera getCameraById(long id) {
        Camera camera = cameraRepository.findById((int) id)
                .orElseThrow(() -> new NotFoundException("Camera not found"));
        if (isAdmin() || camera.isActive()) {
            return camera;
        } else {
            throw new NotFoundException("Camera not found");
        }
    }

    @Override
    public CameraDTO getCameraDTOById(long id) {
        Camera camera = cameraRepository.findById((int) id)
                .orElseThrow(() -> new NotFoundException("Camera not found"));
        if (isAdmin() || camera.isActive()) {
            return convertToDTO(camera);
        } else {
            throw new NotFoundException("Camera not found");
        }
    }

    @Override
    public CameraDTO getCameraDTOByName(String name) {
        Camera camera = cameraRepository.findByName(name);
        if (isAdmin() || camera.isActive()) {
            return convertToDTO(camera);
        } else {
            throw new NotFoundException("Camera not found");
        }
    }

    @Override
    public void saveCamera(CameraRequest request) {
        Brand brand = brandServiceImpl.findById(request.getBrandId());

        Category category = categoryServiceImpl.findById(request.getCategoryId());

        List<Feature> features = request.getFeatures().stream()
                .map(featureServiceImpl::findById)
                .collect(Collectors.toList());

        Camera camera = Camera.builder()
                .name(request.getName())
                .brand(brand)
                .category(category)
                .warrantyPeriod(request.getWarrantyPeriod())
                .features(features)
                .description(request.getDescription())
                .ISO(request.getISO())
                .size(request.getSize())
                .shootingSpeed(request.getShootingSpeed())
                .stabilization(request.getStabilization())
                .resolution(request.getResolution())
                .sensorType(request.getSensorType())
                .videoResolution(request.getVideoResolution())
                .battery(request.getBattery())
                .weight(request.getWeight())
                .images(request.getImages())
                .hot(request.isHot())
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
        camera.setSize(request.getSize());
        camera.setShootingSpeed(request.getShootingSpeed());
        camera.setStabilization(request.getStabilization());
        camera.setResolution(request.getResolution());
        camera.setSensorType(request.getSensorType());
        camera.setVideoResolution(request.getVideoResolution());
        camera.setBattery(request.getBattery());
        camera.setWeight(request.getWeight());
        camera.setImages(request.getImages());
        camera.setActive(request.isActive());
        camera.setHot(request.isHot());
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
        if (isAdmin()) {
            return cameraRepository.findByNameContaining(name);
        } else {
            return cameraRepository.findByNameContainingAndActiveIsTrue(name);
        }
    }

    @Override
    public List<CameraDTO> getCamerasByBrandId(Integer brandId) {
        List<Camera> cameras;
        if (isAdmin()) {
            cameras = cameraRepository.findByBrandId(brandId);
        } else {
            cameras = cameraRepository.findByBrandIdAndActiveIsTrue(brandId);
        }
        return getCameraDTOS(cameras);
    }


    @Override
    public List<CameraDTO> getCamerasByCategoryId(Integer categoryId) {
        List<Camera> cameras;
        if (isAdmin()) {
            cameras = cameraRepository.findByCategoryId(categoryId);
        } else {
            cameras = cameraRepository.findByCategoryIdAndActiveIsTrue(categoryId);
        }
        return getCameraDTOS(cameras);
    }

    private CameraDTO convertToDTO(Camera camera) {
        List<VariantDTO> variants = variantRepository.findByCameraId((int) camera.getId()).stream()
                .map(variant -> VariantDTO.builder()
                        .id(variant.getId())
                        .source(variant.getSource())
                        .color(variant.getColor())
                        .style(variant.getStyle())
                        .set(variant.getSet())
                        .quantity(variant.getQuantity())
                        .discount(variant.getDiscount())
                        .price(variant.getPrice())
                        .active(variant.isActive())
                        .images(variant.getImages())
                        .build())
                .collect(Collectors.toList());

        return CameraDTO.builder()
                .id(camera.getId())
                .name(camera.getName())
                .brandId(camera.getBrand().getId())
                .categoryId(camera.getCategory().getId())
                .warrantyPeriod(camera.getWarrantyPeriod())
                .features(camera.getFeatures().stream().map(Feature::getId).collect(Collectors.toList()))
                .description(camera.getDescription())
                .ISO(camera.getISO())
                .shootingSpeed(camera.getShootingSpeed())
                .stabilization(camera.getStabilization())
                .resolution(camera.getResolution())
                .sensorType(camera.getSensorType())
                .videoResolution(camera.getVideoResolution())
                .battery(camera.getBattery())
                .weight(camera.getWeight())
                .size(camera.getSize())
                .hot(camera.isHot())
                .images(camera.getImages())
                .active(camera.isActive())
                .variants(variants)
                .build();
    }

    private List<CameraDTO> getCameraDTOS(List<Camera> cameras) {
        return cameras.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CameraDTO> getHotCameras() {
        List<Camera> cameras;
        if (isAdmin()) {
            cameras =  cameraRepository.findByHotIsTrue();
        } else {
            cameras = cameraRepository.findByHotIsTrueAndActiveIsTrue();
        }

        return getCameraDTOS(cameras);
    }
}
