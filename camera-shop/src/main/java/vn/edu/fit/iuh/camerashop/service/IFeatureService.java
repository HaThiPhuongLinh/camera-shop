package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.request.FeatureRequest;
import vn.edu.fit.iuh.camerashop.entity.Feature;

import java.util.List;

public interface IFeatureService {
    List<Feature> getAll();

    Feature findById(long id);

    void add(FeatureRequest request);

    void update(long id, FeatureRequest request);

    void delete(long id);
}
