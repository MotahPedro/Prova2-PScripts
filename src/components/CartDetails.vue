<template>
  <div class="container">
    <h1 class="my-4">Cart Details</h1>
    <div v-if="cart">
      <p><strong>Cart ID:</strong> {{ cart.id }}</p>
      <p><strong>User ID:</strong> {{ cart.userId }}</p>
      <p><strong>Date:</strong> {{ cart.date }}</p>
      <h3>Items</h3>
      <ul class="list-group">
        <li v-for="item in cart.items" :key="item.id" class="list-group-item">
          Product ID: {{ item.productId }} - Quantity: {{ item.quantity }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CartDetails',
  data() {
    return {
      cartId: this.$route.params.id
    };
  },
  computed: {
    ...mapGetters(['cartDetails'])
  },
  methods: {
    ...mapActions(['fetchCartDetails'])
  },
  created() {
    this.fetchCartDetails(this.cartId);
  }
};
</script>
