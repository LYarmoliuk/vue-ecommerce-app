<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <!-- Ми видалили всі класи Tailwind -->
  <div id="app-container">
   <AppHeader />

    <!--
      Ми обернули RouterView у <main>,
      щоб задати йому відступи
    -->
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
/* Ось наші нові, ГАРАНТОВАНІ стилі
*/
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1; /* Змушує <main> займати весь доступний простір */
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box; /* Важливо для правильних відступів */
}

/* Проста анімація */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
