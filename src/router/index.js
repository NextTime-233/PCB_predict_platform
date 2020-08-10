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
                    path: '/Analysis',
                    component:() => import('../views/Employee/Analysis'),
                    meta: {
                        title: '数据分析',
                        module: '公司管理'
                    },
                },
                {
                    path: '/employee',
                    component:() => import('../views/Employee/employee'),
                    meta: {
                        title: '员工管理',
                        module: '公司管理'
                    },
                },
                {
                    path: '/purchase',
                    component:() => import('../views/Business/purchase'),
                    meta: {
                        title: '货品档案',
                        module: '货品管理'
                    },
                },
                {
                    path: '/EntireOrder',
                    component:() => import('../views/Business/EntireOrder'),
                    meta: {
                        title: '标签管理',
                        module: '用户管理'
                    },
                },
                {
                    path: '/manage',
                    component:() => import('../views/Business/manage'),
                    meta: {
                        title: '订单管理',
                        module: '订单管理'
                    },
                },
                {
                    path: '/detail',
                    component:() => import('../views/Business/detail'),
                    meta: {
                        title: '订单明细',
                        module: '订单管理'
                    },
                },
                {
                    path: '/Client',
                    component:() => import('../views/UserAnalysis/Client'),
                    meta: {
                        title: '客户档案',
                        module: '用户管理'
                    },
                },
                {
                    path: '/userImage',
                    component:() => import('../views/UserAnalysis/userImage'),
                    meta: {
                        title: '客户画像',
                        module: '用户管理'
                    },
                },

                {
                    path: '/Home',
                    component:() => import('../components/Home'),
                    meta: {
                        title: '个人中心',
                        module: '我的账号'
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
    }, 600)

})

router.afterEach((to,from)=> {
    let loadingBar = document.getElementById('global-loading')
    if(loadingBar) {
        loadingBar.style.display = 'none'
    }
})
export default router
