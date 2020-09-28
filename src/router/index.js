import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },

  {
    path: '/dynamic-table',
    name: 'Dynamictable',
    component: () => import('../views/DynamicTable.vue'),
  },

  {
    path: '/wizard-form',
    name: 'WizardForm',
    component: () => import('../views/WizardForm.vue'),
  },

  {
    path: '/campaign-creation/:slug',
    name: 'app-create-campaign',
    component: () => import ('../views/Campaigncreation/index.vue')
  },

  {
    path: '/wizard-form/list',
    name: 'WizardFormList',
    component: () => import ('../views/WizardList.vue')
  },

  {
    path: '/wizard-form/complete',
    name: 'WizardFormComplete',
    component: () => import ('../views/WizardFormComplete.vue')
  },

  {
    path: '/calculator',
    name: 'CalculatorIndex',
    component: () => import ('../views/Calculator.vue')
  }

];

const router = new VueRouter({
  routes,
});

export default router;
