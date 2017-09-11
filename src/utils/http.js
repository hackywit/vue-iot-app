/**
 * http配置
 */

import axios from 'axios'
import store from '@/store'

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://localhost:80';
axios.defaults.baseURL = process.env.BASE_API;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Cookie'] = store.getters.token;
        }
        config.data=JSON.stringify(config.data);
        config.headers = {

        };
      //添加跨域请求时候，设置可以向服务器发送cookie
      config.withCredentials=true;
      return config;
    },
    error => {
        return Promise.reject(error);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response.data)
    });

export default axios;
