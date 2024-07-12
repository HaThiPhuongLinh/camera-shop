import axiosClient from './axiosClient';

const categoryApi = {
  getAllCategories: () => {
    const url = '/category';
    return axiosClient.get(url);
  },

  getCategoryById: (id) => {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },

  addCategory: (categoryData) => {
    const url = '/category';
    return axiosClient.post(url, categoryData);
  },

  updateCategory: (id, categoryData) => {
    const url = `/category/${id}`;
    return axiosClient.put(url, categoryData);
  },

  deleteCategory: (id) => {
    const url = `/category/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;