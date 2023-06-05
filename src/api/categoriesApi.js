import axiosClient from "./axiosClient";

const { adminToken: token } = localStorage;

class CategoriesApi {
  static getAll() {
    const url = "/admin/categories";
    return axiosClient.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static getById(id) {
    const url = `/admin/categories/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static add(data) {
    const url = "/admin/category";
    return axiosClient.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static update(data, categoryId) {
    const url = "/admin/category/" + categoryId;
    return axiosClient.put(url, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static delete(id) {
    const url = `/admin/categories/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}

export default CategoriesApi;
