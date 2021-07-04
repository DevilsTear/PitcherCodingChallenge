<template>
  <v-card class="mx-auto" max-width="344">
    <v-img contain src="@/assets/images/no-image.jpg" height="200px" v-if="movie.Poster == 'N/A'"></v-img>
    <v-img :src="movie.Poster" height="200px" v-else></v-img>

    <v-card-title>
      {{ movie.Title }}
    </v-card-title>

    <v-card-subtitle>
      {{ movie.Type }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" text  @click="showMovieDetails(movie.imdbID)">
        Movie Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SearchResultsItem",
  // emits: ["show-details"],
  inject: ["showMovieDetails"],
  props: {
    movie: {},
  },

  data: () => ({
    
  }),
};
</script>
