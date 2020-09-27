"use strict";

import Vue from 'vue';
import axios from "axios";


// var instance = axios.create({
//
// });
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// axios.interceptors.request.use(config=>{
//   console.log(config)
//   return config
// })

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  //   Headers:{
  //       token: window.sessionStorage.getItem('token'),
  //       'Content-Type': 'application/json'
  //   },
  //   tokenBackend: window.sessionStorage.getItem('token')
};
let url = {
    baseURL:'http://192.168.1.105:8080'
}
const _axios = axios.create({
    config,
    url
});  // 创建axios实例

_axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
      // Do something with response data
      return response;
    },
    function(error) {
      // Do something with response error
      return Promise.reject(error);
    }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin)

export default Plugin;
