import axiosClient from './axiosClient';

const variantApi = {
  getAllVariants: () => {
    const url = '/variant';
    return axiosClient.get(url);
  },

  getVariantsByHotCameras: () => {
    const url = '/variant/hot';
    return axiosClient.get(url);
  },

  getVariantById: (id) => {
    const url = `/variant/${id}`;
    return axiosClient.get(url);
  },

  saveVariant: (variantData) => {
    const url = '/variant';
    return axiosClient.post(url, variantData);
  },

  updateVariant: (id, variantData) => {
    const url = `/variant/${id}`;
    return axiosClient.put(url, variantData);
  },

  deleteVariant: (id) => {
    const url = `/variant/${id}`;
    return axiosClient.delete(url);
  },

  getVariantsByCameraId: (cameraId) => {
    const url = `/variant/camera/${cameraId}`;
    return axiosClient.get(url);
  },
};

export default variantApi;