import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/views/index/index.vue';
import Login from '@/views/login/login.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: Index,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
];

const router = new VueRouter({
  routes,
});

// 判断登录
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') || to.fullPath === '/login') {
    next();
  } else {
    next('/login');
  }
});

export default router;
