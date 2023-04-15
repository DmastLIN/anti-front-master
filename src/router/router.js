import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home';
import Projects from '../views/Projects';
import Coverage from '../views/Coverage';
import Usage from '../views/Usage';
import Static from '../views/Static';
import Check from '../views/Check';
import Commit from '../views/Commit';
import Details from '../views/Details';
//import Login from '../views/Login';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  // },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
  },
  {
    path: '/coverage',
    name: 'coverage',
    component: Coverage,
  },
  {
    path: '/usage',
    name: 'usage',
    component: Usage,
  },
  {
    path: '/commit-cov',
    name: 'commit-coverage',
    component: Commit,
  },
  {
    path: '/check',
    name: 'check',
    //component: () => import("../views/Recommend/index.vue"),
    component: Check,
    //redirect: '/check/statistics',
    // children:[{
    //   path: 'statistics',
    //   //component: () => import("../views/Recommend/index.vue"),
    //   component: Statistics,
    // }
    // ]
  },
  {
    path: '/details',
    name: 'details',
    component: Details,
  },
  {
    path: '/static',
    name: 'static',
    component: Static,
  },
  {
    path: '/404',
    component: () => import('../views/404/index'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
