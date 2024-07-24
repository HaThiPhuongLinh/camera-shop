package vn.edu.fit.iuh.camerashop.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.ReviewRequest;
import vn.edu.fit.iuh.camerashop.entity.*;
import vn.edu.fit.iuh.camerashop.exception.NotFoundException;
import vn.edu.fit.iuh.camerashop.repository.ReviewRepository;
import vn.edu.fit.iuh.camerashop.service.IReviewService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements IReviewService {

    private final ReviewRepository reviewRepository;
    private final UserServiceImpl userService;
    private final CameraServiceImpl cameraService;
    private final OrderServiceImpl orderService;

    public Review getReviewByUserIdAndOrderIdAndCameraId(long userId, String orderId, long cameraId) {
        return reviewRepository.findByUserIdAndOrderIdAndCameraId(userId, orderId, cameraId);
    }

    @Override
    public List<Review> findReviewsByCameraId(long cameraId) {
        return reviewRepository.findByCameraId((int) cameraId);
    }

    @Override
    public Review getReviewsByOrderId(String orderId) {
        List<Review> reviews = reviewRepository.findByOrderId(orderId);

        if (reviews.isEmpty()) {
            throw new NotFoundException("No reviews found for this order");
        }

        return reviews.get(0);
    }

    @Override
    public void saveReview(ReviewRequest reviewRequest) {
        User user = userService.getUserById(reviewRequest.getUserId());

        Camera camera = cameraService.getCameraById(reviewRequest.getCameraId());

        Order order = orderService.getOrderById(reviewRequest.getOrderId());

        Review_PK reviewPk = Review_PK.builder()
                .order(order.getId())
                .user(user.getId())
                .camera(camera.getId())
                .build();

        Review review = Review.builder()
                .review_pk(reviewPk)
                .order(order)
                .user(user)
                .camera(camera)
                .content(reviewRequest.getContent())
                .rating(reviewRequest.getRating())
                .createAt(LocalDateTime.now())
                .build();

        reviewRepository.save(review);
    }

    @Override
    public void updateReview(ReviewRequest reviewRequest) {
        Review review = getReviewByUserIdAndOrderIdAndCameraId(reviewRequest.getUserId(), reviewRequest.getOrderId(), reviewRequest.getCameraId());

        if(review == null) {
            throw new NotFoundException("Review not found");
        }

        review.setContent(reviewRequest.getContent());
        review.setRating(reviewRequest.getRating());
        review.setCreateAt(LocalDateTime.now());

        reviewRepository.save(review);
    }

    @Override
    public void deleteReview(long userId, String orderId, long cameraId) {
        Review review = getReviewByUserIdAndOrderIdAndCameraId(userId, orderId, cameraId);

        if(review == null) {
            throw new NotFoundException("Review not found");
        }

        if (review != null) {
            reviewRepository.delete(review);
        }
    }
}
