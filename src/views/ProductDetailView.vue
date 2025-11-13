<template>
  <div class="product-detail">
    <div class="container">
      <h1>Деталі товару #{{ $route.params.id }}</h1>
      <p>Ця сторінка буде допрацьована Developer 1</p>
      <router-link to="/" class="back-link">← Повернутися до магазину</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Базова реалізація - Developer 1 буде допрацьовувати
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.back-link {
  color: #3b82f6;
  text-decoration: none;
  margin-top: 1rem;
  display: inline-block;
}
</style>
