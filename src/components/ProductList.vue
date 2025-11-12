<template>
  <div class="product-list-container">
    <div v-if="isLoading" class="loading">
      Завантаження товарів...
    </div>
    <div v-else-if="products.length === 0" class="no-products">
      Товарів за вашим запитом не знайдено.
    </div>
    <div v-else class="product-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image" :style="{ backgroundColor: product.color }"></div>
        <div class="product-info">
          <h4 class="product-name">{{ product.name }}</h4>
          <p class="product-category">{{ product.category }}</p>
          <p class="product-price">${{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Мок-тип для продукту
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  color: string; // для мок-зображення
}

defineProps<{
  products: Product[];
  isLoading: boolean;
}>();
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
  height: 200px;
  width: 100%;
}
.product-info {
  padding: 16px;
}
.product-name {
  font-size: 1.15rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px;
}
.product-category {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 12px;
}
.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #3b82f6;
  margin: 0;
}
</style>
