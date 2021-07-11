<template>
  <v-card v-if="movieDetail" :loading="loading" class="mx-auto my-12" min-height="450">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      contain
      src="@/assets/images/no-image.jpg"
      height="250px"
      v-if="movieDetail.Poster == 'N/A'"
      style="float: left; margin-right: 20px"
    ></v-img>
    <v-img
      :src="movieDetail.Poster"
      height="450px"
      style="float: left; margin-right: 20px"
      v-else
    ></v-img>

    <v-card-title
      >{{ movieDetail.Title }} ({{ movieDetail.Released }}) -
      {{ movieDetail.Country }} - {{ movieDetail.Genre }} -
      {{ movieDetail.Language }} - {{ movieDetail.Runtime }}</v-card-title
    >
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          {{ movieDetail.imdbRating }} ({{ movieDetail.imdbVotes }})
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        <strong>Director:</strong> {{ movieDetail.Director }}
      </div>

      <div class="my-4 text-subtitle-1">
        <strong>Writer(s):</strong>
        {{ movieDetail.Writer }}
      </div>

      <div class="my-4 text-subtitle-1">
        <strong>Actors:</strong> {{ movieDetail.Actors }}
      </div>

      <div>
        {{ movieDetail.Plot }}
      </div>
    </v-card-text>

    <v-card-actions>
      <router-link to="/">Back</router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ref, computed } from "@vue/composition-api";

export default {
  name: "MovideDetails",
  // emits: ["hide-details"],
  props: {
    movieId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isLoading = ref(false);
    const movieDetails = ref(null);

    const movieDetail = computed(() => movieDetails.value);
    const rating = computed(() => parseFloat(movieDetails.value.imdbRating));
    const loading = computed(() => isLoading.value);

    if (props.movieId) loadMovieDetails(props.movieId);

    function loadMovieDetails(movieId) {
      console.log(`movieId: ${movieId}`);
      if (!movieId) {
        return;
      }

      // Movie have already been requested
      if (isLoading.value) return;

      isLoading.value = true;

      // Lazily load input items
      fetch("https://www.omdbapi.com/?apikey=5300d89d&i=" + movieId)
        .then((res) => res.json())
        .then((res) => {
          movieDetails.value = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (isLoading.value = false));
    }

    return {
      rating,
      movieDetail,
      loading,
    };
  },
};
</script>
