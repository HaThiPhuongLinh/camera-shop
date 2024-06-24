package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.BrandRequest;
import vn.edu.fit.iuh.camerashop.entity.Brand;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.BrandRepository;
import vn.edu.fit.iuh.camerashop.service.IBrandService;

import java.util.List;

@Service
public class BrandServiceImpl implements IBrandService {
    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<Brand> getAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brand findById(long id) {
        return brandRepository.findById((int) id).orElseThrow(() -> new NotFoundException("Brand not found"));
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
        Brand brand = brandRepository.findById((int) id).orElseThrow(() -> new NotFoundException("Brand not found"));

        brand.setBrandName(request.getBrandName());
        brand.setImage(request.getImage());
        brand.setCode(request.getCode());
        brand.setActive(true);

        brandRepository.save(brand);
    }

    @Override
    public void delete(long id) {
        brandRepository.deleteById((int) id);
    }
}
