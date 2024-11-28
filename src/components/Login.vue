<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="user.username" placeholder="Username" />
      <input v-model="user.password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(['login']),
  },
};
</script>
