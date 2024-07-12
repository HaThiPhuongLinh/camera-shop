import axiosClient from './axiosClient';

const loginApi = {
    login: (authRequest) => {
        const url = '/auth/login';
        return axiosClient.post(url, authRequest);
    },

    register: (registrationRequest) => {
        const url = '/auth/register';
        return axiosClient.post(url, registrationRequest);
    },

    refreshToken: (refreshToken) => {
        const url = '/auth/refreshToken';
        return axiosClient.post(url, refreshToken);
    },
};

export default loginApi;
