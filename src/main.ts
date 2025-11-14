import { createApp } from 'vue'
import { createPinia } from 'pinia' // Додати цей імпорт
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) // Додати цей рядок
app.use(router)

app.mount('#app')

// Додати в кінець main.ts
if (import.meta.env.DEV) {
  // Запускаємо тест кешування через 2 секунди після завантаження
  setTimeout(async () => {
    const { testCachePerformance, getCacheStats } = await import('@/api/productsApi');

    console.log('🚀 Running cache performance tests...');
    await testCachePerformance();

    // Додаткові тести
    console.log('📊 Current cache stats:', getCacheStats());

    // Тест очищення кешу
    // clearProductsCache();
    // console.log('📊 Cache stats after clear:', getCacheStats());
  }, 2000);
}
