import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Start from '../views/Start'
import Hanako from "../views/Hanako"
import Madoka from "../views/Madoka";

import Login from "../views/Login"
import Home from "../views/Home"

import AdminWelcome from "../components/admin/Welcome"
import DayEnd from "../components/admin/DayEnd"

import TellerWelcome from "../components/teller/Welcome"
import QueryProds from "../components/teller/QueryProds"
import BuyProds from "../components/teller/BuyProds"
import QueryTransFlow from "../components/teller/QueryTransFlow"
import AccountQuery from "../components/teller/AccountQuery";
import RepaymentAccounts from "../components/teller/RepaymentAccounts";
import Bill from "../components/teller/Bill";

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
    path: '/admin',
    component: Home,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '', name: 'AdminWelcome',
        component: AdminWelcome
      },
      {
        path: 'dayend', name: 'DayEnd',
        component: DayEnd
      }
    ],
    beforeEnter: (to, from, next) => {
      if (store.state.userDetails.role === 1) {
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
        path: 'querytransflow',
        name: 'QueryTransFlow',
        component: QueryTransFlow
      },
      {
        path: 'accountquery',
        name: 'AccountQuery',
        component: AccountQuery
      },
      {
        path: 'repaymentaccounts',
        name: 'RepaymentAccounts',
        component: RepaymentAccounts
      },
      {
        path: 'bill',
        name: 'Bill',
        component: Bill
      },
      {
        path: 'queryprods', name: 'QueryProds',
        component: QueryProds
      },
      {
        path: 'buyprods', name: 'BuyProds',
        component: BuyProds
      }
    ],
    beforeEnter: (to, from, next) => {
      if (store.state.userDetails.role === 2) {
        next({path: '/admin'});
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
