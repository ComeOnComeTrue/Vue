import Vue from 'vue'
import App from './App.vue'

// 开发环境要不要提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
