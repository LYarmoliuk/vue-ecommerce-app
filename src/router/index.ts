import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WishlistView from '../views/WishlistView.vue'
import CartView from '../views/CartView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // Scroll Behavior - скрол до верху при зміні роуту
  scrollBehavior(_to, _from, savedPosition) { // Видалили невикористовувані параметри
    // Якщо є збережена позиція (наприклад, при натисканні "назад"), повертаємося до неї
    if (savedPosition) {
      return savedPosition
    }

    // Якщо є хеш, скролимо до елемента
    if (_to.hash) {
      return {
        el: _to.hash,
        behavior: 'smooth'
      }
    }

    // В інших випадках - на початок сторінки
    return { top: 0, behavior: 'smooth' }
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'LINO - Головна'
      }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetailView,
      props: true,
      meta: {
        title: 'LINO - Деталі товару'
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: {
        title: 'LINO - Кошик'
      }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistView,
      meta: {
        title: 'LINO - Список бажань'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'LINO - Про нас'
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView,
      meta: {
        title: 'LINO - Сторінку не знайдено'
      }
    },
    {
      path: '/:pathMatch(.*)*', // Перехоплюємо всі невідомі маршрути
      redirect: '/404'
    }
  ]
})

// Route Guards - Глобальний перед-гард
router.beforeEach((to, from, next) => {
  console.log(`Навігація з ${from.path} до ${to.path}`)

  // Оновлюємо title сторінки
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  next()
})

// Глобальний після-гард
router.afterEach((to) => { // Видалили невикористовуваний параметр _from
  // Можна додати аналітику тут
  console.log(`Успішно перейшли до ${to.path}`)
})

export default router
