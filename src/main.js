import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.use(require('vue-moment'));

// Agregamos la URL base de la API local
// axios.defaults.baseURL = 'http://localhost:3000/api'

// URL proporcinanda por heroku
axios.defaults.baseURL = 'https://mevn-eden.herokuapp.com/api'


import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
