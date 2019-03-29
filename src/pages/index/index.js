import Vue from 'vue'
import router from './router'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '../../util/http';
import Vtip from 'vtip'
import 'vtip/lib/index.min.css'
import fullscreen from 'vue-fullscreen'
// 注册指令使用
Vue.use(Vtip.directive)
Vue.use(fullscreen)
Vue.prototype.$tip = Vtip.tip;
// require('../../util/mock');
import "@/assets/icon/iconfont.css";
Vue.use(ElementUI);
Vue.use(http);
router.beforeEach((to,from,next)=>{
  next();
})
String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
