<template>
  <div class="container">
    <h1 class="my-4">Carts</h1>
    <div class="row mb-4">
      <div class="col-md-4">
        <input type="date" v-model="filter.date" class="form-control" placeholder="Filter by Date">
      </div>
      <div class="col-md-4">
        <input type="number" v-model="filter.userId" class="form-control" placeholder="Filter by User ID">
      </div>
      <div class="col-md-4">
        <button @click="applyFilter" class="btn btn-primary">Apply Filter</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <ul class="list-group">
          <li v-for="cart in filteredCarts" :key="cart.id" class="list-group-item">
            <router-link :to="'/cart/' + cart.id">Cart ID: {{ cart.id }} - User ID: {{ cart.userId }} - Date: {{ cart.date }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Carts',
  data() {
    return {
      filter: {
        date: '',
        userId: ''
      }
    };
  },
  computed: {
    ...mapGetters(['filteredCarts'])
  },
  methods: {
    ...mapActions(['fetchCarts']),
    applyFilter() {
      this.fetchCarts();
    }
  },
  created() {
    this.fetchCarts();
  }
};
</script>
