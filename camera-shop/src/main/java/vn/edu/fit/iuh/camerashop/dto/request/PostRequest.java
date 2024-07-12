package vn.edu.fit.iuh.camerashop.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {
    private String title;
    private String summary;
    private String content;
    private String authorName;
    private Date publishedAt;
    private String image;
}
