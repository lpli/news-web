import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './util/http';
require('./util/mock');
Vue.use(ElementUI);
Vue.use(http);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
