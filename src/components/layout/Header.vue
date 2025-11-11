<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'

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

// --- Стан кошика (з Pinia) ---
const wishlistCount = ref(3)
const cartCount = ref(1)

// --- Логіка для "Pop" анімації ---
const wishlistBadgePop = ref(false)
const cartBadgePop = ref(false)

const isWishlistVisible = computed(() => wishlistCount.value > 0)
const isCartVisible = computed(() => cartCount.value > 0)

watch(wishlistCount, (newCount, old) => {
  if (newCount > old) { // "Pop" тільки при збільшенні
    wishlistBadgePop.value = true
    setTimeout(() => { wishlistBadgePop.value = false }, 300) // Тривалість анімації
  }
})

watch(cartCount, (newCount, old) => {
  if (newCount > old) { // "Pop" тільки при збільшенні
    cartBadgePop.value = true
    setTimeout(() => { cartBadgePop.value = false }, 300)
  }
})

// --- Демонстрація (можна видалити) ---
onMounted(() => {
  // Демонстрація "pop" анімації через 2 секунди
  setTimeout(() => {
    cartCount.value++ // Це запустить watch
  }, 2000)
})

</script>

<template>
  <!-- Додаємо :class для анімації скролу -->
  <header class="app-header" :class="{ 'is-scrolled': isHeaderScrolled }">
    <nav class="header-nav">

      <!-- Logo -->
      <RouterLink to="/" class="logo">
        E-Shop
      </RouterLink>

      <!-- Навігація для ПК -->
      <div class="nav-links-desktop">
        <RouterLink to="/" class="nav-link"><span>Shop</span></RouterLink>
        <RouterLink to="/wishlist" class="nav-link"><span>Wishlist</span></RouterLink>
        <RouterLink to="/cart" class="nav-link"><span>Cart</span></RouterLink>
      </div>

      <!-- Іконки -->
      <div class="nav-icons">
        <RouterLink to="/wishlist" class="icon-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <!-- Оновлені класи для анімації "pop" та появи -->
          <span
            class="badge"
            :class="{ 'is-visible': isWishlistVisible, 'pop': wishlistBadgePop }"
          >
            {{ wishlistCount }}
          </span>
        </RouterLink>

        <RouterLink to="/cart" class="icon-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <!-- Оновлені класи для анімації "pop" та появи -->
          <span
            class="badge"
            :class="{ 'is-visible': isCartVisible, 'pop': cartBadgePop }"
          >
            {{ cartCount }}
          </span>
        </RouterLink>

        <RouterLink to="/profile" class="icon-link profile-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
          </svg>
        </RouterLink>
      </div>

      <!-- Кнопка мобільного меню (Гамбургер) -->
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
        <RouterLink to="/" class="mobile-nav-link" @click="isMobileMenuOpen = false">Shop</RouterLink>
        <RouterLink to="/wishlist" class="mobile-nav-link" @click="isMobileMenuOpen = false">Wishlist</RouterLink>
        <RouterLink to="/cart" class="mobile-nav-link" @click="isMobileMenuOpen = false">Cart</RouterLink>
        <RouterLink to="/profile" class="mobile-nav-link" @click="isMobileMenuOpen = false">Profile</RouterLink>
      </div>
    </transition>
  </header>


</template>

<style scoped>
/* Ваші :root змінні */
:root {
  --font-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --color-primary: #007bff;
  --color-primary-dark: #0056b3;
  --color-text: #333;
  --color-text-light: #555;
  --color-border: #e0e0e0;
  --color-bg: #ffffff;
  --color-bg-alt: #f8f9fa;
  --color-accent: #dc3545;
}

.app-header {
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 1.5rem; /* 16px 24px */
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: var(--font-main);

  /* Плавний перехід для анімації "прилипання" */
  transition: padding 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

/* Стан "прилипання" */
.app-header.is-scrolled {
  padding: 0.5rem 1.5rem; /* Зменшуємо висоту */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08); /* Чіткіша тінь */
  background-color: rgba(255, 255, 255, 0.95); /* Ефект "скла" */
  backdrop-filter: blur(5px);
}

.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.75rem; /* 28px */
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.3s ease;
}
.logo:hover {
  color: var(--color-primary-dark);
}

.nav-links-desktop {
  display: none; /* Ховаємо на мобільних */
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 1rem; /* 16px */
}

.icon-link {
  position: relative;
  color: var(--color-text-light);
  text-decoration: none;
  transition: color 0.3s ease, transform 0.2s ease;
}
.icon-link:hover {
  color: var(--color-primary);
  transform: scale(1.1); /* Додаємо легку анімацію на іконки */
}

.badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background-color:red;
  color: rgb(255, 255, 255);
  font-size: 0.75rem; /* 12px */
  font-weight: 600;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--color-bg);

  /* Логіка анімації появи */
  transform: scale(0);
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Клас для видимості badge */
.badge.is-visible {
  transform: scale(1);
}

/* Анімація "Pop" */
@keyframes pop-animation {
  0% { transform: scale(1); }
  50% { transform: scale(1.4); } /* Підстрибуємо */
  100% { transform: scale(1); }
}

.badge.pop {
  animation: pop-animation 0.3s ease-out;
}


/* --- Гамбургер-меню --- */
.mobile-menu-button {
  display: flex; /* Показуємо на мобільних */
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1002; /* Вище, ніж хедер, але нижче, ніж меню */
}

.mobile-menu-button span {
  width: 24px;
  height: 2px;
  background-color: var(--color-text);
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  position: relative;
}

/* Анімація "хрестика" */
.mobile-menu-button.is-active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.mobile-menu-button.is-active span:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}
.mobile-menu-button.is-active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* --- Повноекранне мобільне меню --- */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.mobile-nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: 2rem; /* 32px */
  font-weight: 600;
  transition: color 0.3s ease;
}
.mobile-nav-link:hover {
  color: var(--color-primary);
}

/* Анімація появи мобільного меню */
.mobile-menu-fade-enter-active,
.mobile-menu-fade-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-fade-enter-from,
.mobile-menu-fade-leave-to {
  opacity: 0;
}


/* --- Медіа-запит для ПК (desktop) --- */
@media (min-width: 768px) {
  .nav-links-desktop {
    display: flex;
    gap: 1.5rem; /* 24px */
  }

  .nav-link {
    color: var(--color-text-light);
    text-decoration: none;
    font-weight: 500;
    padding: 5px;
    position: relative;
    transition: color 0.3s ease;
  }
  .nav-link:hover {
    color:lightblue;

  }
  /* Анімація підкреслення */
  .nav-link span {
    position: relative;
  }
  .nav-link span::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: lightblue;
    color: white;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  }
  .nav-link:hover span::after,
  .nav-link.router-link-active span::after {
    transform: scaleX(1);
  }
  .nav-link.router-link-active {
      color: var(--color-text);
      font-weight: 600;
  }

  .nav-icons {
    gap: 1.5rem; /* 24px */
  }

  .profile-icon {
    display: block; /* Показуємо "Профіль" тільки на ПК */
  }

  .mobile-menu-button {
    display: none; /* Ховаємо гамбургер на ПК */
  }
  .mobile-menu {
    display: none; /* Ховаємо мобільне меню на ПК */
  }
}
</style>
