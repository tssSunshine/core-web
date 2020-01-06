import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import './permission' // permission control
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error logno
import axios from 'axios'

import * as filters from './filters' // global filters

axios.defaults.withCredentials = true

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(echarts)
Vue.use(axios)

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
