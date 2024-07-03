package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.request.ReviewRequest;
import vn.edu.fit.iuh.camerashop.entity.Review;

import java.util.List;

public interface IReviewService {

    Review getReviewByUserIdAndCameraId(long userId, long cameraId);

    List<Review> findReviewsByCameraId(int cameraId);

    void saveReview(ReviewRequest reviewRequest);

    void updateReview(ReviewRequest reviewRequest);

    void deleteReview(long userId, long cameraId);

}
