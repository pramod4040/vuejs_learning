import Vue from 'vue';
// import Vuetify from 'vuetify';
import { BootstrapVue } from 'bootstrap-vue';

import axios from 'axios';
import VueAxios from 'vue-axios'

import App from './App.vue';
import router from './router';
import store from './store';

import ApiService from '@/common/api.service.js';

import * as VueGoogleMaps from 'vue2-google-maps'

// import 'vuetify/dist/vuetify.min.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(Vuetify);
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD5DJAylrEqN9O46vNFHSzhRyHiiULc8tU',
    libraries: 'places'
  },
  autobindAllEvents: true
})

ApiService.init();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
