package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.dto.TopSellingVariant;
import vn.edu.fit.iuh.camerashop.dto.request.VariantRequest;
import vn.edu.fit.iuh.camerashop.entity.Camera;
import vn.edu.fit.iuh.camerashop.entity.Order;
import vn.edu.fit.iuh.camerashop.entity.OrderDetail;
import vn.edu.fit.iuh.camerashop.entity.Variant;
import vn.edu.fit.iuh.camerashop.entity.enums.Role;
import vn.edu.fit.iuh.camerashop.entity.enums.Status;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.OrderDetailRepository;
import vn.edu.fit.iuh.camerashop.repository.OrderRepository;
import vn.edu.fit.iuh.camerashop.repository.VariantRepository;
import vn.edu.fit.iuh.camerashop.service.IVariantService;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class VariantServiceImpl implements IVariantService {
    @Autowired
    private VariantRepository variantRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderRepository orderRepository;

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
    public List<TopSellingVariant> getTopSellingVariants() {
        List<Order> deliveredOrders = orderRepository.findOrdersByStatus(Status.DELIVERED);

        Map<Long, Integer> variantSales = new HashMap<>();

        for (Order order : deliveredOrders) {
            List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(order.getId());
            for (OrderDetail orderDetail : orderDetails) {
                long variantId = orderDetail.getVariant().getId();
                int quantity = orderDetail.getQuantity();
                variantSales.put(variantId, variantSales.getOrDefault(variantId, 0) + quantity);
            }
        }

        List<Variant> allVariants = variantRepository.findAll();

        List<TopSellingVariant> topSellingVariants = new ArrayList<>();

        for (Variant variant : allVariants) {
            long variantId = variant.getId();
            if (variantSales.containsKey(variantId)) {
                int quantitySold = variantSales.get(variantId);
                double discountedPrice = variant.getPrice() * (1 - variant.getDiscount() / 100.0);
                String cameraName = variant.getCamera().getName();
                String imgURL = variant.getImages().isEmpty() ? "" : variant.getImages().get(0);

                TopSellingVariant topSellingVariant = TopSellingVariant.builder()
                        .variantId(variantId)
                        .cameraName(cameraName)
                        .quantitySold(quantitySold)
                        .price(discountedPrice)
                        .imgURL(imgURL)
                        .build();

                topSellingVariants.add(topSellingVariant);
            }
        }

        return topSellingVariants.stream()
                .sorted(Comparator.comparingInt(TopSellingVariant::getQuantitySold).reversed())
                .limit(6)
                .collect(Collectors.toList());
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
        variant.setActive(variantRequest.isActive());

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

    @Override
    public void updateVariantQuantity(long variantId, int quantityChange) {
        Variant variant = getVariantById((int) variantId);
        variant.setQuantity(variant.getQuantity() + quantityChange);
        variantRepository.save(variant);
    }
}
