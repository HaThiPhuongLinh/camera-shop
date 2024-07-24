package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.request.PostRequest;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;
import vn.edu.fit.iuh.camerashop.entity.Post;
import vn.edu.fit.iuh.camerashop.service.IPostService;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private IPostService postService;

    @GetMapping
    public ResponseEntity<List<Post>> getAll() {
        return ResponseEntity.ok(postService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> findById(@PathVariable long id) {
        return ResponseEntity.ok(postService.findById(id));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse> add(@RequestBody PostRequest request) {
        postService.add(request);
        return ResponseEntity.ok(new SuccessResponse("Created post successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuccessResponse> update(@PathVariable long id, @RequestBody PostRequest request) {
        postService.update(id, request);
        return ResponseEntity.ok(new SuccessResponse("Updated post successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> delete(@PathVariable long id) {
        postService.delete(id);
        return ResponseEntity.ok(new SuccessResponse("Deleted post successfully"));

    }
}