import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//webpack lazy load
const demo = r => require.ensure([], () => r(require('../pages/demo')), 'demo')
// UI pages
export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/demo'
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
})
