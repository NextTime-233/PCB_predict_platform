
// 非懒加载模式，开始把全局路由守卫放在前面不能运行

import Vue from 'vue'
import VueRouter from 'vue-router'
import Data from '../views/Data'
import Map from '../views/Map'
import Index from "../views/Index";
import Feedback from "../views/Feedback";
import Login from "../views/Login";
import SignUp from "../views/SignUp";


Vue.use(VueRouter)

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
        path: '/Map',
        name: '时空地图',
        component: Index,
        redirect: 'Map',
        children: [
            {
                path: '/Map',
                name: '时空地图',
                component: Map,
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

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    if (to.path === "/Login") return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/Login')
    next()
})

export default router
