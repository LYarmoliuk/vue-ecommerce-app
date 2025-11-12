import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, ProductFilters, Pagination } from '@/types';
import { getProducts, getProductsByCategory } from '@/api/products';

export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const filters = ref<ProductFilters>({});

  // Пагінація
  const pagination = ref<Pagination>({
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
    totalPages: 0
  });

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
      products.value = await getProducts();
      updatePagination();
    } catch (err) {
      error.value = 'Failed to fetch products';
      console.error(err);
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
      error.value = `Failed to fetch products for category ${category}`;
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const applyFilters = (newFilters: ProductFilters) => {
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
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    products,
    loading,
    error,
    filters,
    pagination,

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
    updatePagination
  };
});
