<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <img class="w-full h-64 object-cover" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title">
    <div class="px-6 py-4">
      <div class="flex justify-between items-center mb-2">
        <div class="font-bold text-xl">{{ movie.title }}</div>
        <div class="text-gray-600">{{ movie.release_date }}</div>
      </div>
      <p class="text-gray-700 text-base">{{ movie.overview }}</p>
    </div>
    <div class="px-6 py-2">
      <div class="flex justify-between items-center mb-2">
        <div class="text-sm font-semibold text-gray-700">Rating: {{ movie.vote_average }}</div>
        <div>
          <button @click="addToCart('child')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Add Child</button>
          <button @click="addToCart('adult')" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2">Add Adult</button>
        </div>
      </div>
      <div>
        <span v-for="genre in movie.genre_ids" :key="genre" class="inline-block bg-gray-200 rounded-full px-3 py-1 m-1 text-sm font-semibold text-gray-700 mr-2">{{ genreIdToName(genre) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart(ticketType) {
      //console.log(`Added ${ticketType} ticket to cart for movie: ${this.movie.title} (${this.movie.id})`);
      this.$emit('add-to-cart', ticketType, this.movie);
    },
    genreIdToName(genreId) {
      // this is a map of genre ids to genre names
      // https://www.themoviedb.org/talk/5daf6eb0ae36680011d7e6ee
      const genreMap = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western',
      };

      return genreMap[genreId] || 'Unknown Genre';
    }
  }
}
</script>

