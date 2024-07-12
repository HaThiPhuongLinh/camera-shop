import axiosClient from './axiosClient';

const featureApi = {
  getAllFeatures: () => {
    const url = '/feature';
    return axiosClient.get(url);
  },

  getFeatureById: (id) => {
    const url = `/feature/${id}`;
    return axiosClient.get(url);
  },

  addFeature: (featureData) => {
    const url = '/feature';
    return axiosClient.post(url, featureData);
  },

  updateFeature: (id, featureData) => {
    const url = `/feature/${id}`;
    return axiosClient.put(url, featureData);
  },
};

export default featureApi;