import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import ListView from '@/components/list-view'

Vue.use(Router)

export default new Router({
  routes: [{
     path:'/',
     name:'ListView',
     component:ListView
  }]
})
