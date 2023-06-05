import axiosClient from "./axiosClient";
const { adminToken: token } = localStorage;

class ProductsApi {
  // {_limit: 12}
  static getAll(params) {
    const url = "/admin/products";
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static getById(id) {
    const url = `/admin/products/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static add(data) {
    const url = "/admin/product";
    return axiosClient.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static update(data, productId) {
    const url = "/admin/product/" + productId;
    return axiosClient.put(url, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static delete(id) {
    const url = `/admin/products/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}

export default ProductsApi;
