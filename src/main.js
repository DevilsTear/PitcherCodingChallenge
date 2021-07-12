import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue';
import VueCompositionAPI from "@vue/composition-api";
import vuetify from "./plugins/vuetify";
import '@mdi/font/css/materialdesignicons.css';

import router from "./router/router.js";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueCompositionAPI);



new Vue({
  VueCompositionAPI,
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
