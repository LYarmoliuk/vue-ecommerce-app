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
        <div v-for="product in favoritesStore.favorites" :key="product.id" class="wishlist-item">
          <div class="product-card">
            <div class="image-container">
              <img
                :src="product.image"
                :alt="product.title"
                class="product-image"
              >
              <button
                @click="favoritesStore.removeFromFavorites(product.id)"
                class="remove-icon-btn"
                title="Видалити зі списку"
              >
                <span class="heart-filled">♥</span>
              </button>
              <div class="image-overlay">
                <button
                  @click="addToCart(product)"
                  class="quick-add-btn"
                  :disabled="!product.inStock"
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
                  >
                    <span class="btn-icon">🛒</span>
                    <span class="btn-text">
                      {{ product.inStock ? 'В кошик' : 'Недоступно' }}
                    </span>
                  </button>
                  <button
                    @click="favoritesStore.removeFromFavorites(product.id)"
                    class="remove-btn"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  transition: all 0.3s ease;
}

.shop-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
}

.link-icon {
  font-size: 1.5rem;
}

.wishlist-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.wishlist-item {
  transition: all 0.3s ease;
}

.product-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  overflow: hidden;
  background: #f9fafb;
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.remove-icon-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 2;
}

.heart-filled {
  font-size: 1.5rem;
  color: #ef4444;
  transition: transform 0.2s ease;
}

.remove-icon-btn:hover {
  transform: scale(1.1);
  background: #fee2e2;
}

.remove-icon-btn:hover .heart-filled {
  transform: scale(1.2);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .image-overlay {
  opacity: 1;
}

.quick-add-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 0.875rem 1.75rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transform: translateY(10px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.product-card:hover .quick-add-btn {
  transform: translateY(0);
}

.quick-add-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
}

.quick-add-btn:disabled {
  background: #9ca3af;
  color: #6b7280;
  cursor: not-allowed;
}

.product-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
  line-height: 1.4;
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
}

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
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.add-to-cart-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.add-to-cart-btn:disabled {
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
  cursor: not-allowed;
  box-shadow: none;
}

.btn-icon {
  font-size: 1.125rem;
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
  transition: all 0.3s ease;
}

.remove-btn:hover {
  color: white;
  background: #ef4444;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

/* Анімації для transition-group */
.wishlist-enter-active,
.wishlist-leave-active {
  transition: all 0.5s ease;
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

  .btn-text {
    display: inline;
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
}
</style>
