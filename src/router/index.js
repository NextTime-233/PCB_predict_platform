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
            component:() => import('../components/Login.vue'),
            meta: {
                title: '登录页面',
                module: '登录'
            },
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
                    component:() => import('../components/Home'),
                    meta: {
                        title: 'HomePage',
                        module: '首页'
                    },
                },
                {
                    path: '/employee',
                    component:() => import('../views/Employee/employee'),
                    meta: {
                        title: '员工管理',
                        module: '员工'
                    },
                },
                {
                    path: '/Task',
                    component:() => import('../views/Employee/Task'),
                    meta: {
                        title: '任务管理',
                        module: '任务'
                    },
                },
                {
                    path: '/purchase',
                    component:() => import('../views/Business/purchase'),
                    meta: {
                        title: '货品档案',
                        module: '货品'
                    },
                },
                {
                    path: '/EntireOrder',
                    component:() => import('../views/Business/EntireOrder'),
                    meta: {
                        title: '订单一体化',
                        module: '订单'
                    },
                },
                {
                    path: '/manage',
                    component:() => import('../views/Business/manage'),
                    meta: {
                        title: '订单管理',
                        module: '订单'
                    },
                },
                {
                    path: '/detail',
                    component:() => import('../views/Business/detail'),
                    meta: {
                        title: '订单详情',
                        module: '订单'
                    },
                },
                {
                    path: '/Client',
                    component:() => import('../views/UserAnalysis/Client'),
                    meta: {
                        title: '客户信息',
                        module: '客户'
                    },
                },
                {
                    path: '/userImage',
                    component:() => import('../views/UserAnalysis/userImage'),
                    meta: {
                        title: '客户画像',
                        module: '客户'
                    },
                },
                {
                    path: '/Analysis',
                    component:() => import('../views/UserAnalysis/Analysis'),
                    meta: {
                        title: '数据分析',
                        module: '客户'
                    },
                },
            ]
        },
        {
            path: '*',
            component:() => import('../views/Error'),
            meta: {
                title: '404',
                module: '错误'
            },
        },
    ]
})

router.beforeEach((to, from, next) => {
    let loadingBar = document.getElementById('global-loading')
    if(!loadingBar){
        loadingBar = document.createElement('div')
        loadingBar.id = 'global-loading'
        document.body.append(loadingBar)
    }else {
        loadingBar.style.display = 'block'
    }
    document.title = '林家铺子 - ' + to.meta.title

    if (to.path === "/Login" || to.path === "/SignUp") return next()
    const tokenStr = window.sessionStorage.getItem('token')
    // console.log(tokenStr)
    if (!tokenStr) return next('/Login')
    // 设定页面的跳转间隔
    setTimeout(()=>{
        next()
    }, 800)

})

router.afterEach((to,from)=> {
    let loadingBar = document.getElementById('global-loading')
    if(loadingBar) {
        loadingBar.style.display = 'none'
    }
})
export default router
