<template>
  <v-app id="inspire">
    <v-app-bar app :height="120">
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-img
              lazy-src="./assets/images/company/movie_list_logo.png"
              max-height="50"
              max-width="100"
              src="./assets/images/company/movie_list_logo.png"
            ></v-img>
            <h2>Movie Listing</h2>
          </v-col>
          <v-col cols="9">
            <v-autocomplete
              :items="movieItems"
              :loading="isLoading.value"
              :search-input.sync="movieName"
              color="black"
              hide-no-data
              hide-selected
              item-text="Title"
              item-value="imdbID"
              label="Seach Movie"
              placeholder="Start typing to Search Movie"
              prepend-icon="mdi-database-search"
              return-object
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <loader v-if="isLoading.value">
        <template #default> Loading search results... </template>
      </loader>
      <router-view v-else-if="!isLoading.value && movies.values.length > 0"></router-view>
      <warning v-else
        ><template #default>
          Use search bar to list movies!..
        </template></warning
      >
    </v-main>
  </v-app>
</template>

<script>
import Loader from "./components/Loader.vue";
import Warning from "./components/Warning.vue";
// import eventBus from "./eventBus";

import {
  ref,
  reactive,
  computed,
  watch,
  provide,
} from "@vue/composition-api";

export default {
  components: {
    Loader,
    Warning,
  },
  setup() {
    const movieName = ref(null);
    const descriptionLimit = 60;
    const movies = reactive([]);
    const isLoading = ref(false);
    const hasData = ref(false);
    const movieCount = ref(0);

    watch(movieName, (val) => {
      searchMovies(val);
    });

    const movieItems = computed(() => {
      if (!hasData.value) return [];
      return movies.values.map((entry) => {
        const Description =
          entry.Title.length > descriptionLimit
            ? entry.Title.slice(0, descriptionLimit) + "..."
            : entry.Title;

        return Object.assign({}, entry, { Description });
      });
    });

    function searchMovies(val) {
      if (!val) {
        return;
      }

      // Items have already been requested
      if (isLoading.value) return;

      isLoading.value = true;
          console.log(`searchMovies.val: ${val}`);

      // Lazily load input items
      fetch("https://www.omdbapi.com/?apikey=5300d89d&y=2020&s=" + val)
        .then((res) => res.json())
        .then((res) => {
          movies.values = [];
          const { totalResults, Search, Response } = res;
          movieCount.value = totalResults;
          if (Search && Search.length > 0) {
            Search.forEach((item) => {
              movies.values.push(item);
            });
          }

          hasData.value = Response === "True";
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          isLoading.value = false;
        });
    }

    provide("movies", movies);
    provide("isLoading", isLoading);

    return { movieName: movieName, movieItems, isLoading, movies };
  },
};
</script>
