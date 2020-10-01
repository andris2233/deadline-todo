import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ClickOutside from './directives/ClickOutside'
import WindowResize from './directives/WindowResize'

Vue.config.productionTip = false
Vue.use(ClickOutside);
Vue.use(WindowResize);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
