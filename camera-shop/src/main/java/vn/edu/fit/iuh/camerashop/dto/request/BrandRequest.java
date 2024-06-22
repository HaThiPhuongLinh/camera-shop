package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BrandRequest {
    private String brandName;
    private String image;
    private String code;
    private boolean active;
}
