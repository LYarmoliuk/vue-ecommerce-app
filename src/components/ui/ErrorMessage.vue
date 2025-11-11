<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="bg-brand-error/10 border border-brand-error text-brand-error px-4 py-3 rounded-lg text-center">
    <p class="font-bold">Виникла помилка</p>
    <p>{{ message }}</p>
  </div>
</template>
