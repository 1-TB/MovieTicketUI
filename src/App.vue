<script setup>
import TopRatedMovies from "./components/TopRatedMovies.vue";
import NavBar from "./components/NavBar.vue";
import CartList from "./components/CartList.vue";
import { ref } from "vue";

const cart = ref([]);

const handleAddToCart = (ticketType, movie) => {
  console.log(`Added 1 ${ticketType} for ${movie.title}`);
  if (
    cart.value.some(
      (item) => item.movie.id === movie.id && item.ticketType === ticketType,
    )
  ) {
    cart.value = cart.value.map((item) => {
      if (item.movie.id === movie.id && item.ticketType === ticketType) {
        item.quantity++;
      }
      return item;
    });
    return;
  }
  cart.value.push({ movie: movie, ticketType: ticketType, quantity: 1 });
};
const removeFromCart = (index) => {
  console.log(
    `Removing 1 ${cart.value[index].ticketType} for ${cart.value[index].movie.title}`,
  );
  cart.value[index].quantity--;
  if (cart.value[index].quantity === 0) {
    cart.value.splice(index, 1);
  }
};
const toggleCartPopup = () => {
  console.log("Toggling cart popup");
  showCart.value = !showCart.value;
};
let showCart = ref(false);
</script>

<template>
  <div>
    <NavBar :cart="cart" @toggle-cart-popup="toggleCartPopup" />
    <div v-if="showCart">
      <CartList :cart="cart" @remove-from-cart="removeFromCart" />
    </div>

    <TopRatedMovies @add-to-cart="handleAddToCart" />
  </div>
</template>
