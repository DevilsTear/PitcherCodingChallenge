import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue';
import VueCompositionAPI from "@vue/composition-api";
import vuetify from "./plugins/vuetify";
import '@mdi/font/css/materialdesignicons.css';

import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueCompositionAPI);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', redirect: '/searchMovies' },
    { path: '/searchNovies', component: SearchResults },
    { path: '/movieDetails/:movieId', component: MovieDetails, props: true },
    { path: '/:catchAll(.*)', component: SearchResults }
  ]
});

new Vue({
  VueCompositionAPI,
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
