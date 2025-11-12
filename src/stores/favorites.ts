import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '@/types';
import { storage, STORAGE_KEYS } from '@/utils/localStorage';

export const useFavoritesStore = defineStore('favorites', () => {
  // State
  const favorites = ref<Product[]>([]);

  // Завантажити улюблені з localStorage при ініціалізації
  const loadFromStorage = () => {
    const savedFavorites = storage.get<Product[]>(STORAGE_KEYS.FAVORITES, []);
    favorites.value = savedFavorites;
  };

  // Зберегти улюблені в localStorage
  const saveToStorage = () => {
    storage.set(STORAGE_KEYS.FAVORITES, favorites.value);
  };

  // Getters
  const isFavorite = (productId: number) => {
    return favorites.value.some(product => product.id === productId);
  };

  const favoritesCount = () => {
    return favorites.value.length;
  };

  // Actions
  const addToFavorites = (product: Product) => {
    if (!isFavorite(product.id)) {
      favorites.value.push(product);
      saveToStorage();
    }
  };

  const removeFromFavorites = (productId: number) => {
    const index = favorites.value.findIndex(product => product.id === productId);
    if (index !== -1) {
      favorites.value.splice(index, 1);
      saveToStorage();
    }
  };

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const clearFavorites = () => {
    favorites.value = [];
    storage.remove(STORAGE_KEYS.FAVORITES);
  };

  // Ініціалізація - завантажити дані з localStorage
  loadFromStorage();

  return {
    // State
    favorites,

    // Getters
    isFavorite,
    favoritesCount,

    // Actions
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
    loadFromStorage
  };
});
