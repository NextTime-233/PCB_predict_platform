
// 非懒加载模式，开始把全局路由守卫放在前面不能运行
import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Index from "../views/Index";
import Home from "../components/Home";

import Data from '../views/Data'
import Feedback from "../views/Feedback";



Vue.use(Router)


const router = new Router({
    routes : [
        {
            path: '/',
            redirect: '/Login',
        },
        {
            path: '/Login',
            name: '登录',
            component: Login,
            meta:{
                keepalive: false
            },
        },
        {
            path: '/SignUp',
            name: '注册',
            component: SignUp,
            meta:{
                keepalive: false
            }
        },
        {
            path: '/Index',
            name: 'index',
            component: Index,
            redirect: '/Home',
            children: [
                {
                    path: '/Home',
                    name: '首页',
                    component: Home,
                }
            ]
        },
        {
            path: '/data',
            name: '数据展示',
            component: Index,
            redirect: 'Data',
            children: [
                {
                    path: '/Data',
                    name: '清洗数据',
                    component: Data,
                }
            ]
        },
        {
            path: '/Feedback',
            name: '服务中心',
            component: Index,
            redirect: 'Data',
            children: [
                {
                    path: '/Feedback',
                    name: '意见反馈',
                    component: Feedback,
                }
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === "/Login" || to.path === "/SignUp") return next()
    const tokenStr = window.sessionStorage.getItem('token')
    console.log(tokenStr)
    if (!tokenStr) return next('/Login')
    next()
})

export default router
