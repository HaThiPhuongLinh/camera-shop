package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRequest {
    private String categoryName;
    private String image;
    private String code;
    private boolean active;
}
