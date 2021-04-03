import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Start from '../views/Start.vue'
import Hanako from "../views/Hanako"
import Madoka from "../views/Madoka";

import Login from "../views/Login"
import Home from "../views/user/Home"
import HomeDefault from "../components/HomeDefault"
import MyProds from "../components/user/MyProds"
import BuyProds from "../components/user/BuyProds"

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
    path: '/home',
    component: Home,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '', name: 'HomeDefault',
        component: HomeDefault
      },
      {
        path: 'myprods', name: 'MyProds',
        component: MyProds
      },
      {
        path: 'buyprods', name: 'BuyProds',
        component: BuyProds
      }
    ]
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
      next();
      // 为了前端方便测试样式，先让拦截器失效
      // next({
      //   path: '/login',
      //   query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      // });
    }
  } else {
    next();
  }
});

export default router;
