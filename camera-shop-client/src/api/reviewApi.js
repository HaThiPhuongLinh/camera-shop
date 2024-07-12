import axiosClient from './axiosClient';

const reviewApi = {
  findReviewsByCameraId: (cameraId) => {
    const url = `/review/camera/${cameraId}`;
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

  deleteReview: (userId, cameraId) => {
    const url = `/review/${userId}/${cameraId}`;
    return axiosClient.delete(url);
  },
};

export default reviewApi;