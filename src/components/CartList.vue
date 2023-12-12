<template>
    <div class="cart-popup bg-white border p-4 shadow-lg">
      <h2 class="text-2xl font-semibold mb-4 text-center">Your Cart</h2>
      <table class="w-full">
        <thead>
          <tr>
            <th class="text-left">Movie</th>
            <th class="text-center">Ticket Type</th>
            <th class="text-center">Quantity</th>
            <th class="text-center">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index">
            <td>{{ item.movie.title }}</td>
            <td class="text-center">{{ item.ticketType }}</td>
            <td class="text-center">{{item.quantity }}</td>
            <td class="text-center">{{ formatMoney((item.ticketType === 'child' ? 5 : 10) * item.quantity) }}</td>
            <td>
              <button
                @click="removeFromCart(index)"
                class="bg-red-500 text-white px-2 py-1 rounded focus:outline-none hover:bg-red-600"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr class="my-4">
      <p class="text-gray-700 text-center text-xl">Total Price: {{ formatMoney(totalPrice) }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cart: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.cart.forEach((item) => {
          total += (item.ticketType === 'child' ? 5 : 10) * item.quantity;
        });
        return total;
      },
    },
    methods: {
      removeFromCart(index) {
        this.$emit('remove-from-cart', index);
      },
        formatMoney(amount) {
            return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            });
        },
    },
  };
  </script>
  