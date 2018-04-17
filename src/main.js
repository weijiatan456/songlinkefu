import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import 'assets/base.css'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})