import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/components/user-list'
import Editor from '@/components/editor'
import NotFound from '@/components/404'
import AdminHome from '@/components/admin-home'
import Login from '@/components/login'
Vue.use(Router)

export default new Router({
  routes: [{
    path: "*",
    redirect: "/404"
  }, {
    path: '/',
    component: AdminHome,
    children: [{
      path: '/userList',
      component: UserList
    }, {
      path: '/editor',
      component: Editor
    }, {
      path: '/404',
      component: NotFound
    }]
  }, {
    path: '/login',
    component: Login
  }]
})
