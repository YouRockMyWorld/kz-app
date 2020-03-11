import Vue from 'vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from "./components/Users.vue";
import UserDetais from "./components/UserDetails";
import Logs from "./components/Logs.vue";
import Sessions from './components/Sessions'
import VueRouter from 'vue-router'
//import store from './store/store'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            redirect: '/welcome',
            children: [
                {
                    path: '/welcome',
                    name: 'welcome',
                    component: Welcome
                },
                {
                    path: '/users',
                    name: 'users',
                    component: Users
                },
                {
                    path: '/userdetails',
                    name: 'userdetails',
                    component: UserDetais
                },
                {
                    path: '/logs',
                    name: 'logs',
                    component: Logs
                },
                {
                    path:'/sessions',
                    name:'sessions',
                    component: Sessions
                },
                {
                    path:'/***',
                    name:'***',
                    component: Welcome
                },
                {
                    path:'/configurations',
                    name:'configurations',
                    component: Welcome
                }
            ]
        }
    ],
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        return next();
    }
    const token = sessionStorage.getItem('token');
    //const token = store.state.token;
    if (!token) {
        return next('/login')
    }
    next();
})

export default router;