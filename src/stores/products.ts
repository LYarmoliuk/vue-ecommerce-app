import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product, ProductFilters, Category } from '@/types';
import { getProducts, getProductById, getProductsByCategory, searchProducts } from '@/api/products';
import { getCategories } from '@/api/categories';

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const categories = ref<Category[]>([]);
  const currentProduct = ref<Product | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Отримати всі товари
  const fetchProducts = async (filters?: ProductFilters) => {
    loading.value = true;
    error.value = null;

    try {
      products.value = await getProducts(filters);
    } catch (err) {
      error.value = 'Failed to fetch products';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Отримати товар по ID
  const fetchProductById = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      currentProduct.value = await getProductById(id);
    } catch (err) {
      error.value = `Failed to fetch product ${id}`;
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Отримати товари по категорії
  const fetchProductsByCategory = async (category: string) => {
    loading.value = true;
    error.value = null;

    try {
      products.value = await getProductsByCategory(category);
    } catch (err) {
      error.value = `Failed to fetch products for category ${category}`;
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Отримати категорії
  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;

    try {
      categories.value = await getCategories();
    } catch (err) {
      error.value = 'Failed to fetch categories';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Пошук товарів
  const searchProductsByQuery = async (query: string) => {
    loading.value = true;
    error.value = null;

    try {
      products.value = await searchProducts(query);
    } catch (err) {
      error.value = 'Failed to search products';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Очистити помилку
  const clearError = () => {
    error.value = null;
  };

  return {
    products,
    categories,
    currentProduct,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchProductsByCategory,
    fetchCategories,
    searchProductsByQuery,
    clearError,
  };
});
