<template>
  <div class="wishlist-view">
    <h1 class="wishlist-title">Список бажань</h1>

    <div v-if="favoritesStore.favorites.length === 0" class="empty-wishlist">
      <p class="empty-text">Список бажань порожній</p>
      <RouterLink to="/" class="shop-link">
        Почати покупки
      </RouterLink>
    </div>

    <div v-else class="wishlist-grid">
      <div v-for="product in favoritesStore.favorites" :key="product.id" class="wishlist-item">
        <img
          :src="product.image"
          :alt="product.title"
          class="product-image"
        >
        <div class="product-info">
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-footer">
            <span class="product-price">${{ product.price }}</span>
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
</template>

<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites';

const favoritesStore = useFavoritesStore();
</script>

<style scoped>
.wishlist-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.wishlist-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.empty-wishlist {
  text-align: center;
  padding: 3rem 0;
}

.empty-text {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.shop-link {
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  margin-top: 1rem;
}

.shop-link:hover {
  background: #2563eb;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.wishlist-item {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.product-title {
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.product-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
}

.remove-btn {
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
}

.remove-btn:hover {
  color: #dc2626;
}

@media (max-width: 768px) {
  .wishlist-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}
</style>
