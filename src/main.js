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
import Qs from 'qs'

//配全局属性配置，在任意组件内可以使用this.$Qs获取qs对象

Vue.prototype.$Qs = Qs

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

var url = 'http://localhost:8080';
export default url;