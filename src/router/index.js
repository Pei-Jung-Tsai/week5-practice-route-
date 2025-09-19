import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import { isAuthenticated } from '../stores/auth'
import AddBookView from '../views/AddBookView.vue'

const routes = [
  {path:'/FirebaseRegister',
    name: 'FirebaseRegister',
    component: FirebaseRegisterView
  },
  {path:'/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  { path: '/',
    redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {path:'/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }  /* need login tag*/
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  { path: '/:pathMatch(.*)*',
    redirect: '/home' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* before routing, check do the page need login and login status*/ 
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'Login', query: { reason: 'denied', redirect: to.fullPath } }
  }
})

export default router