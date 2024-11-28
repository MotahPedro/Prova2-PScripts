<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
    <form @submit.prevent="addUser">
      <input v-model="newUser.name" placeholder="Name" />
      <button type="submit">Add User</button>
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
