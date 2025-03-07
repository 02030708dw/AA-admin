import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

//v-has 按钮权限控制
import hasPermissionbtn from '@/utils/hasPermissionbtn'
Vue.use(hasPermissionbtn)

// 全局方法
import GlobalMethods from '@/utils/globalMethods';
Vue.use(GlobalMethods);

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  i18n
})
