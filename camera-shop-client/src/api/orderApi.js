import axiosClient from './axiosClient';

const orderApi = {
  getAllOrders: () => {
    const url = '/order';
    return axiosClient.get(url);
  },

  getOrderById: (orderId) => {
    const url = `/order/${orderId}`;
    return axiosClient.get(url);
  },

  createOrder: (orderData) => {
    const url = '/order';
    return axiosClient.post(url, orderData);
  },

  updateOrderStatus: (orderId, newStatus) => {
    const url = `/order/${orderId}/status/${newStatus}`;
    return axiosClient.put(url);
  },

  getAllOrdersByUserId: (userId) => {
    const url = `/order/user/${userId}`;
    return axiosClient.get(url);
  },

  getSalesReport: (startMonth, endMonth) => {
    const url = `/order/sales-report`;
    return axiosClient.get(url, {
      params: {
        startMonth: startMonth,
        endMonth: endMonth
      }
    });
  },

  getMonthlySalesReports: (startMonth, endMonth) => {
    const url = `/order/monthly-sales-reports`;
    return axiosClient.get(url, {
      params: {
        startMonth: startMonth,
        endMonth: endMonth
      }
    });
  },

  getRecentOrders: () => {
    const url = '/order/recent-orders';
    return axiosClient.get(url);
  }
};

export default orderApi;
