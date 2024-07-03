package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeatureRequest {
    private String featureName;
    private String code;
}
