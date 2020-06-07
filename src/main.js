import Vue from 'vue'
import App from './App.vue'
import router from './router'; // 路由导航
import axios from './http'; // 获取数据
import "./assets/reset.css";


Vue.config.productionTip = false
Vue.prototype.$axios = axios; // 方便每个组件都可以使用axios

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

