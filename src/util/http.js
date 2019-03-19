import axios from 'axios';
import {
  Message
} from 'element-ui';
import router from '@/pages/index/router';
const MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  axios.defaults.baseURL = '/vlog'
  //请求头
  axios.interceptors.request.use(function (config) {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    let token = localStorage.getItem('token');
    if (token) {
      config.headers['EV-Token'] = token;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  })
  // 响应拦截器
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    let code = error.response.status;
    if (code === 401) {
      Message.error({
        showClose: true,
        message: error.response.data.msg,
        type: 'error'
      });
      router.push('/login');
    } else if (code === 403) {
      Message.error({
        showClose: true,
        message: error.response.data.msg,
        type: 'error'
      });
    }
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
            //reject(error);
          })
      })
    },
    put: function (url, params) {
      return new Promise((resolve, reject) => {
        axios.put(url, params)
          .then(response => {
            resolve(response.data);
          })
          .catch((error) => {
            //reject(error);
          })
      })
    },
    get: function (url, params) {
      return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
          })
          .then(response => {
            resolve(response.data);
          })
          .catch((error) => {
            //reject(error);
          })
      })
    },
    delete: function (url, params) {
      return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params
          })
          .then(response => {
            resolve(response.data);
          })
          .catch((error) => {
            //reject(error);
          })
      })
    }
  }

  Vue.prototype.$storage = {
    put: function (key, value) {
      localStorage.setItem(key, value);
    },
    putObj: function (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getObj: function (key) {
      return JSON.parse(localStorage.getItem(key))
    },
    get: function (key) {
      return localStorage.getItem(key);
    }
  }



}

export default MyPlugin;
