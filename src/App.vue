<script setup>
import TopRatedMovies from "./components/TopRatedMovies.vue";
import NavBar from "./components/NavBar.vue";
import CartList from "./components/CartList.vue";
import { ref } from "vue";
//the cart ref
const cart = ref([]);
//function to add movies to our cart
const handleAddToCart = (ticketType, movie) => {
  console.log(`Added 1 ${ticketType} for ${movie.title}`);
  if (
    //checks if its already in the cart
    cart.value.some(
      (item) => item.movie.id === movie.id && item.ticketType === ticketType,
    )
  ) {
    //if it is then change the quantity
    cart.value = cart.value.map((item) => {
      if (item.movie.id === movie.id && item.ticketType === ticketType) {
        item.quantity++;
      }
      return item;
    });
    return;
  }
  //if its not in the cart then add it
  cart.value.push({ movie: movie, ticketType: ticketType, quantity: 1 });
};
//function to remove movies from our cart
const removeFromCart = (index) => {
  console.log(
    `Removing 1 ${cart.value[index].ticketType} for ${cart.value[index].movie.title}`,
  );
  //if the quantity is greater than 1 then just decrement the quantity
  cart.value[index].quantity--;
  if (cart.value[index].quantity === 0) {
    cart.value.splice(index, 1);
  }
};
//function to toggle the cart popup
const toggleCartPopup = () => {
  console.log("Toggling cart popup");
  showCart.value = !showCart.value;
};
let showCart = ref(false);
</script>

<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <NavBar :cart="cart" @toggle-cart-popup="toggleCartPopup" />
    <div v-if="showCart">
      <CartList :cart="cart" @remove-from-cart="removeFromCart" />
    </div>

    <TopRatedMovies @add-to-cart="handleAddToCart" />
  </div>
</template>
