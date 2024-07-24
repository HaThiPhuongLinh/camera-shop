package vn.edu.fit.iuh.camerashop.service;

import vn.edu.fit.iuh.camerashop.dto.dto.TopSellingVariant;
import vn.edu.fit.iuh.camerashop.dto.request.ReviewRequest;
import vn.edu.fit.iuh.camerashop.entity.Review;

import java.util.List;

public interface IReviewService {

    Review getReviewByUserIdAndOrderIdAndCameraId(long userId, String orderId, long cameraId);

    List<Review> findReviewsByCameraId(long cameraId);

    Review getReviewsByOrderId(String orderId);

    void saveReview(ReviewRequest reviewRequest);

    void updateReview(ReviewRequest reviewRequest);

    void deleteReview(long userId, String orderId, long cameraId);

}
