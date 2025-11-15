<template>
  <div class="wishlist-view">
    <div class="header-section">
      <div class="header-content">
        <h1 class="wishlist-title">
          <span class="heart-icon">♥</span>
          Список бажань
        </h1>
        <p class="subtitle" v-if="favoritesStore.favorites.length > 0">
          {{ favoritesStore.favorites.length }} {{ getProductWord(favoritesStore.favorites.length) }}
        </p>
      </div>
    </div>

    <div v-if="favoritesStore.favorites.length === 0" class="empty-wishlist">
      <div class="empty-content">
        <div class="empty-icon">♥</div>
        <h2 class="empty-title">Список бажань порожній</h2>
        <p class="empty-description">Додайте товари, які вам сподобались, щоб легко знайти їх пізніше</p>
        <RouterLink to="/" class="shop-link">
          <span class="link-icon">🛍️</span>
          Почати покупки
        </RouterLink>
      </div>
    </div>

    <div v-else class="wishlist-container">
      <transition-group name="wishlist" tag="div" class="wishlist-grid">
        <article
          v-for="product in favoritesStore.favorites"
          :key="product.id"
          class="wishlist-item"
        >
          <div class="product-card">
            <div class="image-container">
              <img
                :src="product.image"
                :alt="product.title"
                class="product-image"
                loading="lazy"
              >
              <button
                @click="favoritesStore.removeFromFavorites(product.id)"
                class="remove-icon-btn"
                :aria-label="`Видалити ${product.title} зі списку бажань`"
                title="Видалити зі списку"
              >
                <span class="heart-filled">♥</span>
              </button>
              <div class="image-overlay">
                <button
                  @click="addToCart(product)"
                  class="quick-add-btn"
                  :disabled="!product.inStock"
                  :aria-label="product.inStock ? `Швидко додати ${product.title} до кошика` : 'Товар недоступний'"
                >
                  Швидке додавання
                </button>
              </div>
            </div>

            <div class="product-info">
              <h3 class="product-title">{{ product.title }}</h3>
              <p class="product-description">{{ product.description }}</p>

              <div class="product-footer">
                <div class="price-section">
                  <span class="product-price">${{ product.price }}</span>
                </div>

                <div class="action-buttons">
                  <button
                    @click="addToCart(product)"
                    class="add-to-cart-btn"
                    :disabled="!product.inStock"
                    :aria-label="product.inStock ? `Додати ${product.title} до кошика` : 'Товар недоступний'"
                  >
                    <span class="btn-icon">🛒</span>
                    <span class="btn-text">
                      {{ product.inStock ? 'В кошик' : 'Недоступно' }}
                    </span>
                  </button>
                  <button
                    @click="favoritesStore.removeFromFavorites(product.id)"
                    class="remove-btn"
                    aria-label="Видалити з улюблених"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites';
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/types';

const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

const addToCart = (product: Product) => {
  if (!product.inStock) {
    alert(`${product.title} недоступний для замовлення.`);
    return;
  }
  cartStore.addToCart(product);
  alert(`${product.title} додано в кошик!`);
};

const getProductWord = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'товарів';
  }
  if (lastDigit === 1) {
    return 'товар';
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'товари';
  }
  return 'товарів';
};
</script>

<style scoped>
.wishlist-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding-bottom: 3rem;
}

.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 1rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.wishlist-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.heart-icon {
  font-size: 2.5rem;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
}

.subtitle {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.125rem;
  font-weight: 500;
}

.empty-wishlist {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.empty-content {
  text-align: center;
  max-width: 500px;
}

.empty-icon {
  font-size: 6rem;
  color: #d1d5db;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.empty-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.75rem;
}

.empty-description {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* ==================== */
/* SHOP LINK HOVER EFFECTS */
/* ==================== */
.shop-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.shop-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.shop-link:hover::before {
  left: 100%;
}

.shop-link:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow:
    0 8px 25px rgba(102, 126, 234, 0.5),
    0 0 0 2px rgba(255, 255, 255, 0.2);
}

.shop-link:active {
  transform: translateY(-1px) scale(1.02);
  transition-duration: 0.1s;
}

.shop-link:focus-visible {
  outline: 3px solid white;
  outline-offset: 3px;
  border-radius: 50px;
}

.link-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.shop-link:hover .link-icon {
  transform: scale(1.2) rotate(-5deg);
}

.wishlist-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.wishlist-item {
  transition: all 0.3s ease;
}

/* ==================== */
/* PRODUCT CARD HOVER EFFECTS */
/* ==================== */
.product-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
  position: relative;
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.product-card:hover::before {
  opacity: 1;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 2px rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
}

.product-card:focus-within {
  outline: 3px solid #667eea;
  outline-offset: 4px;
}

.image-container {
  position: relative;
  overflow: hidden;
  background: #f9fafb;
  z-index: 2;
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image {
  transform: scale(1.08);
  filter: brightness(1.05) saturate(1.1);
}

/* ==================== */
/* REMOVE BUTTON HOVER EFFECTS */
/* ==================== */
.remove-icon-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;
}

.heart-filled {
  font-size: 1.5rem;
  color: #ef4444;
  transition: all 0.3s ease;
}

.remove-icon-btn:hover {
  transform: scale(1.15) rotate(8deg);
  background: #fee2e2;
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
}

.remove-icon-btn:hover .heart-filled {
  transform: scale(1.3);
  color: #dc2626;
}

.remove-icon-btn:active {
  transform: scale(1.05) rotate(4deg);
  transition-duration: 0.1s;
}

.remove-icon-btn:focus-visible {
  outline: 3px solid #ef4444;
  outline-offset: 2px;
}

/* ==================== */
/* IMAGE OVERLAY EFFECTS */
/* ==================== */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(102, 126, 234, 0.9) 0%,
    rgba(118, 75, 162, 0.8) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
}

.product-card:hover .image-overlay {
  opacity: 1;
}

.quick-add-btn {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  border: 2px solid transparent;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transform: translateY(15px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  font-size: 0.95rem;
}

.product-card:hover .quick-add-btn {
  transform: translateY(0);
}

.quick-add-btn:hover:not(:disabled) {
  background: white;
  color: #764ba2;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.quick-add-btn:active:not(:disabled) {
  transform: translateY(0) scale(1.02);
  transition-duration: 0.1s;
}

.quick-add-btn:disabled {
  background: #9ca3af;
  color: #6b7280;
  cursor: not-allowed;
  transform: translateY(0);
}

.quick-add-btn:focus-visible {
  outline: 3px solid white;
  outline-offset: 2px;
  border-radius: 50px;
}

/* ==================== */
/* PRODUCT INFO */
/* ==================== */
.product-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 2;
  position: relative;
}

.product-title {
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.product-card:hover .product-title {
  color: #667eea;
}

.product-description {
  color: #6b7280;
  font-size: 0.9375rem;
  margin-bottom: 1.25rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.product-footer {
  margin-top: auto;
}

.price-section {
  margin-bottom: 1rem;
}

.product-price {
  font-size: 1.875rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.product-card:hover .product-price {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ==================== */
/* ACTION BUTTONS HOVER EFFECTS */
/* ==================== */
.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.add-to-cart-btn {
  flex: 1;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.add-to-cart-btn:hover:not(:disabled)::before {
  left: 100%;
}

.add-to-cart-btn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 8px 20px rgba(16, 185, 129, 0.4),
    0 0 0 2px rgba(16, 185, 129, 0.1);
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
}

.add-to-cart-btn:active:not(:disabled) {
  transform: translateY(-1px) scale(1.01);
  transition-duration: 0.1s;
}

.add-to-cart-btn:disabled {
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.add-to-cart-btn:focus-visible {
  outline: 3px solid #10b981;
  outline-offset: 2px;
}

.btn-icon {
  font-size: 1.125rem;
  transition: transform 0.3s ease;
}

.add-to-cart-btn:hover:not(:disabled) .btn-icon {
  transform: scale(1.2) rotate(-5deg);
}

.remove-btn {
  color: #ef4444;
  background: white;
  border: 2px solid #ef4444;
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.remove-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.remove-btn:hover::before {
  left: 100%;
}

.remove-btn:hover {
  color: white;
  background: #ef4444;
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 8px 20px rgba(239, 68, 68, 0.3),
    0 0 0 2px rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.remove-btn:active {
  transform: translateY(-1px) scale(1.01);
  transition-duration: 0.1s;
}

.remove-btn:focus-visible {
  outline: 3px solid #ef4444;
  outline-offset: 2px;
}

/* ==================== */
/* TRANSITION ANIMATIONS */
/* ==================== */
.wishlist-enter-active,
.wishlist-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.wishlist-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.wishlist-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.wishlist-move {
  transition: transform 0.5s ease;
}

/* ==================== */
/* RESPONSIVE DESIGN */
/* ==================== */
@media (max-width: 768px) {
  .wishlist-title {
    font-size: 2rem;
  }

  .heart-icon {
    font-size: 2rem;
  }

  .wishlist-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .add-to-cart-btn,
  .remove-btn {
    width: 100%;
  }

  .product-card:hover {
    transform: translateY(-4px) scale(1.01);
  }
}

@media (max-width: 480px) {
  .header-section {
    padding: 2rem 1rem 1.5rem;
  }

  .wishlist-title {
    font-size: 1.75rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .wishlist-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .product-price {
    font-size: 1.5rem;
  }

  .empty-icon {
    font-size: 4rem;
  }

  .empty-title {
    font-size: 1.5rem;
  }

  .empty-description {
    font-size: 1rem;
  }

  /* Менш інтенсивні ефекти на мобільних */
  .add-to-cart-btn:hover:not(:disabled),
  .remove-btn:hover {
    transform: translateY(-2px);
  }
}

/* ==================== */
/* SMOOTH TRANSITIONS */
/* ==================== */
.shop-link,
.product-card,
.remove-icon-btn,
.quick-add-btn,
.add-to-cart-btn,
.remove-btn,
.product-image {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
