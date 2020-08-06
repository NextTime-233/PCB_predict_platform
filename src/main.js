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
