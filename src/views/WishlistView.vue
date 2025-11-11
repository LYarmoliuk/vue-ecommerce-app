<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-brand-primary mb-6">Ваш Кошик</h1>

    <!-- Це заглушка, поки немає реальних даних -->
    <div class="text-center text-brand-secondary py-12">
      <p class="text-lg">Ваш кошик порожній.</p>
      <p class="mt-2">Схоже, ви ще нічого не додали.</p>
      <RouterLink to="/" class="mt-4 inline-block bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
        Почати Покупки
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
