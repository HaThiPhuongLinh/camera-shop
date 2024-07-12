import axiosClient from './axiosClient';

const orderApi = {
  createOrder: (orderData) => {
    const url = '/order';
    return axiosClient.post(url, orderData);
  },

  updateOrderStatus: (orderId, newStatus) => {
    const url = `/order/${orderId}/status/${newStatus}`;
    return axiosClient.put(url);
  },
};

export default orderApi;