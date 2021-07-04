<template>
  <v-app id="inspire">
    <v-app-bar app :height="120">
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-img
              :lazy-src="logo"
              max-height="50"
              max-width="100"
              :src="logo"
            ></v-img>
            <h2>Movie Listing</h2>
          </v-col>
          <v-col cols="9">
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
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
      <SearchResults ref="searchResults" :movies="movies" :loading="isLoading" />
    </v-main>
  </v-app>
</template>

<script>
import logo from "./assets/images/company/movie_list_logo.png";
import SearchResults from "./components/SearchResults.vue";

export default {
  name: "MovieListing",

  data: () => ({
    logo,
    descriptionLimit: 60,
    movies: [],
    isLoading: false,
    model: null,
    search: null,
    hasData: false,
    hideDetails: true,
  }),
  components: {
    SearchResults,
  },

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
    items() {
      if (!this.hasData) return [];
      return this.movies.map((entry) => {
        const Description =
          entry.Title.length > this.descriptionLimit
            ? entry.Title.slice(0, this.descriptionLimit) + "..."
            : entry.Title;

        return Object.assign({}, entry, { Description });
      });
    },
  },

  watch: {
    search(val) {
      if (!val) {
        return;
      } else {
        this.$refs.searchResults.hideDetails();
      }
      // Items have already been loaded
      // if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://www.omdbapi.com/?apikey=5300d89d&y=2020&s=" + val)
        .then((res) => res.json())
        .then((res) => {
          const { totalResults, Search, Response } = res;
          this.count = totalResults;
          this.movies = Search;
          this.hasData = Response === "True";
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
