package vn.edu.fit.iuh.camerashop.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.PostRequest;
import vn.edu.fit.iuh.camerashop.entity.Post;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.PostRepository;
import vn.edu.fit.iuh.camerashop.service.IPostService;

import java.util.List;

@Service
public class PostServiceImpl implements IPostService {
    @Autowired
    private PostRepository postRepository;

    @Override
    public List<Post> getAll() {
        return postRepository.findAll();
    }

    @Override
    public Post findById(long id) {
        return postRepository.findById(id).orElseThrow(() -> new NotFoundException("Post not found"));
    }

    @Override
    public void add(PostRequest request) {
        Post post = Post.builder()
                .title(request.getTitle())
                .summary(request.getSummary())
                .content(request.getContent())
                .authorName(request.getAuthorName())
                .publishedAt(request.getPublishedAt())
                .image(request.getImage())
                .build();

        postRepository.save(post);
    }

    @Override
    public void update(long id, PostRequest request) {
        Post post = findById(id);

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setSummary(request.getSummary());
        post.setAuthorName(request.getAuthorName());
        post.setPublishedAt(request.getPublishedAt());
        post.setImage(request.getImage());

        postRepository.save(post);
    }

    @Override
    public void delete(long id) {
        postRepository.deleteById(id);
    }
}
