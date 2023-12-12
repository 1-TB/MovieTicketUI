<script>
export default {
  props: {
    cart: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["toggle-cart-popup"],
  data() {
    return {};
  },
  computed: {
    cartCount() {
      //we need to loop through the cart and add up the quantity
      let total = 0;
      this.cart.forEach((item) => {
        total += item.quantity;
      });
      return total;
    },
  },
  methods: {
    toggleCartPopup() {
      this.$emit("toggle-cart-popup");
    },
  },
};
</script>
<template>
  <header
    class="flex items-center justify-between px-4 py-4 bg-gray-800 shadow"
  >
    <img
      src="../assets/logo.svg"
      alt="Alamo Drafthouse Cinema Logo"
      width="120"
      height="40"
      style="aspect-ratio: 120 / 40; object-fit: cover"
    />

    <nav>
      <ul class="flex space-x-4">
        <li>
          <a href="#">
            <a class="text-white hover:text-blue-500" href="/"> Home </a>
          </a>
        </li>
      </ul>
    </nav>
    <div class="relative">
      <a
        href="#"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        @click="toggleCartPopup"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6 text-white"
        >
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path
            d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
          ></path>
        </svg>
        <span
          class="ml-2 text-white bg-red-500 rounded-full h-6 w-6 flex items-center justify-center"
          >{{ cartCount }}</span
        >
      </a>
    </div>
  </header>
</template>
