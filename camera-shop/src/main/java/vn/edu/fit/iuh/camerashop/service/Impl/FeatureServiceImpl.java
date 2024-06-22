package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.FeatureRequest;
import vn.edu.fit.iuh.camerashop.entity.Feature;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.FeatureRepository;
import vn.edu.fit.iuh.camerashop.service.IFeatureService;

import java.util.List;

@Service
public class FeatureServiceImpl implements IFeatureService {
    @Autowired
    private FeatureRepository featureRepository;


    @Override
    public List<Feature> getAll() {
        return featureRepository.findAll();
    }

    @Override
    public Feature findById(long id) {
        return featureRepository.findById((int) id).orElseThrow(() -> new NotFoundException("Feature not found"));
    }

    @Override
    public void add(FeatureRequest request) {
            Feature feature = Feature.builder()
                    .featureName(request.getFeatureName())
                    .code(request.getCode())
                    .build();

            featureRepository.save(feature);
    }

    @Override
    public void update(long id, FeatureRequest request) {
        Feature feature = featureRepository.findById((int) id).orElseThrow(() -> new NotFoundException("Feature not found"));

        feature.setFeatureName(request.getFeatureName());
        feature.setCode(request.getCode());

        featureRepository.save(feature);
    }

    @Override
    public void delete(long id) {
        featureRepository.deleteById((int) id);
    }
}
