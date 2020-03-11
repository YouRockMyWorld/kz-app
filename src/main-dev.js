import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './elementui/element'
import * as api from './api/api'

import 'nprogress/nprogress.css'

Vue.prototype.$httpApi = api
Vue.config.productionTip = false


new Vue({
  router,
  store: store,
  render: h => h(App),
}).$mount('#app')
