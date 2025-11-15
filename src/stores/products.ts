/**
 * @file Store для управління товарами
 * @description Керування списком товарів, фільтрами та пагінацією
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, ProductFilters, Pagination } from '@/types';
import {
  getProductsByCategory,
  getProductsWithCache,
  getProductByIdWithCache
} from '@/api/productsApi';
import { debounce } from '@/utils/debounce';

/**
 * Store для управління товарами з фільтрацією та пагінацією
 */
export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const filters = ref<ProductFilters>({});
  const selectedProduct = ref<Product | null>(null);

  // Пагінація
  const pagination = ref<Pagination>({
    currentPage: 1,
    itemsPerPage: 8,
    totalItems: 0,
    totalPages: 0
  });

  // Getters

  /**
   * Відфільтровані товари з урахуванням поточних фільтрів
   * @type {ComputedRef<Product[]>}
   */
  const filteredProducts = computed(() => {
    let filtered = [...products.value];

    if (filters.value.category) {
      filtered = filtered.filter(product =>
        product.category === filters.value.category
      );
    }

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

    if (filters.value.minRating !== undefined) {
      filtered = filtered.filter(product =>
        product.rating.rate >= filters.value.minRating!
      );
    }

    if (filters.value.inStock !== undefined) {
      filtered = filtered.filter(product =>
        product.inStock === filters.value.inStock
      );
    }

    if (filters.value.searchQuery) {
      const searchLower = filters.value.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

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

  /**
   * Перевіряє доступність товару
   * @param {number} productId - ID товару
   * @returns {boolean} true якщо товар доступний
   */
  const validateProductAvailability = (productId: number): boolean => {
    const product = products.value.find(p => p.id === productId) || selectedProduct.value;
    return product ? product.inStock : false;
  };

  /**
   * Пагиновані товари для поточної сторінки
   * @type {ComputedRef<Product[]>}
   */
  const paginatedProducts = computed(() => {
    const startIndex = (pagination.value.currentPage - 1) * pagination.value.itemsPerPage;
    const endIndex = startIndex + pagination.value.itemsPerPage;
    return filteredProducts.value.slice(startIndex, endIndex);
  });

  // Actions

  /**
   * Завантажує товари з API з кешуванням
   * @async
   * @param {boolean} [forceRefresh=false] - Примусове оновлення даних
   * @returns {Promise<void>}
   */
  const fetchProducts = async (forceRefresh = false): Promise<void> => {
    // Перевірка чи вже є продукти і не потрібно оновлювати
    if (products.value.length > 0 && !forceRefresh) {
      console.log('📦 Products already loaded, skipping API call');
      updatePagination();
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const allProducts = await getProductsWithCache();
      products.value = allProducts;
      updatePagination();
    } catch (err) {
      error.value = 'Не вдалося завантажити товари';
      console.error('Error fetching products:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Завантажує товари за категорією
   * @async
   * @param {string} category - Категорія товарів
   * @returns {Promise<void>}
   */
  const fetchProductsByCategory = async (category: string): Promise<void> => {
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

  /**
   * Завантажує конкретний товар по ID
   * @async
   * @param {number} id - ID товару
   * @returns {Promise<Product>} Об'єкт товару
   * @throws {Error} Помилка завантаження
   */
  const fetchProductById = async (id: number): Promise<Product> => {
    loading.value = true;
    error.value = null;

    try {
      const cachedProduct = products.value.find(p => p.id === id);

      if (cachedProduct) {
        selectedProduct.value = cachedProduct;
        return cachedProduct;
      }

      const product = await getProductByIdWithCache(id);
      selectedProduct.value = product;
      return product;
    } catch (err) {
      error.value = `Не вдалося завантажити товар #${id}`;
      console.error('Error fetching product by id:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Отримує товар з локального стану по ID
   * @param {number} id - ID товару
   * @returns {Product | undefined} Об'єкт товару або undefined
   */
  const getProductFromState = (id: number): Product | undefined => {
    return products.value.find(p => p.id === id);
  };

  /**
   * Застосовує фільтри до списку товарів
   * @param {ProductFilters} newFilters - Нові фільтри
   * @returns {void}
   */
  const applyFilters = (newFilters: ProductFilters): void => {
    console.log('Applying filters:', newFilters);
    filters.value = { ...filters.value, ...newFilters };
    pagination.value.currentPage = 1;
    updatePagination();
  };

  /**
   * Дебаунс версія застосування фільтрів
   * @type {Function}
   */
 // Debounced version - ВИПРАВЛЕНО (правильна типізація)
const debouncedApplyFilters = debounce((newFilters: ProductFilters) => {
  applyFilters(newFilters);
}, 300);

  /**
   * Очищає всі фільтри
   * @returns {void}
   */
  const clearFilters = (): void => {
    filters.value = {};
    pagination.value.currentPage = 1;
    updatePagination();
  };

  /**
   * Встановлює поточну сторінку пагінації
   * @param {number} page - Номер сторінки
   * @returns {void}
   */
  const setPage = (page: number): void => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.currentPage = page;
    }
  };

  /**
   * Переходить на наступну сторінку
   * @returns {void}
   */
  const nextPage = (): void => {
    if (pagination.value.currentPage < pagination.value.totalPages) {
      pagination.value.currentPage++;
    }
  };

  /**
   * Переходить на попередню сторінку
   * @returns {void}
   */
  const previousPage = (): void => {
    if (pagination.value.currentPage > 1) {
      pagination.value.currentPage--;
    }
  };

  /**
   * Оновлює пагінацію на основі відфільтрованих товарів
   * @returns {void}
   */
  const updatePagination = (): void => {
    pagination.value.totalItems = filteredProducts.value.length;
    pagination.value.totalPages = Math.ceil(
      pagination.value.totalItems / pagination.value.itemsPerPage
    );

    if (pagination.value.currentPage > pagination.value.totalPages) {
      pagination.value.currentPage = Math.max(1, pagination.value.totalPages);
    }
  };

  /**
   * Очищає помилки
   * @returns {void}
   */
  const clearError = (): void => {
    error.value = null;
  };

  /**
   * Виводить відлагоджувальну інформацію про товари
   * @returns {void}
   */
  const debugProducts = (): void => {
    console.log('Products in store:', products.value);
    console.log('Filtered products:', filteredProducts.value);
    console.log('Paginated products:', paginatedProducts.value);
    console.log('Pagination:', pagination.value);
  };

  return {
    // State
    products: computed(() => products.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    filters: computed(() => filters.value),
    pagination: computed(() => pagination.value),
    selectedProduct: computed(() => selectedProduct.value),

    // Getters
    filteredProducts,
    paginatedProducts,

    // Actions
    fetchProducts,
    fetchProductsByCategory,
    fetchProductById,
    getProductFromState,
    applyFilters,
    debouncedApplyFilters, // Додано debounced версію
    clearFilters,
    setPage,
    nextPage,
    previousPage,
    clearError,
    updatePagination,
    debugProducts,
    validateProductAvailability
  };
});
