import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/components/user-list'
import Editor from '@/components/editor'
import NotFound from '@/components/404'
import AdminHome from '@/components/admin-home'
import Login from '@/components/login'
import Index from '@/components/index'
import Home from '@/components/home'
import ListView from '@/components/list-view'
import MenuList from '@/components/menu-list'
import GroupList from '@/components/group-list'
import RoleList from '@/components/role-list'
Vue.use(Router)

export default new Router({
  routes: [{
    path: "*",
    redirect: "/404"
  }, {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [{
        path: '/home',
        component: Home
      },
      {
        path: '/list',
        name: 'ListView',
        component: ListView
      }
    ]
  }, {
    path: '/admin',
    component: AdminHome,
    children: [{
      path: '/userList',
      component: UserList
    },{
      path: '/menu',
      component: MenuList
    }, {
      path: '/editor',
      component: Editor
    }, {
      path: '/404',
      component: NotFound
    },{
      path: '/group',
      component: GroupList
    },{
      path: '/role',
      component: RoleList
    }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/404',
    component: NotFound
  }]
})
