
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.css'


Vue.use(ElementUI);
Vue.prototype.$bus=new Vue()
Vue.config.productionTip = false;
// Vue.use(Vuetify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

