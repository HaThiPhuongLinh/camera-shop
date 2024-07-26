import axios from 'axios';
import queryString from 'query-string';
import useAuthStore from '../hooks/authStore';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async (error) => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (error.response && error.response.status === 401 && refreshToken) {
            try {
                const response = await axiosClient.post('/auth/refreshToken', { refreshToken });

                const newToken = response.token;
                const newRefreshToken = response.refreshToken;

                localStorage.setItem('token', newToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                error.config.headers['Authorization'] = `Bearer ${newToken}`;

                return axiosClient(error.config);
            } catch (refreshError) {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('auth-storage');
                const logout = useAuthStore((state) => state.logout);
                logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
