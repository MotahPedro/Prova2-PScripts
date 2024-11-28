import userService from '../../services/userService';
import { validateUser } from '../../utils/validation';
import { handleError } from '../../utils/errorHandler';

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
    const response = await userService.getUsers();
    commit('setUsers', response.data);
  },
  async fetchUser({ commit }, id) {
    const response = await userService.getUser(id);
    commit('setUser', response.data);
  },
  async addUser({ commit }, user) {
    try {
      validateUser(user);
      const response = await userService.addUser(user);
      commit('newUser', response.data);
    } catch (error) {
      handleError(error);
    }
  },
  async updateUser({ commit }, user) {
    try {
      validateUser(user);
      const response = await userService.updateUser(user);
      commit('updateUser', response.data);
    } catch (error) {
      handleError(error);
    }
  },
  async deleteUser({ commit }, id) {
    await userService.deleteUser(id);
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
