import { createRouter, createWebHistory } from 'vue-router';
import Products from '../components/Products.vue';
import Overview from '../components/Overview.vue';
import CartDetails from '../components/CartDetails.vue';
import Carts from '../components/Carts.vue';
import Login from '../components/Login.vue';

const routes = [
  { path: '/', component: Overview },
  { path: '/products', component: Products },
  { path: '/cart/:id', component: CartDetails },
  { path: '/carts', component: Carts },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
