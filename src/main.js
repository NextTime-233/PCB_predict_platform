import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import Antd from 'ant-design-vue'
import BaiduMap from 'vue-baidu-map'


Vue.use(BaiduMap, {
  ak: '5ieMMexWmzB9jivTq6oCRX9j'
})

Vue.use(ElementUI);
Vue.use(Antd)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
