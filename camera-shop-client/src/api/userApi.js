import axiosClient from './axiosClient';

const userApi = {
  getAllUsers: () => {
    const url = '/user';
    return axiosClient.get(url);
  },

  getUserById: (id) => {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },

  updateUser: (id, userData) => {
    const url = `/user/${id}`;
    return axiosClient.put(url, userData);
  },

  deleteUser: (id) => {
    const url = `/user/${id}`;
    return axiosClient.delete(url);
  },

  activeUser: (id) => {
    const url = `/user/${id}`;
    return axiosClient.post(url);
  },
};

export default userApi;