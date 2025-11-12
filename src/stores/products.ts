import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, ProductFilters, Pagination } from '@/types';
import { getProducts, getProductsByCategory } from '@/api/productsApi';

export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const filters = ref<ProductFilters>({});

  // Пагінація
  const pagination = ref<Pagination>({
    currentPage: 1,
    itemsPerPage: 8, // Зменшимо для демонстрації пагінації
    totalItems: 0,
    totalPages: 0
  });

  // Додай цей метод для дебагу
  const debugProducts = () => {
    console.log('Products in store:', products.value);
    console.log('Filtered products:', filteredProducts.value);
    console.log('Paginated products:', paginatedProducts.value);
    console.log('Pagination:', pagination.value);
  };

  // Getters
  const filteredProducts = computed(() => {
    let filtered = [...products.value];

    // Фільтрація по категорії
    if (filters.value.category) {
      filtered = filtered.filter(product =>
        product.category === filters.value.category
      );
    }

    // Фільтрація по ціні
    if (filters.value.minPrice !== undefined) {
      filtered = filtered.filter(product =>
        product.price >= filters.value.minPrice!
      );
    }

    if (filters.value.maxPrice !== undefined) {
      filtered = filtered.filter(product =>
        product.price <= filters.value.maxPrice!
      );
    }

    // Фільтрація по рейтингу
    if (filters.value.minRating !== undefined) {
      filtered = filtered.filter(product =>
        product.rating.rate >= filters.value.minRating!
      );
    }

    // Фільтрація по наявності
    if (filters.value.inStock !== undefined) {
      filtered = filtered.filter(product =>
        product.inStock === filters.value.inStock
      );
    }

    // Фільтрація по пошуковому запиту
    if (filters.value.searchQuery) {
      const searchLower = filters.value.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    // Сортування
    if (filters.value.sortBy) {
      filtered.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (filters.value.sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.rating.rate;
            bValue = b.rating.rate;
            break;
          case 'name':
            aValue = a.title;
            bValue = b.title;
            break;
          default:
            return 0;
        }

        if (filters.value.sortOrder === 'desc') {
          return aValue > bValue ? -1 : 1;
        }
        return aValue < bValue ? -1 : 1;
      });
    }

    return filtered;
  });

  const paginatedProducts = computed(() => {
    const startIndex = (pagination.value.currentPage - 1) * pagination.value.itemsPerPage;
    const endIndex = startIndex + pagination.value.itemsPerPage;
    return filteredProducts.value.slice(startIndex, endIndex);
  });

  // Actions
  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const allProducts = await getProducts();
      products.value = allProducts;
      updatePagination();
      console.log('Products loaded:', allProducts.length);
    } catch (err) {
      error.value = 'Не вдалося завантажити товари';
      console.error('Error fetching products:', err);
    } finally {
      loading.value = false;
    }
  };

  const fetchProductsByCategory = async (category: string) => {
    loading.value = true;
    error.value = null;

    try {
      products.value = await getProductsByCategory(category);
      updatePagination();
    } catch (err) {
      error.value = `Не вдалося завантажити товари для категорії ${category}`;
      console.error('Error fetching products by category:', err);
    } finally {
      loading.value = false;
    }
  };

  const applyFilters = (newFilters: ProductFilters) => {
    console.log('Applying filters:', newFilters);
    filters.value = { ...filters.value, ...newFilters };
    pagination.value.currentPage = 1;
    updatePagination();
  };

  const clearFilters = () => {
    filters.value = {};
    pagination.value.currentPage = 1;
    updatePagination();
  };

  const setPage = (page: number) => {
    console.log('Setting page to:', page);
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.currentPage = page;
    }
  };

  const nextPage = () => {
    if (pagination.value.currentPage < pagination.value.totalPages) {
      pagination.value.currentPage++;
    }
  };

  const previousPage = () => {
    if (pagination.value.currentPage > 1) {
      pagination.value.currentPage--;
    }
  };

  const updatePagination = () => {
    pagination.value.totalItems = filteredProducts.value.length;
    pagination.value.totalPages = Math.ceil(
      pagination.value.totalItems / pagination.value.itemsPerPage
    );

    // Корекція поточної сторінки, якщо вона виходить за межі
    if (pagination.value.currentPage > pagination.value.totalPages) {
      pagination.value.currentPage = Math.max(1, pagination.value.totalPages);
    }

    console.log('Pagination updated:', {
      currentPage: pagination.value.currentPage,
      totalPages: pagination.value.totalPages,
      totalItems: pagination.value.totalItems
    });
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    products: computed(() => products.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    filters: computed(() => filters.value),
    pagination: computed(() => pagination.value),

    // Getters
    filteredProducts,
    paginatedProducts,

    // Actions
    fetchProducts,
    fetchProductsByCategory,
    applyFilters,
    clearFilters,
    setPage,
    nextPage,
    previousPage,
    clearError,
    updatePagination,
    debugProducts
  };
});
