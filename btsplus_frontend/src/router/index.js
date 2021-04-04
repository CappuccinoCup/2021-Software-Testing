import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Start from '../views/Start.vue'
import Hanako from "../views/Hanako"
import Madoka from "../views/Madoka";

import Login from "../views/Login"
import Home from "../views/Home"

import CustomerWelcome from "../components/customer/Welcome"
import MyProds from "../components/customer/MyProds"
import BuyProds from "../components/customer/BuyProds"

import TellerWelcome from "../components/teller/Welcome"
import DayEnd from "../components/teller/DayEnd"

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
    path: '/login', name: 'Login',
    component: Login
  },

  {
    path: '/customer',
    component: Home,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '', name: 'CustomerWelcome',
        component: CustomerWelcome
      },
      {
        path: 'myprods', name: 'MyProds',
        component: MyProds
      },
      {
        path: 'buyprods', name: 'BuyProds',
        component: BuyProds
      }
    ],
    beforeEnter: (to, from, next) => {
      if (store.state.userDetails.authority === 'TELLER') {
        next({path: '/teller'});
      } else {
        next();
      }
    }
  },
  {
    path: '/teller',
    component: Home,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '', name: 'TellerWelcome',
        component: TellerWelcome
      },
      {
        path: 'dayend', name: 'DayEnd',
        component: DayEnd
      }
    ],
    beforeEnter: (to, from, next) => {
      if (store.state.userDetails.authority === 'CUSTOMER') {
        next({path: '/customer'});
      } else {
        next();
      }
    }
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

// 前端登录拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
