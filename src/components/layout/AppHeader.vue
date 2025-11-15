<!-- src/components/AppHeader.vue -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, watch, onMounted, onBeforeUnmount, computed, provide } from 'vue'
import type { Product } from '@/types'

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

const saveToLocalStorage = (key: string, data: unknown): void => {
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
const addToCart = (product: Product): void => {
  const existingItem = cartItems.value.find(item => item.id === product.id)

  if (existingItem) {
    existingItem.quantity++
  } else {
    cartItems.value.push({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }

  saveToLocalStorage('cart', cartItems.value)
  console.log('Додано до кошика:', product.title, 'Кількість:', cartCount.value)
}

const addToWishlist = (product: Product): void => {
  const existingItem = wishlistItems.value.find(item => item.id === product.id)

  if (!existingItem) {
    wishlistItems.value.push({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image
    })
    saveToLocalStorage('wishlist', wishlistItems.value)
    console.log('Додано до улюбленого:', product.title, 'Кількість:', wishlistCount.value)
  } else {
    console.log('Товар вже в улюбленому:', product.title)
  }
}

const removeFromCart = (productId: number): void => {
  cartItems.value = cartItems.value.filter(item => item.id !== productId)
  saveToLocalStorage('cart', cartItems.value)
  console.log('Видалено з кошика:', productId)
}

const removeFromWishlist = (productId: number): void => {
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
            :class="{ 'pop': wishlistBadgePop }"
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
            :class="{ 'pop': cartBadgePop }"
          >
            {{ cartCount }}
          </span>
        </RouterLink>
      </div>

      <!-- Іконки -->
      <div class="nav-icons">
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

/* ==================== */
/* ЛОГОТИП - HOVER ЕФЕКТ */
/* ==================== */
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.75rem;
  font-weight: 800;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-radius: 12px;
  padding: 0.5rem;
  margin: -0.5rem;
}

.logo-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rotate-icon 4s ease-in-out infinite;
  transition: transform 0.3s ease;
}

@keyframes rotate-icon {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
}

.logo-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

/* Hover ефект для логотипу */
.logo:hover {
  transform: translateY(-2px);
  background: rgba(102, 126, 234, 0.05);
}

.logo:hover .logo-icon {
  animation-duration: 2s;
  transform: scale(1.1);
}

.logo:hover .logo-text {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Focus state для доступності */
.logo:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 4px;
  border-radius: 12px;
}

/* ==================== */
/* DESKTOP НАВІГАЦІЯ */
/* ==================== */
.nav-links-desktop {
  display: none;
}

/* ==================== */
/* ІКОНКИ ТА КНОПКИ */
/* ==================== */
.nav-icons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-link {
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  padding: 4px;
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

/* Hover ефект для іконок */
.icon-link:hover .icon-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.profile-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.icon-link:hover .profile-wrapper {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  box-shadow: 0 8px 20px rgba(118, 75, 162, 0.4);
  transform: translateY(-3px) scale(1.05);
}

/* Focus state для іконок */
.icon-link:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 2px;
  border-radius: 14px;
}

.icon-link:focus-visible .icon-wrapper {
  outline: 2px solid white;
  outline-offset: 2px;
}

/* ==================== */
/* BADGE СТИЛІ */
/* ==================== */
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
  transition: all 0.3s ease;
}

.desktop-badge.pop {
  animation: pop-animation 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
  transition: all 0.3s ease;
}

/* ==================== */
/* ГАМБУРГЕР-МЕНЮ */
/* ==================== */
.mobile-menu-button {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1002;
  position: relative;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-menu-button span {
  width: 28px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

/* Hover ефект для кнопки меню */
.mobile-menu-button:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: scale(1.05);
}

.mobile-menu-button:hover span {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
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

/* Focus state для кнопки меню */
.mobile-menu-button:focus-visible {
  outline: 3px solid #764ba2;
  outline-offset: 4px;
  border-radius: 8px;
  background: rgba(102, 126, 234, 0.1);
}

/* ==================== */
/* МОБІЛЬНЕ МЕНЮ */
/* ==================== */
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
  gap: 1.5rem;
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
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  position: relative;
  overflow: hidden;
}

/* Hover ефект для мобільних посилань */
.mobile-nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.mobile-nav-link:hover::before {
  left: 100%;
}

.mobile-nav-link:hover,
.mobile-nav-link:focus-visible,
.mobile-nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateX(10px) scale(1.02);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.mobile-link-icon {
  font-size: 1.75rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.mobile-nav-link:hover .mobile-link-icon {
  transform: scale(1.2);
}

.mobile-link-text {
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.mobile-nav-link:hover .mobile-link-text {
  transform: translateX(5px);
}

/* Focus state для мобільних посилань */
.mobile-nav-link:focus-visible {
  outline: 3px solid white;
  outline-offset: 2px;
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

/* ==================== */
/* DESKTOP СТИЛІ */
/* ==================== */
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
    border: 2px solid transparent;
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

  /* Hover ефект для desktop навігації */
  .nav-link:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.08);
    border-color: rgba(102, 126, 234, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
  }

  .nav-link:hover .link-icon {
    transform: scale(1.2) translateY(-1px);
  }

  .nav-link:hover .link-text::after {
    transform: scaleX(1);
  }

  .nav-link:hover .desktop-badge {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(244, 63, 94, 0.3);
  }

  .nav-link.router-link-active {
    color: #667eea;
    background: rgba(102, 126, 234, 0.12);
    border-color: rgba(102, 126, 234, 0.3);
  }

  .nav-link.router-link-active .link-text::after {
    transform: scaleX(1);
  }

  /* Focus state для desktop навігації */
  .nav-link:focus-visible {
    outline: 3px solid #667eea;
    outline-offset: 2px;
    background: rgba(102, 126, 234, 0.1);
    border-color: #667eea;
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

/* ==================== */
/* СПІЛЬНІ TRANSITION СТИЛІ */
/* ==================== */
.logo,
.nav-link,
.icon-link,
.mobile-menu-button,
.mobile-nav-link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Плавні трансформації */
.logo:hover,
.nav-link:hover,
.icon-link:hover,
.mobile-nav-link:hover {
  transition-duration: 0.2s;
}
</style>
