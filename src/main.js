// The Vue build version to load with the `import` command
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/mui.css'
import './assets/css/icons-extra.css'
import './assets/css/public.css'
import Echarts from 'echarts'
import plus from 'vue-h5-plus'
Vue.prototype.$store = store

import axios from 'axios'
import Vuex from 'vuex'
var newAxios = axios.create({
    //baseURL: 'https://api.example.com',
		timeout:20000
});

Vue.config.productionTip = false
Vue.prototype.$axios = newAxios;
Vue.use(Vuex)
Vue.prototype.echarts = Echarts
Vue.use(Echarts)
Vue.use(plus)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
