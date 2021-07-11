<template>
  <div>
    <v-container>
      <v-row v-if="movies && movies.length > 0">
        <v-col v-for="movie in movies" :key="movie.imdbID" cols="3">
          <SearchResultsItem :movie="movie" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-card :loading="loading" class="mx-auto my-12" min-height="450">
            There is no movies to found!
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import SearchResultsItem from "../components/SearchResultItem.vue";

import { ref, provide, inject, computed } from "@vue/composition-api";
// import { useRouter } from 'vue-router';

export default {
  components: {
    SearchResultsItem,
  },
  setup() {
    const movieId = ref(null);
    const loadedMovies = inject('movies');
    const isLoading = inject('isLoading');

    const loading = computed(() => isLoading.value);
    const movies = computed(() => loadedMovies.values);

    function showMovieDetails(imdbID) {
      movieId.value = imdbID;
      // console.log("showMovieDetails=>movieId: " + this.movieId);
    }

    function hideDetails() {
      movieId.value = null;
      // console.log("hideDetails=>movieId: " + this.movieId);
    }

    provide("showMovieDetails", showMovieDetails);
    provide("hideDetails", hideDetails);

    return { movieId: movieId.value, movies, loading};
  },
};
</script>

