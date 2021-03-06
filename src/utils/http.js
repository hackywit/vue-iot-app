/**
 * http配置
 */

import axios from 'axios'

// axios 配置
axios.defaults.timeout = 5000;
// 这边不能写在配置文件中，打包的时候会忽略
axios.defaults.baseURL = "http://39.104.56.173:8000";
// axios.defaults.baseURL = "http://127.0.0.1:80";
// axios.defaults.baseURL = process.env.BASE_API;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 不加这个显示不出请求，post需要用到，不能少，不然报错
    config.headers = {};
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response.data)
  }
);

export default axios;
