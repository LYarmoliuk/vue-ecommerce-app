import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 1. Імпортуємо нові сторінки
import WishlistView from '../views/WishlistView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop', // Назвемо це 'shop', як у вашому меню
      component: HomeView
    },
    // 2. Додаємо нові маршрути
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue') // (джерело 103)
    }
  ]
})

export default router
