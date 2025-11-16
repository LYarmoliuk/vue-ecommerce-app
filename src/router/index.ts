import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WishlistView from '../views/WishlistView.vue'
import CartView from '../views/CartView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHashHistory('/vue-ecommerce-app/'), 

  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (_to.hash) {
      return {
        el: _to.hash,
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
      meta: { title: 'LINO - Головна' }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetailView,
      props: true,
      meta: { title: 'LINO - Деталі товару' }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { title: 'LINO - Кошик' }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { title: 'LINO - Оформлення замовлення' }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistView,
      meta: { title: 'LINO - Список бажань' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'LINO - Про нас' }
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView,
      meta: { title: 'LINO - Сторінку не знайдено' }
    },

    // Catch-all для 404
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

router.afterEach((to) => {
  console.log(`Успішно перейшли до ${to.path}`)
})

export default router
