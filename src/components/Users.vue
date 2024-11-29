<template>
  <div class="container">
    <h1 class="my-4">Usuários</h1>
    <ul class="list-group mb-4">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="user in allUsers" :key="user.id">
        {{ user.name.firstname }} {{ user.name.lastname }}
        <div>
          <button class="btn btn-info btn-sm me-2" @click="viewUser(user.id)">Visualizar</button>
          <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Excluir</button>
        </div>
      </li>
    </ul>
    <form @submit.prevent="addUser" class="d-flex">
      <input v-model="newUser.firstname" class="form-control me-2" placeholder="Nome" />
      <input v-model="newUser.lastname" class="form-control me-2" placeholder="Sobrenome" />
      <button type="submit" class="btn btn-primary">Adicionar Usuário</button>
    </form>
    <div v-if="selectedUser" class="mt-4">
      <h2>Detalhes do Usuário</h2>
      <p><strong>Nome:</strong> {{ selectedUser.name.firstname }} {{ selectedUser.name.lastname }}</p>
      <p><strong>Email:</strong> {{ selectedUser.email }}</p>
      <p><strong>Telefone:</strong> {{ selectedUser.phone }}</p>
      <p><strong>Cidade:</strong> {{ selectedUser.address.city }}</p>
      <p><strong>Endereço:</strong> {{ selectedUser.address.street }}, {{ selectedUser.address.number }}</p>
      <p><strong>CEP:</strong> {{ selectedUser.address.zipcode }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Users',
  data() {
    return {
      newUser: {
        firstname: '',
        lastname: '',
      },
      selectedUser: null,
    };
  },
  computed: {
    ...mapGetters(['allUsers']),
  },
  methods: {
    ...mapActions(['fetchUsers', 'addUser', 'deleteUser', 'fetchUser']),
    async addUser() {
      try {
        await this.addUser(this.newUser);
        this.newUser.firstname = '';
        this.newUser.lastname = '';
      } catch (error) {
        alert(error.message);
      }
    },
    async viewUser(id) {
      try {
        const response = await this.fetchUser(id);
        this.selectedUser = response.data;
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
