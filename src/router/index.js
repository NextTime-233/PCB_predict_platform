
// 非懒加载模式，开始把全局路由守卫放在前面不能运行

import Vue from 'vue'
import Router from 'vue-router'

import Data from '../views/Data'
import Home from "../views/Home";
import Index from "../views/Index";
import Feedback from "../views/Feedback";
import Login from "../components/Login";
import SignUp from "../components/SignUp";


Vue.use(Router)

const routes = [
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
        path: '/Home',
        name: 'index',
        component: Index,
        redirect: 'Map',
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

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
    if (to.path === "/Login" || to.path === "/SignUp") return next()
    const tokenStr = window.sessionStorage.getItem('token')
    console.log(tokenStr)
    if (!tokenStr) return next('/Login')
    next()
})

export default router
