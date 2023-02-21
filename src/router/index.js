/*
 * @Author: chenwenda316
 * @Date: 2022-12-02 21:34:45
 * @LastEditTime: 2023-02-15 21:52:16
 * @FilePath: \app\class_app_dev\src\router\index.js
 */
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/seat',
      name: 'seat',
      component: () => import('../views/SeatContainerView.vue')
    },
    {
      path: '/fee',
      name: 'fee',
      component: () => import('../views/FeeView.vue')
    },
    {
      path: '/random',
      name: 'random',
      component: () => import('../views/RandomView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/ddt',
      name: 'ddt',
      component: () => import('../views/DynamicDesktopView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: import('../views/NotFoundView.vue') },
  ]
})

router.beforeEach(async (to, from) => {
  const needLoginName = [
    "fee",
  ];
  if (to.name == 'login') {
    if(!sessionStorage.getItem("login_for"))
    sessionStorage.setItem("login_for",from.path)
    return true;
  }
  // console.log(localStorage.getItem("token"));
  if (needLoginName.indexOf(to.name) != -1) {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    // console.log(to);
    sessionStorage.setItem("login_for",to.path)
    return { name: "login" };
  }
})

export default router
