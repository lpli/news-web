import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/components/user-list'
import NotFound from '@/components/404'
import AdminHome from '@/components/admin-home'
import Login from '@/components/login'
import Index from '@/components/index'
import Home from '@/components/home'
import ListView from '@/components/list-view'
import MenuList from '@/components/menu-list'
import GroupList from '@/components/group-list'
import RoleList from '@/components/role-list'
import OpsList from '@/components/operation-list'
import TinyMCE from '@/components/tinymce-editor'
import Article from '@/components/article'
import ArticleList from '@/components/article-list'
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
      path: '/user',
      component: UserList
    },{
      path: '/menu',
      component: MenuList
    }, {
      path: '/editor',
      component: TinyMCE
    },{
      path: '/article/publish',
      component: Article
    },{
      path: '/article/my',
      component: ArticleList
    },{
      path: '/404',
      component: NotFound
    },{
      path: '/group',
      component: GroupList
    },{
      path: '/role',
      component: RoleList
    },{
      path: '/operation',
      component: OpsList
    }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/404',
    component: NotFound
  }]
})
