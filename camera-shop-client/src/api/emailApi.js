import axiosClient from './axiosClient';

const emailApi = {
  sendEmail: (email) => {
    const url = '/email/subscribe'; 
    return axiosClient.post(url, null, { 
      params: {
        email: email 
      }
    });
  },
};
export default emailApi;