<template>
  <div class="home-view">
    <div class="header">
      <h1 class="title">🛍️ Ласкаво просимо до Lino!</h1>
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

        <!-- Додамо перевірку стану завантаження та помилок -->
        <div v-if="productsStore.loading" class="loading-state">
          <p>🔄 Завантаження товарів...</p>
        </div>

        <div v-else-if="productsStore.error" class="error-state">
          <p>❌ Помилка: {{ productsStore.error }}</p>
          <button @click="retryLoading" class="retry-btn">Спробувати знову</button>
        </div>

        <div v-else>
          <!-- Інформація про фільтри та пагінацію -->
          <div class="results-info">
            <p>Знайдено товарів: {{ productsStore.filteredProducts.length }}</p>

          </div>

          <ProductList
            :products="productsStore.paginatedProducts"
            :is-loading="productsStore.loading"
          />

          <Pagination
            v-if="productsStore.pagination.totalPages > 1"
            :current-page="productsStore.pagination.currentPage"
            :total-pages="productsStore.pagination.totalPages"
            @change-page="handlePageChange"
          />
        </div>
      </main>
    </div>

    <!-- Кнопка для дебагу -->
    <button @click="productsStore.debugProducts" class="debug-btn">
      🐛 Debug Products
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import ProductList from '@/components/ProductList.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import Pagination from '@/components/AppPagination.vue';

const route = useRoute();
const router = useRouter();
const productsStore = useProductsStore();

// Фільтри, які будуть зв'язані з FilterPanel
const filters = ref({
  search: '',
  minPrice: '',
  maxPrice: '',
  category: '',
});

// Завантажити товари при старті
onMounted(() => {
  console.log('HomeView mounted - fetching products');
  productsStore.fetchProducts();
});

const retryLoading = () => {
  productsStore.clearError();
  productsStore.fetchProducts();
};

// Обробники подій від дочірніх компонентів
const applyFilters = () => {
  console.log('Applying filters from panel:', filters.value);

  const filtersToApply: {
    searchQuery?: string;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
  } = {};

  if (filters.value.search) {
    filtersToApply.searchQuery = filters.value.search;
  }
  if (filters.value.minPrice) {
    filtersToApply.minPrice = Number(filters.value.minPrice);
  }
  if (filters.value.maxPrice) {
    filtersToApply.maxPrice = Number(filters.value.maxPrice);
  }
  if (filters.value.category) {
    // Перетворюємо значення категорії з FilterPanel у наш формат
    let category = '';
    switch (filters.value.category) {
      case 'men':
        category = "men's clothing";
        break;
      case 'women':
        category = "women's clothing";
        break;
      default:
        category = filters.value.category;
    }
    filtersToApply.category = category;
  }

  productsStore.applyFilters(filtersToApply);
  updateRouterQuery();
};

const clearFilters = () => {
  console.log('Clearing filters');
  filters.value = { search: '', minPrice: '', maxPrice: '', category: '' };
  productsStore.clearFilters();
  productsStore.fetchProducts();
  updateRouterQuery();
};

const handlePageChange = (page: number) => {
  console.log('Page changed to:', page);
  productsStore.setPage(page);
  updateRouterQuery();
};

// Оновлення URL з поточними фільтрами та пагінацією
const updateRouterQuery = () => {
  const query: Record<string, string | number> = {};

  if (filters.value.search) query.search = filters.value.search;
  if (filters.value.minPrice) query.minPrice = filters.value.minPrice;
  if (filters.value.maxPrice) query.maxPrice = filters.value.maxPrice;
  if (filters.value.category) query.category = filters.value.category;
  if (productsStore.pagination.currentPage > 1) query.page = productsStore.pagination.currentPage;

  router.push({ query });
};

// Спостерігач за змінами маршруту для синхронізації з URL
watch(
  () => route.query,
  (newQuery) => {
    console.log('Route query changed:', newQuery);

    // Синхронізуємо фільтри з URL
    filters.value.search = String(newQuery.search || '');
    filters.value.minPrice = String(newQuery.minPrice || '');
    filters.value.maxPrice = String(newQuery.maxPrice || '');
    filters.value.category = String(newQuery.category || '');

    // Застосовуємо фільтри до store
    const filtersToApply: {
      searchQuery?: string;
      minPrice?: number;
      maxPrice?: number;
      category?: string;
    } = {};

    if (newQuery.search) filtersToApply.searchQuery = String(newQuery.search);
    if (newQuery.minPrice) filtersToApply.minPrice = Number(newQuery.minPrice);
    if (newQuery.maxPrice) filtersToApply.maxPrice = Number(newQuery.maxPrice);
    if (newQuery.category) {
      let category = '';
      switch (newQuery.category) {
        case 'men':
          category = "men's clothing";
          break;
        case 'women':
          category = "women's clothing";
          break;
        default:
          category = String(newQuery.category);
      }
      filtersToApply.category = category;
    }

    if (Object.keys(filtersToApply).length > 0) {
      productsStore.applyFilters(filtersToApply);
    } else {
      // Якщо немає фільтрів, завантажуємо всі товари
      productsStore.fetchProducts();
    }

    // Синхронізуємо пагінацію
    if (newQuery.page) {
      productsStore.setPage(Number(newQuery.page));
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.home-view {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 32px;
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

.main-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
  align-items: start;
}

.loading-state, .error-state {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}

.error-state {
  color: #ef4444;
}

.retry-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.results-info {
  margin-bottom: 20px;
  margin-right: 300px;
  padding: 10px;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;
}

.results-info p {
  margin: 5px 0;
  color: #64748b;
}

.debug-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 8px 12px;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  z-index: 1000;
}

.debug-btn:hover {
  background: #7c3aed;
}

@media (max-width: 900px) {
  .main-layout {
    grid-template-columns: 1fr;
  }

  .debug-btn {
    bottom: 10px;
    right: 10px;
  }
}
</style>
