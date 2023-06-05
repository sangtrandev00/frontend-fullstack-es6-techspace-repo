import axiosClient from "./axiosClient";
const { token } = localStorage;

class ShopApi {
  static getCategories(params) {
    const url = "/categories";
    return axiosClient.get(url, { params });
  }

  static getCategoryById(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  }

  static getProductById(id) {
    const url = "/products/" + id;
    return axiosClient.get(url);
  }

  static getMinPrice() {
    const url = "/product-min-price";
    return axiosClient.get(url);
  }
  static getMaxPrice() {
    const url = "/product-max-price";
    return axiosClient.get(url);
  }

  static getOrderById(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  }

  static getProducts(params) {
    const url = "/products";
    return axiosClient.get(url, { params });
  }

  // When create order
  static createOrder(data) {
    const url = "/order";
    return axiosClient.post(url, data);
  }

  static getUserById(userId) {
    const url = `/users/${userId}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static updateViews(id) {
    const url = `/products/${id}`;
    return axiosClient.patch(url);
  }
}

export default ShopApi;
