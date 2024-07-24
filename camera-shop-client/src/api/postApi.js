import axiosClient from './axiosClient';

const postApi = {
    getAllPosts: () => {
        const url = '/post';
        return axiosClient.get(url);
    },

    getPostById: (id) => {
        const url = `/post/${id}`;
        return axiosClient.get(url);
    },

    addPost: (postRequest) => {
        const url = '/post';
        return axiosClient.post(url, postRequest);
    },

    updatePost: (id, postRequest) => {
        const url = `/post/${id}`;
        return axiosClient.put(url, postRequest);
    },

    deletePost: (id) => {
        const url = `/post/${id}`;
        return axiosClient.delete(url);
    }
};

export default postApi;
