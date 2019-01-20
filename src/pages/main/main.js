import Vue from 'vue'
import Main from './main.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '../../util/http';
require('../../util/mock');
Vue.use(ElementUI);
Vue.use(http);

new Vue({
  el: '#app',
  router,
  components: { Main },
  template: '<Main/>'
})
