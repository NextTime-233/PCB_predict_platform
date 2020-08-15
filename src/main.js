import Vue from 'vue'
import App from './App.vue'

import router from './router/index'

import './plugins/axios'
import './plugins/Antd'
import './plugins/element'
import './theme/global.css'

import store from './store'

import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
// import qs from 'qs'

//配全局属性配置，在任意组件内可以使用this.$qs获取qs对象

// Vue.prototype.$qs = qs

Vue.use(BaiduMap, {
  ak: '5ieMMexWmzB9jivTq6oCRX9j'
})

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
