import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Q1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indx',
      component: index
    }
  ]
})
