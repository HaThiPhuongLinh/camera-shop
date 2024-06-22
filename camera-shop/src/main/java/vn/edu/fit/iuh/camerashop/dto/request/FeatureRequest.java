package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FeatureRequest {
    private String featureName;
    private String code;
}
