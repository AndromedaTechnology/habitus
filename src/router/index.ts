import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "../views/Home.vue";
import Habit from "../views/Habit.vue";
import Input from "../views/Input.vue";
import HabitCreate from "../views/HabitCreate.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Input,
  },
  {
    path: "/user",
    name: "user",
    component: Home,
  },
  {
    path: "/habitCreate",
    name: "habitCreate",
    component: HabitCreate,
  },
  {
    path: "/habit/:id",
    name: "habit",
    component: Habit,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
