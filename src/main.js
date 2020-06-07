import Vue from 'vue'
import App from './App.vue'
import router from './router'; // 路由
import store from './store/index'; // 状态管理
import "./assets/reset.css";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
