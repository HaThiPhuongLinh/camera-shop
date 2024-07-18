package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.VariantRequest;
import vn.edu.fit.iuh.camerashop.entity.Camera;
import vn.edu.fit.iuh.camerashop.entity.Variant;
import vn.edu.fit.iuh.camerashop.entity.enums.Role;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.VariantRepository;
import vn.edu.fit.iuh.camerashop.service.IVariantService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VariantServiceImpl implements IVariantService {
    @Autowired
    private VariantRepository variantRepository;

    @Autowired
    private CameraServiceImpl cameraService;

    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(Role.ADMIN.name()));
    }

    @Override
    public List<Variant> getAllVariants() {
        if (isAdmin()) {
            return variantRepository.findAll();
        } else {
            return variantRepository.findByActiveIsTrue();
        }
    }

    @Override
    public Variant getVariantById(Integer id) {
        Variant variant = variantRepository.findById(id).orElseThrow(() -> new NotFoundException("Variant not found"));

        if (isAdmin() || variant.isActive()) {
            return variant;
        } else {
            throw new NotFoundException("Variant not found");
        }
    }

    @Override
    public void saveVariant(VariantRequest variantRequest) {
        Camera camera = cameraService.getCameraById(variantRequest.getCameraId());

        Variant variant = Variant.builder()
                .camera(camera)
                .source(variantRequest.getSource())
                .color(variantRequest.getColor())
                .style(variantRequest.getStyle())
                .set(variantRequest.getSet())
                .quantity(variantRequest.getQuantity())
                .discount(variantRequest.getDiscount())
                .price(variantRequest.getPrice())
                .images(variantRequest.getImages())
                .active(true)
                .build();

        variantRepository.save(variant);
    }

    @Override
    public void updateVariant(Integer id, VariantRequest variantRequest) {
        Camera camera = cameraService.getCameraById(variantRequest.getCameraId());

        Variant variant = getVariantById(id);

        variant.setCamera(camera);
        variant.setSource(variantRequest.getSource());
        variant.setColor(variantRequest.getColor());
        variant.setStyle(variantRequest.getStyle());
        variant.setSet(variantRequest.getSet());
        variant.setQuantity(variantRequest.getQuantity());
        variant.setDiscount(variantRequest.getDiscount());
        variant.setPrice(variantRequest.getPrice());
        variant.setImages(variantRequest.getImages());
        variant.setActive(variant.isActive());

        variantRepository.save(variant);
    }

    @Override
    public void deleteVariant(Integer id) {
        Variant variant = getVariantById(id);
        variant.setActive(false);
        variantRepository.save(variant);
    }

    @Override
    public List<Variant> getVariantsByCameraId(Integer cameraId) {
        return variantRepository.findByCameraId(cameraId);
    }

    @Override
    public List<Variant> getVariantsByHotCameras() {
        return variantRepository.findAll().stream()
                .filter(variant -> variant.getCamera().isHot() && variant.isActive())
                .collect(Collectors.toList());
    }
}
