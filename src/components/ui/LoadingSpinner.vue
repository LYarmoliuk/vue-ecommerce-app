<!-- src/components/ui/AppSpinner.vue -->
<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
// Можна додати пропси для кастомізації розміру, кольору тощо
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    border-top-color: #e2e8f0;
  }
}
</style>
