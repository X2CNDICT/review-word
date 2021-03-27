import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import En from '../views/en.vue';
import Es from '../views/es.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '',
    redirect: 'en',
  },
  {
    path: '/en',
    name: 'en',
    component: En,
  },
  {
    path: '/es',
    name: 'es',
    component: Es,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
