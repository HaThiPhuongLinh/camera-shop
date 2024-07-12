import axiosClient from './axiosClient';

const brandApi = {
  getAllBrands: () => {
    const url = '/brand';
    return axiosClient.get(url);
  },

  getBrandById: (id) => {
    const url = `/brand/${id}`;
    return axiosClient.get(url);
  },

  addBrand: (brandData) => {
    const url = '/brand';
    return axiosClient.post(url, brandData);
  },

  updateBrand: (id, brandData) => {
    const url = `/brand/${id}`;
    return axiosClient.put(url, brandData);
  },

  deleteBrand: (id) => {
    const url = `/brand/${id}`;
    return axiosClient.delete(url);
  },
};

export default brandApi;