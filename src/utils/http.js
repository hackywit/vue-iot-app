/**
 * http配置
 */

import axios from 'axios'
import store from '@/store'

// axios 配置
axios.defaults.timeout = 5000;
//axios.defaults.baseURL = 'http://localhost:3003';
axios.defaults.baseURL = process.env.BASE_API;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        console.log('request');
        console.log(store.getters.token);
        if (store.getters.token) {
            config.headers['Cookie'] = store.getters.token;
        }
        console.log(config);
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log(error);
        /*if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }*/
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;
