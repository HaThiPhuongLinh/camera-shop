package vn.edu.fit.iuh.camerashop.service.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.fit.iuh.camerashop.dto.request.ReviewRequest;
import vn.edu.fit.iuh.camerashop.entity.Camera;
import vn.edu.fit.iuh.camerashop.entity.Review;
import vn.edu.fit.iuh.camerashop.entity.User;
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

    public Review getReviewByUserIdAndCameraId(long userId, long cameraId) {
        return reviewRepository.findByUserIdAndCameraId(userId, cameraId);
    }

    @Override
    public List<Review> findReviewsByCameraId(int cameraId) {
        return reviewRepository.findByCameraId(cameraId);
    }

    @Override
    public void saveReview(ReviewRequest reviewRequest) {
        User user = userService.getUserById(reviewRequest.getUserId());

        Camera camera = cameraService.getCameraById(reviewRequest.getCameraId());

        Review review = Review.builder()
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
        Review review = getReviewByUserIdAndCameraId(reviewRequest.getUserId(), reviewRequest.getCameraId());

        review.setContent(reviewRequest.getContent());
        review.setRating(reviewRequest.getRating());
        review.setCreateAt(LocalDateTime.now());

        reviewRepository.save(review);
    }

    @Override
    public void deleteReview(long userId, long cameraId) {
        Review review = getReviewByUserIdAndCameraId(userId, cameraId);

        if (review != null) {
            reviewRepository.delete(review);
        }
    }
}
