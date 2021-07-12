
import VueRouter from 'vue-router';

import SearchResults from "../pages/SearchResults";
import MovieDetails from "../pages/MovieDetails";

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

  export default router;