import axiosClient from './axiosClient';

const cameraApi = {
  getAllCameras: () => {
    const url = '/camera';
    return axiosClient.get(url);
  },

  getCameraById: (id) => {
    const url = `/camera/${id}`;
    return axiosClient.get(url);
  },

  saveCamera: (cameraData) => {
    const url = '/camera';
    return axiosClient.post(url, cameraData);
  },

  updateCamera: (id, cameraData) => {
    const url = `/camera/${id}`;
    return axiosClient.put(url, cameraData);
  },

  deleteCamera: (id) => {
    const url = `/camera/${id}`;
    return axiosClient.delete(url);
  },

  searchCamerasByName: (name) => {
    const url = `/camera/search/${name}`;
    return axiosClient.get(url);
  },

  getCamerasByBrandId: (brandId) => {
    const url = `/camera/brand/${brandId}`;
    return axiosClient.get(url);
  },

  getCamerasByCategoryId: (categoryId) => {
    const url = `/camera/category/${categoryId}`;
    return axiosClient.get(url);
  },

  getActiveCameras: () => {
    const url = '/camera/active';
    return axiosClient.get(url);
  },

  getHotCameras: (hot) => {
    const url = `/camera/hot/${hot}`;
    return axiosClient.get(url);
  },
};

export default cameraApi;