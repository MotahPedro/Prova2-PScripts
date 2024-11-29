<template>
  <div class="container">
    <h1 class="my-4">Users</h1>
    <ul class="list-group mb-4">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="user in users" :key="user.id">
        {{ user.name }}
        <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
    <form @submit.prevent="addUser" class="d-flex">
      <input v-model="newUser.name" class="form-control me-2" placeholder="Name" />
      <button type="submit" class="btn btn-primary">Add User</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Users',
  data() {
    return {
      newUser: {
        name: '',
      },
    };
  },
  computed: {
    ...mapGetters(['allUsers']),
  },
  methods: {
    ...mapActions(['fetchUsers', 'addUser', 'deleteUser']),
    async addUser() {
      try {
        await this.addUser(this.newUser);
        this.newUser.name = '';
      } catch (error) {
        alert(error.message);
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>
