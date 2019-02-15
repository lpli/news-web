import Vue from 'vue'
import router from './router'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '../../util/http';
require('../../util/mock');
require("../../assets/icon/iconfont.css");
Vue.use(ElementUI);
Vue.use(http);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
