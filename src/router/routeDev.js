
/**
 * 这里配置开发环境写死的路由和菜单，方便开发
 * 这里是左侧菜单后两个选择
 */

//静态路由，标签文字
var routeDevList = [
    {
        path: '/routedev',
        component: resolve => require(['../components/test/RouteDev'], resolve),
        meta: {
            title: '结果'
        }
    },
    {
        path: '/toimg',
        component: resolve => require(['../components/topdf/topdf.vue'], resolve),
        meta:{
            title:'详情页'
        }
    },
    //暂时不明使用
    {
        path: '/test',
        component: resolve => require(['../components/topdf/test.vue'], resolve),
        meta:{
            title:'测试flex'
        }
    },

];
//静态菜单
var menuDevList = [
    {
        icon: 'el-icon-date',
        index: Math.random() + '',
        title: '结果',
        subs: [
            {
              index: 'routedev',  //暂时不确定如何修改
              title: '计划实施'
            },
            {
              index: 'routedev',
              title: '决策制定'
            },
        ]
    },
    {
        icon: 'el-icon-date',
        index: Math.random() + '',
        title: '详情页',
        subs: [
            {
                index: 'toimg',
                title: '商品'
            },
            {
                index: 'toimg',
                title: '门店'
            },
        ]
    }
]


var routeDev = {
    ROUTE_DEV: true,  //是否写入静态路由（开关），控制是否成功跳转
    routeDevList: routeDevList,
    MENU_DEV: true,  //是否写入静态菜单（开关），可以控制是否显示菜单
    menuDevList: menuDevList,
}
export default routeDev;
