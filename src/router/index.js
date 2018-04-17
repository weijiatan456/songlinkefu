import Vue from 'vue'
import Router from 'vue-router'
import Home from 'page/home/index'
import List from 'page/list/index'
import Order from 'page/order/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/list',
      component: List,
    },
    {
      path: '/order',
      component: Order
    }
  ]
})