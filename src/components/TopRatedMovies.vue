<script>
import MovieCard from "./MovieCard.vue";
import axios from "axios";

export default {
  components: {
    MovieCard,
  },
  emits: ["add-to-cart"],
  data() {
    return {
      movies: [],
    };
  },
  computed: {},
  mounted() {
    //this is the magic api call to get the top rated movies
    //the api key is stored in the .env file
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=1`,
      )
      .then((response) => {
        console.log(response.data.results);
        this.movies = response.data.results;
      });
  },
  methods: {
    handleAddToCart(ticketType, movie) {
      this.$emit("add-to-cart", ticketType, movie);
    },
  },
};
</script>

<template>
  <main class="container mx-auto my-8 bg-gray-900 p-6">
    <h1 class="text-4xl font-bold mb-6 text-center text-white">
      Top Rated Movies
    </h1>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
    >
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </main>
</template>
