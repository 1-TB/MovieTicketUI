<template>
  <div
    class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white"
  >
    <img
      class="w-full h-64 object-cover"
      :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      :alt="movie.title"
    />
    <div class="px-6 py-4">
      <div class="flex justify-between items-center mb-2">
        <div class="font-bold text-xl">{{ movie.title }}</div>
        <div class="text-gray-600">{{ movie.release_date }}</div>
      </div>
      <p class="text-gray-400 text-base">{{ movie.overview }}</p>
    </div>
    <div class="px-6 py-2">
      <div class="flex justify-between items-center mb-2">
        <div class="text-sm font-semibold text-gray-400">
          <!-- add ticket buttons -->
          Rating: {{ movie.vote_average }}
        </div>
        <div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-blue"
            @click="addToCart('child')"
          >
            Add Child
          </button>
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2 focus:outline-none focus:shadow-outline-green"
            @click="addToCart('adult')"
          >
            Add Adult
          </button>
        </div>
      </div>
      <div>
        <!-- genre tags -->
        <span
          v-for="genre in movie.genre_ids"
          :key="genre"
          class="inline-block bg-gray-600 rounded-full px-3 py-1 m-1 text-sm font-semibold"
          >{{ genreIdToName(genre) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  emits: ["add-to-cart"],
  methods: {
    // this is handled by app.vue
    addToCart(ticketType) {
      //console.log(`Added ${ticketType} ticket to cart for movie: ${this.movie.title} (${this.movie.id})`);
      this.$emit("add-to-cart", ticketType, this.movie);
    },
    genreIdToName(genreId) {
      // the api just gives us genre ids but I found this list and put them in a map
      // Not sure if I can make another api call for this
      // this is a map of genre ids to genre names
      // https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee
      const genreMap = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western",
      };

      return genreMap[genreId] || "Unknown Genre";
    },
  },
};
</script>
