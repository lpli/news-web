import axios from 'axios';
const MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  })
  // 响应拦截器
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  })

  Vue.prototype.$http = {
    post: function (url, params) {
      return new Promise((resolve, reject) => {
        axios.post(url, params)
          .then(response => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          })
      })
    },
    get: function (url) {
      return new Promise((resolve, reject) => {
        axios.get(url)
          .then(response => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          })
      })
    }
  }



}

export default MyPlugin;
