import Vue from 'vue'
import router from './router'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '../../util/http';
// require('../../util/mock');
require("../../assets/icon/iconfont.css");
Vue.use(ElementUI);
Vue.use(http);
router.beforeEach((to,from,next)=>{
  console.log(to,from);
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
