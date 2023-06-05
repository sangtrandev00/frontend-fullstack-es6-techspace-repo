import axiosClient from "./axiosClient";

class AuthApi {
  static login(data) {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  }

  // Data: {token: fjskldfjlksdfjkdlsfjd};
  static googleLogin(data) {
    const url = "/auth/google-login";
    return axiosClient.post(url, data);
  }

  static facebookLogin(data) {
    const url = "/auth/facebook-login";
    return axiosClient.post(url, data);
  }

  static googleLogout() {}

  static adminLogin(data) {
    const url = "/auth/admin-login";
    return axiosClient.post(url, data);
  }

  static signup(data) {
    const url = "/auth/signup";
    return axiosClient.put(url, data);
  }

  static checkExisingUser(data) {
    const url = "/auth/exisiting-email";
    return axiosClient.post(url, data);
  }

  static checkExistedFbAccount(data) {
    const url = "/auth/exisiting-fb";
    return axiosClient.post(url, data);
  }

  static sendEmailReset(data) {
    const url = "/auth/reset";
    return axiosClient.post(url, data);
  }

  static updatePassword(data) {
    const url = "/auth/new-password";
    return axiosClient.post(url, data);
  }
}

export default AuthApi;
