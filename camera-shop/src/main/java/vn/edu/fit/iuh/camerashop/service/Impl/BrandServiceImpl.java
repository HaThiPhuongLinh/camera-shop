package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.BrandRequest;
import vn.edu.fit.iuh.camerashop.entity.Brand;
import vn.edu.fit.iuh.camerashop.entity.enums.Role;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.BrandRepository;
import vn.edu.fit.iuh.camerashop.service.IBrandService;

import java.util.List;

@Service
public class BrandServiceImpl implements IBrandService {
    @Autowired
    private BrandRepository brandRepository;

    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(Role.ADMIN.name()));
    }

    @Override
    public List<Brand> getAll() {
        if (isAdmin()) {
            return brandRepository.findAll();
        } else {
            return brandRepository.findAllByActiveIsTrue();
        }
    }

    @Override
    public Brand findById(long id) {
        Brand brand = brandRepository.findById((int) id).orElseThrow(() -> new NotFoundException("Brand not found"));

        if (isAdmin() || brand.isActive()) {
            return brand;
        } else {
            throw new NotFoundException("Brand not found");
        }
    }

    @Override
    public void add(BrandRequest request) {
        Brand brand = Brand.builder()
                .brandName(request.getBrandName())
                .image(request.getImage())
                .code(request.getCode())
                .active(true)
                .build();

        brandRepository.save(brand);
    }

    @Override
    public void update(long id, BrandRequest request) {
        Brand brand = findById(id);

        brand.setBrandName(request.getBrandName());
        brand.setImage(request.getImage());
        brand.setCode(request.getCode());
        brand.setActive(request.isActive());

        brandRepository.save(brand);
    }

    @Override
    public void delete(long id) {
        Brand brand = findById(id);
        brand.setActive(false);
        brandRepository.save(brand);
    }
}
