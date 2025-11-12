<template>
  <div class="home-view">
    <div class="header">
      <h1 class="title">🛍️ Ласкаво просимо до E-Shop!</h1>
      <p class="subtitle">Перегляньте наші найкращі товари 👇</p>
    </div>

    <div class="main-layout">
      <aside class="sidebar">
        <FilterPanel
          v-model="filters"
          @apply="applyFilters"
          @clear="clearFilters"
        />
      </aside>

      <main class="content">
        <ProductList :products="products" :is-loading="isLoading" />

        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change-page="handlePageChange"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductList from '@/components/ProductList.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import Pagination from '@/components/Pagination.vue';

// --- Мок-тип та дані ---
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  color: string;
}
const ALL_PRODUCTS: Product[] = [
  { id: 1, name: 'Синя футболка', price: 25, category: 'men', color: '#3b82f6' },
  { id: 2, name: 'Червона сукня', price: 120, category: 'women', color: '#ef4444' },
  { id: 3, name: 'Зелені шорти', price: 45, category: 'men', color: '#22c55e' },
  { id: 4, name: 'Жовта панама', price: 15, category: 'accessories', color: '#eab308' },
  { id: 5, name: 'Дитячі кросівки', price: 60, category: 'kids', color: '#f97316' },
  { id: 6, name: 'Біла сорочка', price: 80, category: 'women', color: '#f1f5f9' },
  { id: 7, name: 'Чорні джинси', price: 100, category: 'men', color: '#1e293b' },
  { id: 8, name: 'Рожева шапка', price: 22, category: 'kids', color: '#ec4899' },
  // ... додайте більше товарів для тестування
];
// --- Кінець мок-даних ---

// --- Стан ---
const route = useRoute();
const router = useRouter();

const filters = ref({
  search: '',
  minPrice: '',
  maxPrice: '',
  category: '',
});
const currentPage = ref(1);
const totalPages = ref(1);
const products = ref<Product[]>([]);
const isLoading = ref(false);

const ITEMS_PER_PAGE = 6;

// --- Логіка ---

// 1. Функція, що оновлює URL
const updateRouterQuery = () => {
  const query: Record<string, any> = {};

  // Додаємо фільтри, лише якщо вони не пусті
  if (filters.value.search) query.search = filters.value.search;
  if (filters.value.minPrice) query.min = filters.value.minPrice;
  if (filters.value.maxPrice) query.max = filters.value.maxPrice;
  if (filters.value.category) query.category = filters.value.category;
  if (currentPage.value > 1) query.page = currentPage.value;

  router.push({ query });
};

// 2. Обробники подій від дочірніх компонентів
const applyFilters = () => {
  currentPage.value = 1; // При нових фільтрах скидаємо на 1 сторінку
  updateRouterQuery();
};

const clearFilters = () => {
  filters.value = { search: '', minPrice: '', maxPrice: '', category: '' };
  currentPage.value = 1;
  updateRouterQuery();
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  updateRouterQuery();
};

// 3. Функція завантаження даних (зараз це мок)
// В реальному проекті тут був би fetch/axios до вашого API
const fetchData = (query: typeof route.query) => {
  console.log('Завантаження даних для запиту:', query);
  isLoading.value = true;

  // Мок-затримка
  setTimeout(() => {
    // 1. Фільтрація
    let filtered = [...ALL_PRODUCTS];

    if (query.search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(String(query.search).toLowerCase())
      );
    }
    if (query.min) {
      filtered = filtered.filter(p => p.price >= Number(query.min));
    }
    if (query.max) {
      filtered = filtered.filter(p => p.price <= Number(query.max));
    }
    if (query.category) {
      filtered = filtered.filter(p => p.category === query.category);
    }

    // 2. Пагінація
    const page = Number(query.page || 1);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    products.value = filtered.slice(start, end);
    totalPages.value = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    isLoading.value = false;
  }, 500);
};

// 4. ГОЛОВНИЙ ЕЛЕМЕНТ: Watcher, що реагує на зміни URL
watch(
  () => route.query,
  (newQuery) => {
    // Синхронізуємо стан компонентів (фільтри, сторінка) з URL
    filters.value.search = String(newQuery.search || '');
    filters.value.minPrice = String(newQuery.min || '');
    filters.value.maxPrice = String(newQuery.max || '');
    filters.value.category = String(newQuery.category || '');
    currentPage.value = Number(newQuery.page || 1);

    // Запускаємо завантаження даних
    fetchData(newQuery);
  },
  { immediate: true } // Запускаємо watcher одразу при завантаженні компонента
);
</script>

<style scoped>
.home-view {
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
}
.header {
  text-align: center;
  margin-bottom: 40px;
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
}

/* Створюємо layout з сайдбаром */
.main-layout {
  display: grid;
  grid-template-columns: 280px 1fr; /* Сайдбар 280px, решта - контент */
  gap: 32px;
}

/* Адаптивність */
@media (max-width: 900px) {
  .main-layout {
    grid-template-columns: 1fr; /* На мобільних все в один стовпець */
  }
}
</style>