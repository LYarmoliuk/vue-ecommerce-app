<!-- src/views/HomeView.vue -->
<template>
  <div class="home-view">
    <h1 class="title">🛍️ Ласкаво просимо до E-Shop!</h1>
    <p class="subtitle">Перегляньте наші найкращі товари 👇</p>

    <ProductList />
  </div>
</template>

<script setup lang="ts">
import ProductList from '@/components/ProductList.vue'
</script>

<style scoped>
.home-view {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 40px;
}
</style>
