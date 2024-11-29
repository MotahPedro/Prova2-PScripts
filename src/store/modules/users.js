import axios from 'axios';
import { validateUser } from '../../utils/validation';
import { handleError } from '../../utils/errorHandler';

const API_URL = 'https://fakestoreapi.com/users';

const state = {
  users: [],
  user: null,
};

const getters = {
  allUsers: (state) => state.users,
  user: (state) => state.user,
};

const actions = {
  async fetchUsers({ commit }) {
    const response = await axios.get(API_URL);
    commit('setUsers', response.data);
  },
  async fetchUser({ commit }, id) {
    const response = await axios.get(`${API_URL}/${id}`);
    commit('setUser', response.data);
    return response; // Adicione esta linha para retornar os dados do usuário
  },
  async addUser({ commit }, user) {
    try {
      validateUser(user);
      const response = await axios.post(API_URL, user);
      commit('newUser', response.data);
    } catch (error) {
      handleError(error);
    }
  },
  async updateUser({ commit }, user) {
    try {
      validateUser(user);
      const response = await axios.put(`${API_URL}/${user.id}`, user);
      commit('updateUser', response.data);
    } catch (error) {
      handleError(error);
    }
  },
  async deleteUser({ commit }, id) {
    await axios.delete(`${API_URL}/${id}`);
    commit('removeUser', id);
  },
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  setUser: (state, user) => (state.user = user),
  newUser: (state, user) => state.users.push(user),
  updateUser: (state, updatedUser) => {
    const index = state.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  removeUser: (state, id) => {
    state.users = state.users.filter(user => user.id !== id);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
