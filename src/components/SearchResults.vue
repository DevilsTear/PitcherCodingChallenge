<template>
  <div>
    <loader v-if="loading">
      <template #default>
        Loading search results...
      </template>
    </loader>
    <v-container>
      <v-row v-if="!movieId">
        <v-col v-for="movie in movies" :key="movie.imdbID" cols="3">
          <SearchResultsItem :movie="movie" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <MovieDetails @hide-details="hideDetails" :movieId="movieId" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SearchResultsItem from "./SearchResultItem.vue";
import MovieDetails from "./MovieDetails.vue";
import Loader from "./Loader.vue";

export default {
  name: "SearchResults",
  components: {
    SearchResultsItem,
    MovieDetails,
    Loader,
  },

  data: () => ({
    movieId: null,
  }),

  props: {
    loading: null,
    movies: [],
  },

  provide() {
    return {
      showMovieDetails: this.showMovieDetails,
    };
  },

  methods: {
    showMovieDetails(imdbID) {
      this.movieId = imdbID;
      // console.log("showMovieDetails=>movieId: " + this.movieId);
    },
    hideDetails() {
      this.movieId = null;
      // console.log("hideDetails=>movieId: " + this.movieId);
    },
  },
};
</script>
