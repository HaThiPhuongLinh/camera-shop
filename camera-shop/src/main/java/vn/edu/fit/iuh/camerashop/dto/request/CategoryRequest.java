package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CategoryRequest {
    private String categoryName;
    private String code;
    private boolean active;
}
