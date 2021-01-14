import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import En from '../views/en.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/en',
    name: 'En',
    component: En,
  },
  {
    path: '/es',
    name: 'Es',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/es.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
