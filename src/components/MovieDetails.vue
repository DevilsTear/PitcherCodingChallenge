<template>
  <v-card :loading="isLoading" class="mx-auto my-12" min-height="450">
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
      style="float: left; margin-right: 20px;"
    ></v-img>
    <v-img
      :src="movieDetail.Poster"
      height="450px"
      style="float: left; margin-right: 20px;"
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
      <v-btn outlined rounded text @click="$emit('hide-details')">
        Back
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "MovideDetails",
  emits: ["hide-details"],

  data: () => ({
    movieDetail: {},
    isLoading: false,
  }),
  props: {
    movieId: {
      type: String,
      required: true,
    },
  },
  computed: {
    rating(){
      return parseFloat(this.movieDetail.imdbRating)
    }
  },

  watch: {
    movieId: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(val) {
        if (!val) {
          return;
        }

        // Movie have already been requested
        if (this.isLoading) return;

        this.isLoading = true;

        // Lazily load input items
        fetch("https://www.omdbapi.com/?apikey=5300d89d&i=" + val)
          .then((res) => res.json())
          .then((res) => {
            this.movieDetail = res;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      },
    },
  },
};
</script>
