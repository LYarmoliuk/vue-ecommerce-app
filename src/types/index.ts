import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WishlistView from '../views/WishlistView.vue'
import CartView from '../views/CartView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // Scroll Behavior - скрол до верху при зміні роуту
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0, behavior: 'smooth' }
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'E-Shop - Головна'
      }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetailView,
      props: true,
      meta: {
        title: 'E-Shop - Деталі товару'
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: {
        title: 'E-Shop - Кошик'
      }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistView,
      meta: {
        title: 'E-Shop - Список бажань'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'E-Shop - Про нас'
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView,
      meta: {
        title: 'E-Shop - Сторінку не знайдено'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

// Route Guards
router.beforeEach((to, from, next) => {
  console.log(`Навігація з ${from.path} до ${to.path}`)

  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  next()
})

router.afterEach((to, from) => {
  console.log(`Успішно перейшли до ${to.path}`)
})

export default router
