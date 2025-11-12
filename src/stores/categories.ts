import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Category } from '@/types';
import { getCategories } from '@/api/categories';

export const useCategoriesStore = defineStore('categories', () => {
  // State
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Actions
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

  const getCategoryById = (id: number): Category | undefined => {
    return categories.value.find(category => category.id === id);
  };

  const getCategoryByName = (name: string): Category | undefined => {
    return categories.value.find(category =>
      category.name.toLowerCase() === name.toLowerCase()
    );
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    categories,
    loading,
    error,

    // Actions
    fetchCategories,
    getCategoryById,
    getCategoryByName,
    clearError
  };
});
