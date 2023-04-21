import { createRouter, createWebHistory } from 'vue-router'
import Default from "@/layouts/default/Default.vue";
import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import {isAuthenticated, isNotAuthenticated} from "@/router/guards";
import ContentCenter from "@/layouts/default/ContentCenter.vue";

const routes = [
  {
    path: '/',
    component: Default,
    beforeEnter: isAuthenticated,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
    ],
  },
  {
    path: '/auth',
    component: ContentCenter,
    beforeEnter: isNotAuthenticated,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
