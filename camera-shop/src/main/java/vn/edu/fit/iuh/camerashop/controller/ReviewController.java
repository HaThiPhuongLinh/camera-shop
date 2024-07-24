package vn.edu.fit.iuh.camerashop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fit.iuh.camerashop.dto.request.ReviewRequest;
import vn.edu.fit.iuh.camerashop.entity.Review;
import vn.edu.fit.iuh.camerashop.service.IReviewService;
import vn.edu.fit.iuh.camerashop.dto.response.SuccessResponse;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private IReviewService reviewService;

    @GetMapping("/camera/{cameraId}")
    public ResponseEntity<List<Review>> findReviewsByCameraId(@PathVariable int cameraId) {
        return ResponseEntity.ok(reviewService.findReviewsByCameraId(cameraId));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Review> getReviewByOrderId(@PathVariable String orderId) {
        return ResponseEntity.ok(reviewService.getReviewsByOrderId(orderId));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse> saveReview(@RequestBody ReviewRequest reviewRequest) {
        reviewService.saveReview(reviewRequest);
        return ResponseEntity.ok(new SuccessResponse("Created review successfully"));
    }

    @PutMapping
    public ResponseEntity<SuccessResponse> updateReview(@RequestBody ReviewRequest reviewRequest) {
        reviewService.updateReview(reviewRequest);
        return ResponseEntity.ok(new SuccessResponse("Updated review successfully"));
    }

    @DeleteMapping("/{userId}/{orderId}/{cameraId}")
    public ResponseEntity<SuccessResponse> deleteReview(@PathVariable long userId, @PathVariable String orderId,  @PathVariable long cameraId) {
        reviewService.deleteReview(userId, orderId, cameraId);
        return ResponseEntity.ok(new SuccessResponse("Deleted review successfully"));
    }
}