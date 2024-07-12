import axiosClient from './axiosClient';

const cartApi = {
  getCartByUserId: (userId) => {
    const url = `/cart/${userId}`;
    return axiosClient.get(url);
  },

  getCartItemsByCartId: (cartId) => {
    const url = `/cart-item/cart/${cartId}`;
    return axiosClient.get(url);
  },

  addCartItem: (cartItemData) => {
    const url = '/cart-item';
    return axiosClient.post(url, cartItemData);
  },

  updateCartItem: (cartItemData) => {
    const url = '/cart-item';
    return axiosClient.put(url, cartItemData);
  },

  deleteCartItem: (cartId, variantId) => {
    const url = `/cart-item/${cartId}/${variantId}`;
    return axiosClient.delete(url);
  }
};

export default cartApi;