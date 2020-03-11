//import store from '../store/store'
import axios from 'axios';
import router from '../router'
import Vue from 'vue'
import NProgress from 'nprogress'



const baseApiUrl = 'http://ip:port/api/'


const service = axios.create({
    timeout: 10000,
    baseURL: baseApiUrl,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

service.interceptors.request.use(
    config => {
        NProgress.start();
        //let token = store.state.token;
        let token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        NProgress.done();
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    //store.commit('saveToken', '');
                    sessionStorage.clear();
                    Vue.prototype.$message.error("认证失败，请重新登录!");
                    router.push("/home");
                    break;
                default:
                    break;
            }
        }
        NProgress.done();
        return Promise.reject(error);
    }
);

export default service;