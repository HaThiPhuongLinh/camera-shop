import axiosClient from './axiosClient';

const reviewApi = {
  findReviewsByCameraId: (cameraId) => {
    const url = `/review/camera/${cameraId}`;
    return axiosClient.get(url);
  },

  getReviewByOrderId: (orderId) => {
    const url = `/review/order/${orderId}`;
    return axiosClient.get(url);
  },

  saveReview: (reviewData) => {
    const url = '/review';
    return axiosClient.post(url, reviewData);
  },

  updateReview: (reviewData) => {
    const url = '/review';
    return axiosClient.put(url, reviewData);
  },

  deleteReview: (userId, orderId, cameraId, ) => {
    const url = `/review/${userId}/${orderId}/${cameraId}`;
    return axiosClient.delete(url);
  },
};

export default reviewApi;

