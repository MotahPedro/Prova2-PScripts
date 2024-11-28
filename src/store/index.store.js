import { createStore } from 'vuex';
import products from './modules/products';
import carts from './modules/carts';
import users from './modules/users';

const store = createStore({
  modules: {
    products,
    carts,
    users,
  },
});

export default store;
