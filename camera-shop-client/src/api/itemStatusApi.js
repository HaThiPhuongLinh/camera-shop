import axiosClient from './axiosClient';

const itemStatusApi = {
  getStatusByOrderId: (orderId) => {
    const url = `/item-status/${orderId}`;
    return axiosClient.get(url);
  },
};

export default itemStatusApi;