import Vue from "vue";
import App from "./App.vue";
import VueCompositionAPI from "@vue/composition-api";
import vuetify from "./plugins/vuetify";
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false;

new Vue({
  VueCompositionAPI,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
