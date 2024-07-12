package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.request.PostRequest;
import vn.edu.fit.iuh.camerashop.entity.Post;

import java.util.List;

public interface IPostService {
    List<Post> getAll();

    Post findById(long id);

    void add(PostRequest request);

    void update(long id, PostRequest request);

    void delete(long id);
}
