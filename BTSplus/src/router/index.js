import Vue from 'vue'
import VueRouter from 'vue-router'

import Start from '../views/Start.vue'
import Hanako from "../views/Hanako"
import Madoka from "../views/Madoka";

import Error from "../views/Error";

Vue.use(VueRouter);

const routes = [
  {
    path: '/', name: 'Start',
    component: Start
  },
  {
    path: '/hanako', name: 'Hanako',
    component: Hanako
  },
  {
    path: '/madoka', name: 'Madoka',
    component: Madoka
  },
  {
    path: '/error/:id', name: 'Error',
    component: Error
  },
  {
    path: '*', name: 'NotFound',
    component: Error
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
