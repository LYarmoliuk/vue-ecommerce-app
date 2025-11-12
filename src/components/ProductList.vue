<template>
  <div class="product-list-container">
    <div v-if="isLoading" class="loading">
      🔄 Завантаження товарів...
    </div>
    <div v-else-if="products.length === 0" class="no-products">
      😔 Товарів за вашим запитом не знайдено.
    </div>
    <div v-else class="product-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="product-image"
          @error="handleImageError"
        />
        <div class="product-info">
          <h4 class="product-name">{{ product.title }}</h4>
          <p class="product-category">{{ formatCategory(product.category) }}</p>
          <p class="product-price">${{ product.price }}</p>
          <p class="product-rating">⭐ {{ product.rating.rate }} ({{ product.rating.count }})</p>
          <p v-if="!product.inStock" class="out-of-stock">Немає в наявності</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types';

defineProps<{
  products: Product[];
  isLoading: boolean;
}>();

const formatCategory = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    "men's clothing": "Чоловічий одяг",
    "women's clothing": "Жіночий одяг"
  };
  return categoryMap[category] || category;
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://via.placeholder.com/300x400/cccccc/969696?text=No+Image';
};
</script>

<style scoped>
.loading, .no-products {
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  padding: 60px 0;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

.product-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 1.15rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px;
  line-height: 1.3;
}

.product-category {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 12px;
  text-transform: capitalize;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #3b82f6;
  margin: 0 0 8px;
}

.product-rating {
  font-size: 0.9rem;
  color: #f59e0b;
  margin: 0;
}

.out-of-stock {
  font-size: 0.8rem;
  color: #ef4444;
  margin: 8px 0 0;
  font-weight: 500;
}
</style>
