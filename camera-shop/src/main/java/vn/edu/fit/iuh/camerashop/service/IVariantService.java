package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.dto.TopSellingVariant;
import vn.edu.fit.iuh.camerashop.dto.request.VariantRequest;
import vn.edu.fit.iuh.camerashop.entity.Variant;

import java.util.List;

public interface IVariantService {

    List<Variant> getAllVariants();

    Variant getVariantById(Integer id);

    List<TopSellingVariant> getTopSellingVariants();

    void saveVariant(VariantRequest variantRequest);

    void updateVariant(Integer id, VariantRequest variantRequest);

    void deleteVariant(Integer id);

    List<Variant> getVariantsByCameraId(Integer cameraId);

    List<Variant> getVariantsByHotCameras();

    void updateVariantQuantity(long variantId, int quantityChange);
}
