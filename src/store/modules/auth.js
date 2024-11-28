import authService from '../../services/authService';
import { validateLogin } from '../../utils/validation';

const state = {
  token: localStorage.getItem('token') || '',
  status: '',
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
};

const actions = {
  async login({ commit }, user) {
    const error = validateLogin(user);
    if (error) {
      throw new Error(error);
    }
    const response = await authService.login(user);
    const token = response.data.token;
    localStorage.setItem('token', token);
    commit('authSuccess', token);
  },
  logout({ commit }) {
    localStorage.removeItem('token');
    commit('authLogout');
  },
};

const mutations = {
  authSuccess: (state, token) => {
    state.status = 'success';
    state.token = token;
  },
  authLogout: (state) => {
    state.status = '';
    state.token = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};