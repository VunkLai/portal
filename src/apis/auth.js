import axios from "axios";

class Auth {
  async register(host, username, password) {
    const url = `${host}/auth/register`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, { username, password })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  }

  async login(host, username, password) {
    const url = `${host}/auth/login`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, { username, password })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  }

  async refreshToken(host, accessToken, refreshToken) {
    const url = `${host}/auth/refresh-token`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, { accessToken, refreshToken })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  }

  async logout(host, accessToken) {
    const url = `${host}/auth/logout`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, { accessToken })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  }

  async changePassword(host, accessToken, password, newPassword) {
    const url = `${host}/auth/change-password`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, { accessToken, password, newPassword })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  }
}

const api = new Auth();

export default api;
