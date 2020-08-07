// 注释代码为懒加载模式，开始把全局路由守卫放在前面不能运行
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes : [
        {
            path: '/',
            component:() => import('../components/Login.vue')
        },
        {
            path: '/Login',
            component:() => import('../components/Login.vue')
        },
        {
            path: '/SignUp',
            component:() => import('../components/SignUp')
        },
        {
            path: '/Index',
            component:() => import('../views/Index'),
            children: [
                {
                    path: '/Home',
                    component:() => import('../components/Home')
                },
                {
                    path: '/employee',
                    component:() => import('../views/Employee/employee')
                },
                {
                    path: '/purchase',
                    component:() => import('../views/Business/purchase')
                },
                {
                    path: '/EntireOrder',
                    component:() => import('../views/Business/EntireOrder')
                },
                {
                    path: '/manage',
                    component:() => import('../views/Business/manage')
                },
                {
                    path: '/detail',
                    component:() => import('../views/Business/detail')
                },
                {
                    path: '/Client',
                    component:() => import('../views/UserAnalysis/Client')
                },
                {
                    path: '/userImage',
                    component:() => import('../views/UserAnalysis/userImage')
                },
                {
                    path: '/Analysis',
                    component:() => import('../views/UserAnalysis/Analysis')
                },
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
