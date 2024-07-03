package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequest {
    private long userId;
    private long cameraId;
    private String content;
    private int rating;
}
