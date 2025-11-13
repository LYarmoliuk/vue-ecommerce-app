<template>
  <div class="not-found">
    <div class="container">
      <h1>404 - Сторінку не знайдено</h1>
      <p>Вибачте, але сторінка, яку ви шукаєте, не існує.</p>
      <router-link to="/" class="home-link">На головну</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Базова реалізація - Developer 1 буде допрацьовувати
</script>

<style scoped>
.not-found {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
}

.home-link {
  color: #3b82f6;
  text-decoration: none;
  margin-top: 1rem;
  display: inline-block;
}
</style>
