import Vue from 'vue';
import Vuex from 'vuex';
import { getBreadcrumbPath } from '../helpers/utils'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // token:'',
        menuList: [
            {
                id: 1,
                name: "用户管理",
                path: "/UserManagement",
                icon: "el-icon-user-solid",
                children: [
                    {
                        id: 11,
                        name: "用户总览",
                        path: "/users",
                        icon: "el-icon-menu",
                        children: []
                    },
                    {
                        id: 12,
                        name: "用户详情",
                        path: "/userdetails",
                        icon: "el-icon-menu",
                        children: []
                    }
                ]
            },
            {
                id: 2,
                name: "日志管理",
                path: "/LogManagement",
                icon: "el-icon-notebook-2",
                children: [
                    {
                        id: 21,
                        name: "日志信息",
                        path: "/logs",
                        icon: "el-icon-menu",
                        children: []
                    }
                ]
            },
            {
                id: 3,
                name: "会话管理",
                path: "/SessionManagement",
                icon: "el-icon-connection",
                children: [
                    {
                        id: 31,
                        name: "连接会话",
                        path: "/sessions",
                        icon: "el-icon-menu",
                        children: []
                    }
                ]
            },
            {
                id: 4,
                name: "文件管理",
                path: "/FileManagement",
                icon: "el-icon-document",
                children: [
                    {
                        id: 41,
                        name: "***文件",
                        path: "/***",
                        icon: "el-icon-menu",
                        children: []
                    }
                ]
            },
            {
                id: 5,
                name: "配置管理",
                path: "/ConfigManagement",
                icon: "el-icon-s-tools",
                children: [
                    {
                        id: 51,
                        name: "系统配置",
                        path: "/configurations",
                        icon: "el-icon-menu",
                        children: []
                    }
                ]
            }
        ]
    },
    getters:{
        breadcrumbList(state){
            let outList = [];
            let res = [];
            getBreadcrumbPath(state.menuList, res, outList);
            return outList;
        }
    },
    mutations: {
        // saveToken(state, data) {
        //     state.token = data;
        //     sessionStorage.setItem('token', data);
        // }
    }
});

export default store;