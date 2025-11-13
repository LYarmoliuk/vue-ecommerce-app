<!-- src/components/AppHeader.vue -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, watch, onMounted, onBeforeUnmount, computed, provide } from 'vue'

// --- Стан меню ---
const isMobileMenuOpen = ref(false)

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// --- Стан хедера (для анімації скролу) ---
const isHeaderScrolled = ref(false)

const handleScroll = () => {
  isHeaderScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// --- Інтерфейси ---
interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
}

// --- Логіка кошика та списку бажань ---
const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Помилка збереження в localStorage:', error)
  }
}

// Стани
const cartItems = ref<CartItem[]>(loadFromLocalStorage('cart', []))
const wishlistItems = ref<WishlistItem[]>(loadFromLocalStorage('wishlist', []))

// Комп'ютери для підрахунку
const wishlistCount = computed(() => wishlistItems.value.length)
const cartCount = computed(() =>
  cartItems.value.reduce((total, item) => total + item.quantity, 0)
)

// --- Логіка для "Pop" анімації ---
const wishlistBadgePop = ref(false)
const cartBadgePop = ref(false)

const isWishlistVisible = computed(() => wishlistCount.value > 0)
const isCartVisible = computed(() => cartCount.value > 0)

watch(wishlistCount, (newCount, old) => {
  if (newCount > old) {
    wishlistBadgePop.value = true
    setTimeout(() => { wishlistBadgePop.value = false }, 300)
  }
})

watch(cartCount, (newCount, old) => {
  if (newCount > old) {
    cartBadgePop.value = true
    setTimeout(() => { cartBadgePop.value = false }, 300)
  }
})

// --- Функції для роботи з кошиком та списком бажань ---
const addToCart = (product: any) => {
  const existingItem = cartItems.value.find(item => item.id === product.id)

  if (existingItem) {
    existingItem.quantity++
  } else {
    cartItems.value.push({
      ...product,
      quantity: 1
    })
  }

  saveToLocalStorage('cart', cartItems.value)
  console.log('Додано до кошика:', product.name, 'Кількість:', cartCount.value)
}

const addToWishlist = (product: any) => {
  const existingItem = wishlistItems.value.find(item => item.id === product.id)

  if (!existingItem) {
    wishlistItems.value.push(product)
    saveToLocalStorage('wishlist', wishlistItems.value)
    console.log('Додано до улюбленого:', product.name, 'Кількість:', wishlistCount.value)
  } else {
    console.log('Товар вже в улюбленому:', product.name)
  }
}

const removeFromCart = (productId: number) => {
  cartItems.value = cartItems.value.filter(item => item.id !== productId)
  saveToLocalStorage('cart', cartItems.value)
  console.log('Видалено з кошика:', productId)
}

const removeFromWishlist = (productId: number) => {
  wishlistItems.value = wishlistItems.value.filter(item => item.id !== productId)
  saveToLocalStorage('wishlist', wishlistItems.value)
  console.log('Видалено з улюбленого:', productId)
}

// Надаємо функції дочірнім компонентам
provide('cartMethods', {
  addToCart,
  removeFromCart,
  cartItems,
  cartCount
})

provide('wishlistMethods', {
  addToWishlist,
  removeFromWishlist,
  wishlistItems,
  wishlistCount
})

// Експортуємо функції для тестування
defineExpose({
  addToCart,
  addToWishlist,
  removeFromCart,
  removeFromWishlist,
  cartItems,
  wishlistItems,
  cartCount,
  wishlistCount
})
</script>

<template>
  <header class="app-header" :class="{ 'is-scrolled': isHeaderScrolled }">
    <nav class="header-nav">
      <!-- Logo з градієнтом -->
      <RouterLink to="/" class="logo">
        <span class="logo-icon">✦</span>
        <span class="logo-text">LINO</span>
      </RouterLink>

      <!-- Desktop навігація -->
      <div class="nav-links-desktop">
        <RouterLink to="/" class="nav-link">
          <span class="link-icon">🏪</span>
          <span class="link-text">Магазин</span>
        </RouterLink>
        <RouterLink to="/wishlist" class="nav-link">
          <span class="link-icon">♥</span>
          <span class="link-text">Улюблене</span>
          <span
            v-if="wishlistCount > 0"
            class="desktop-badge"
          >
            {{ wishlistCount }}
          </span>
        </RouterLink>
        <RouterLink to="/cart" class="nav-link">
          <span class="link-icon">🛒</span>
          <span class="link-text">Кошик</span>
          <span
            v-if="cartCount > 0"
            class="desktop-badge"
          >
            {{ cartCount }}
          </span>
        </RouterLink>
      </div>

      <!-- Іконки -->
      <div class="nav-icons">
        <RouterLink to="/wishlist" class="icon-link" title="Список бажань">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span
              class="badge"
              :class="{ 'is-visible': isWishlistVisible, 'pop': wishlistBadgePop }"
            >
              {{ wishlistCount }}
            </span>
          </div>
        </RouterLink>

        <RouterLink to="/cart" class="icon-link" title="Кошик">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span
              class="badge"
              :class="{ 'is-visible': isCartVisible, 'pop': cartBadgePop }"
            >
              {{ cartCount }}
            </span>
          </div>
        </RouterLink>

        <RouterLink to="/profile" class="icon-link profile-icon" title="Профіль">
          <div class="icon-wrapper profile-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </RouterLink>
      </div>

      <!-- Кнопка мобільного меню -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="mobile-menu-button"
        :class="{ 'is-active': isMobileMenuOpen }"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>

    <!-- Повноекранне мобільне меню -->
    <transition name="mobile-menu-fade">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <div class="mobile-menu-content">
          <RouterLink to="/" class="mobile-nav-link" @click="isMobileMenuOpen = false">
            <span class="mobile-link-icon">🏪</span>
            <span class="mobile-link-text">Магазин</span>
          </RouterLink>
          <RouterLink to="/wishlist" class="mobile-nav-link" @click="isMobileMenuOpen = false">
            <span class="mobile-link-icon">♥</span>
            <span class="mobile-link-text">Улюблене</span>
            <span v-if="wishlistCount > 0" class="mobile-badge">{{ wishlistCount }}</span>
          </RouterLink>
          <RouterLink to="/cart" class="mobile-nav-link" @click="isMobileMenuOpen = false">
            <span class="mobile-link-icon">🛒</span>
            <span class="mobile-link-text">Кошик</span>
            <span v-if="cartCount > 0" class="mobile-badge">{{ cartCount }}</span>
          </RouterLink>
          <RouterLink to="/profile" class="mobile-nav-link" @click="isMobileMenuOpen = false">
            <span class="mobile-link-icon">👤</span>
            <span class="mobile-link-text">Профіль</span>
          </RouterLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1.25rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.app-header.is-scrolled {
  padding: 0.875rem 1.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
}

.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo стилі */
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.75rem;
  font-weight: 800;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.logo-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: rotate-icon 4s ease-in-out infinite;
}

@keyframes rotate-icon {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
}

.logo-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
}

.logo:hover {
  transform: translateY(-2px);
}

/* Desktop навігація */
.nav-links-desktop {
  display: none;
}

/* Іконки */
.nav-icons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-link {
  text-decoration: none;
  transition: all 0.3s ease;
}

.icon-wrapper {
  position: relative;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  color: #495057;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

.icon-link:hover .icon-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.profile-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.icon-link:hover .profile-wrapper {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  box-shadow: 0 8px 20px rgba(118, 75, 162, 0.4);
}

/* Badge стилі */
.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
  color: white;
  font-size: 0.6875rem;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(244, 63, 94, 0.4);
  transform: scale(0);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.badge.is-visible {
  transform: scale(1);
}

@keyframes pop-animation {
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
}

.badge.pop {
  animation: pop-animation 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Desktop badge */
.desktop-badge {
  background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
}

/* Mobile badge */
.mobile-badge {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  font-size: 0.875rem;
  font-weight: 700;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
}

/* Гамбургер-меню */
.mobile-menu-button {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1002;
  position: relative;
}

.mobile-menu-button span {
  width: 28px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.mobile-menu-button.is-active span:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.mobile-menu-button.is-active span:nth-child(2) {
  opacity: 0;
  transform: translateX(-30px);
}

.mobile-menu-button.is-active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Мобільне меню */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.98) 0%, rgba(118, 75, 162, 0.98) 100%);
  backdrop-filter: blur(20px);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: white;
  text-decoration: none;
  font-size: 2rem;
  font-weight: 700;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateX(10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.mobile-link-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.mobile-link-text {
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.mobile-menu-fade-enter-active,
.mobile-menu-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.mobile-menu-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Desktop стилі */
@media (min-width: 768px) {
  .nav-links-desktop {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #495057;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: transparent;
  }

  .link-icon {
    font-size: 1.25rem;
    transition: transform 0.3s ease;
  }

  .link-text {
    position: relative;
  }

  .link-text::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-link:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.08);
  }

  .nav-link:hover .link-icon {
    transform: scale(1.2);
  }

  .nav-link:hover .link-text::after {
    transform: scaleX(1);
  }

  .nav-link.router-link-active {
    color: #667eea;
    background: rgba(102, 126, 234, 0.12);
  }

  .nav-link.router-link-active .link-text::after {
    transform: scaleX(1);
  }

  .nav-icons {
    gap: 1rem;
  }

  .profile-icon {
    display: block;
  }

  .mobile-menu-button {
    display: none;
  }
}

@media (min-width: 1024px) {
  .nav-links-desktop {
    gap: 1rem;
  }

  .nav-link {
    padding: 0.875rem 1.5rem;
  }
}
</style>
