import axiosClient from "./axiosClient";
const { adminToken: token } = localStorage;

class OrdersApi {
  static getAll(params) {
    const url = "/admin/orders";
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static getById(orderId) {
    const url = `/admin/orders/${orderId}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static add(data) {
    const url = "/admin/orders";
    return axiosClient.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static update(data, orderId) {
    const url = `/admin/orders/${orderId}`;
    return axiosClient.put(url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static updateOrderStatus(data, orderId) {
    const url = `/admin/orders/${orderId}`;
    return axiosClient.patch(url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static delete(orderId) {
    const url = `/admin/orders/${orderId}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}

export default OrdersApi;
