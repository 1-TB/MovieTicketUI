<template>
  <div class="cart-popup bg-gray-900 border p-4 shadow-lg text-white">
    <div v-if="cart.length === 0">
      <h2 class="text-2xl font-semibold mb-4 text-center">
        Your Cart is empty!
      </h2>
      <h3 class="text-2xl font-semibold mb-4 text-center">
        You can get started by clicking add ticket on any movie
      </h3>
    </div>
    <div v-else>
      <h2 class="text-2xl font-semibold mb-4 text-center">Your Cart</h2>
      <table class="w-full text-left text-white">
        <thead>
          <!-- Table titles -->
          <tr>
            <th>Movie</th>
            <th class="text-center">Ticket Type</th>
            <th class="text-center">Quantity</th>
            <th class="text-center">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- Table data -->
          <tr v-for="(item, index) in cart" :key="index">
            <td>{{ item.movie.title }}</td>
            <td class="text-center">{{ item.ticketType }}</td>
            <td class="text-center">{{ item.quantity }}</td>
            <td class="text-center">
              {{
                formatMoney(
                  (item.ticketType === "child" ? 5 : 10) * item.quantity,
                )
              }}
            </td>
            <td>
              <button
                class="bg-red-500 text-white px-2 py-1 rounded focus:outline-none hover:bg-red-600"
                @click="removeFromCart(index)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr class="my-4 border-white" />
      <!-- Total Prices -->
      <p class="text-gray-400 text-center text-xl">
        Cost of Child Tickets: {{ formatMoney(totalChildrenCost) }}
      </p>
      <p class="text-gray-400 text-center text-xl">
        Cost of Adult Tickets: {{ formatMoney(totalAdultCost) }}
      </p>
      <p class="text-gray-400 text-center text-xl">
        Total Price: {{ formatMoney(totalPrice) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //only thing we need is the cart
    cart: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["remove-from-cart"],
  computed: {
    //always calculates totals
    totalPrice() {
      let total = 0;
      this.cart.forEach((item) => {
        //if its a child ticket then its $5, otherwise its $10
        total += (item.ticketType === "child" ? 5 : 10) * item.quantity;
      });
      return total;
    },
    totalChildrenCost() {
      let total = 0;
      this.cart.forEach((item) => {
        if (item.ticketType === "child") {
          total += 5 * item.quantity;
        }
      });
      return total;
    },
    totalAdultCost() {
      let total = 0;
      this.cart.forEach((item) => {
        if (item.ticketType === "adult") {
          total += 10 * item.quantity;
        }
      });
      return total;
    },
  },
  methods: {
    //remove is handled in app.vue
    removeFromCart(index) {
      this.$emit("remove-from-cart", index);
    },
    //format money to USD currency
    formatMoney(amount) {
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
};
</script>
