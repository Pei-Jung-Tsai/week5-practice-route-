import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue'
import { useAuth } from '../authentication/useAuth'

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
  { path:'/addbook',
    name: 'AddBook',
    component: AddBookView,
    meta: { requiresAuth: true, roles: ['admin']}
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


router.beforeEach((to, from, next) => {
  const { user, role, loading } = useAuth() 
  if (loading.value) return next()
    
  if (to.meta?.requiresAuth && !user.value) {
    return next({ path: '/FireLogin', query: { redirect: to.fullPath } })
  }

  if (to.meta?.roles && user.value) {
    const ok = to.meta.roles.includes(role.value || '')
    if (!ok) return next('/forbidden') 
  }

  next()
})

export default router