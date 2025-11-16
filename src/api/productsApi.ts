/**
 * @file Продукти API з двохрівневим кешуванням
 * @description Модуль для роботи з товарами з оптимізацією продуктивності
 */

import type { Product, ProductFilters } from '@/types';
import { mockClothingProducts } from './mockData';
import { storage } from '@/utils/localStorage';

/**
 * Інтерфейс для кешованих даних в пам'яті
 * @interface CacheItem
 * @template T
 */
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

/**
 * Кеш для запитів в пам'яті з TTL механізмом
 * @type {Map<string, CacheItem<unknown>>}
 */
const apiCache = new Map<string, CacheItem<unknown>>();

/**
 * Тривалість життя кешу (5 хвилин)
 * @constant {number}
 */
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Ключі для localStorage
 * @constant {Object}
 */
const STORAGE_KEYS = {
  PRODUCTS_CACHE: 'vue-ecommerce-products-cache',
  PRODUCT_CACHE: 'vue-ecommerce-product-cache'
} as const;

/**
 * Інтерфейс для localStorage елементів
 * @interface LocalStorageCacheItem
 * @template T
 */
interface LocalStorageCacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

/**
 * Зберігає дані в localStorage з TTL
 * @template T
 * @param {string} key - Ключ для зберігання
 * @param {T} data - Дані для зберігання
 * @param {number} [ttl=CACHE_DURATION] - Час життя в мілісекундах
 * @returns {void}
 */
const saveToLocalStorage = <T>(key: string, data: T, ttl: number = CACHE_DURATION): void => {
  const item: LocalStorageCacheItem<T> = {
    data,
    timestamp: Date.now(),
    ttl
  };
  storage.set(key, item);
};

/**
 * Отримує дані з localStorage з перевіркою TTL
 * @template T
 * @param {string} key - Ключ для отримання
 * @returns {T | null} Дані або null якщо прострочено
 */
const getFromLocalStorage = <T>(key: string): T | null => {
  // Використовуємо тип, який включає null для defaultValue
  const item = storage.get<LocalStorageCacheItem<T> | null>(key, null);
  if (!item) return null;

  if (Date.now() - item.timestamp > item.ttl) {
    storage.remove(key);
    return null;
  }

  return item.data;
};

/**
 * Генерує ключ кешу для списку товарів
 * @param {ProductFilters} [filters] - Фільтри товарів
 * @returns {string} Унікальний ключ кешу
 */
const generateProductsCacheKey = (filters?: ProductFilters): string => {
  const baseKey = STORAGE_KEYS.PRODUCTS_CACHE;
  return filters ? `${baseKey}_${JSON.stringify(filters)}` : `${baseKey}_all`;
};

/**
 * Генерує ключ кешу для конкретного товару
 * @param {number} id - ID товару
 * @returns {string} Унікальний ключ кешу
 */
const generateProductCacheKey = (id: number): string => {
  return `${STORAGE_KEYS.PRODUCT_CACHE}_${id}`;
};

/**
 * Отримує список товарів з API з підтримкою фільтрації
 * @async
 * @param {ProductFilters} [filters] - Фільтри для товарів
 * @returns {Promise<Product[]>} Масив товарів
 * @throws {Error} Помилка при завантаженні товарів
 */
export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProducts = [...mockClothingProducts];

        if (filters?.category) {
          filteredProducts = filteredProducts.filter(
            product => product.category === filters.category
          );
        }

        if (filters?.minPrice !== undefined) {
          filteredProducts = filteredProducts.filter(
            product => product.price >= filters.minPrice!
          );
        }

        if (filters?.maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(
            product => product.price <= filters.maxPrice!
          );
        }

        if (filters?.searchQuery) {
          filteredProducts = filteredProducts.filter(
            product => product.title.toLowerCase().includes(filters.searchQuery!.toLowerCase())
          );
        }

        resolve(filteredProducts);
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Отримує товар по ID з API
 * @async
 * @param {number} id - ID товару
 * @returns {Promise<Product>} Об'єкт товару
 * @throws {Error} Товар не знайдено
 */
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const product = mockClothingProducts.find(p => p.id === id);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(product);
      }, 300);
    });
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw error;
  }
};

/**
 * Отримує список товарів з двохрівневим кешуванням
 * @async
 * @param {ProductFilters} [filters] - Фільтри для товарів
 * @returns {Promise<Product[]>} Масив товарів
 */
export const getProductsWithCache = async (filters?: ProductFilters): Promise<Product[]> => {
  const cacheKey = generateProductsCacheKey(filters);

  // 1. Перевіряємо кеш в пам'яті
  const memoryCached = apiCache.get(cacheKey) as CacheItem<Product[]> | undefined;
  if (memoryCached && Date.now() - memoryCached.timestamp < CACHE_DURATION) {
    console.log('📦 Returning memory cached products');
    return memoryCached.data;
  }

  // 2. Перевіряємо localStorage
  const localStorageData = getFromLocalStorage<Product[]>(cacheKey);
  if (localStorageData) {
    console.log('💾 Returning localStorage cached products');
    // Зберігаємо також в пам'яті для швидкого доступу
    apiCache.set(cacheKey, { data: localStorageData, timestamp: Date.now() });
    return localStorageData;
  }

  // 3. Якщо немає в кеші - робимо API запит
  console.log('🌐 Making API call for products');
  const data = await getProducts(filters);

  // 4. Зберігаємо в обидва кеші
  apiCache.set(cacheKey, { data, timestamp: Date.now() });
  saveToLocalStorage(cacheKey, data);

  return data;
};

/**
 * Отримує товар по ID з двохрівневим кешуванням
 * @async
 * @param {number} id - ID товару
 * @returns {Promise<Product>} Об'єкт товару
 */
export const getProductByIdWithCache = async (id: number): Promise<Product> => {
  const cacheKey = generateProductCacheKey(id);

  // 1. Перевіряємо кеш в пам'яті
  const memoryCached = apiCache.get(cacheKey) as CacheItem<Product> | undefined;
  if (memoryCached && Date.now() - memoryCached.timestamp < CACHE_DURATION) {
    console.log('📦 Returning memory cached product', id);
    return memoryCached.data;
  }

  // 2. Перевіряємо localStorage
  const localStorageData = getFromLocalStorage<Product>(cacheKey);
  if (localStorageData) {
    console.log('💾 Returning localStorage cached product', id);
    // Зберігаємо також в пам'яті для швидкого доступу
    apiCache.set(cacheKey, { data: localStorageData, timestamp: Date.now() });
    return localStorageData;
  }

  // 3. Якщо немає в кеші - робимо API запит
  console.log('🌐 Making API call for product', id);
  const data = await getProductById(id);

  // 4. Зберігаємо в обидва кеші
  apiCache.set(cacheKey, { data, timestamp: Date.now() });
  saveToLocalStorage(cacheKey, data);

  return data;
};

/**
 * Очищає кеш товарів
 * @returns {void}
 */
export const clearProductsCache = (): void => {
  // Очищаємо пам'ять
  apiCache.clear();

  // Очищаємо localStorage
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(STORAGE_KEYS.PRODUCTS_CACHE) || key.startsWith(STORAGE_KEYS.PRODUCT_CACHE)) {
      storage.remove(key);
    }
  });

  console.log('🗑️ Products cache cleared');
};

/**
 * Отримує статистику кешу
 * @returns {{ memorySize: number; localStorageSize: number }} Статистика кешу
 */
export const getCacheStats = (): { memorySize: number; localStorageSize: number } => {
  const memorySize = apiCache.size;

  let localStorageSize = 0;
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(STORAGE_KEYS.PRODUCTS_CACHE) || key.startsWith(STORAGE_KEYS.PRODUCT_CACHE)) {
      localStorageSize++;
    }
  });

  return { memorySize, localStorageSize };
};

/**
 * Отримує оптимізоване зображення товару
 * @async
 * @param {number} productId - ID товару
 * @param {'thumbnail' | 'medium' | 'large'} [size='medium'] - Розмір зображення
 * @returns {Promise<string>} URL оптимізованого зображення
 */
export const getOptimizedImage = async (productId: number, size: 'thumbnail' | 'medium' | 'large' = 'medium'): Promise<string> => {
  const sizes = {
    thumbnail: '200',
    medium: '400',
    large: '800'
  };

  const product = await getProductByIdWithCache(productId);
  return product.image.replace('400', sizes[size]);
};

/**
 * Отримує галерею зображень товару
 * @async
 * @param {number} productId - ID товару
 * @returns {Promise<string[]>} Масив URL зображень
 */
export const getProductGallery = async (productId: number): Promise<string[]> => {
  const mainProduct = mockClothingProducts.find(p => p.id === productId);

  if (!mainProduct) {
    return [];
  }

  // Якщо є галерея - повертаємо її, інакше створюємо з основного зображення
  if (mainProduct.gallery && mainProduct.gallery.length > 0) {
    return mainProduct.gallery;
  }

  // Запасний варіант - створюємо різні розміри основного зображення
  return [
    mainProduct.image,
    mainProduct.image.replace('1200x', '800x'),
    mainProduct.image.replace('1200x', '600x'),
    mainProduct.image.replace('1200x', '400x')
  ].filter(Boolean);
};

/**
 * Отримує пагіновану галерею зображень товару
 * @async
 * @param {number} productId - ID товару
 * @param {number} [page=1] - Номер сторінки
 * @param {number} [limit=3] - Кількість зображень на сторінці
 * @returns {Promise<string[]>} Масив URL зображень для поточної сторінки
 */
export const getProductGalleryPaginated = async (productId: number, page: number = 1, limit: number = 3): Promise<string[]> => {
  const allImages = await getProductGallery(productId);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return allImages.slice(startIndex, endIndex);
};

/**
 * Отримує товари за категорією
 * @async
 * @param {string} category - Категорія товарів
 * @returns {Promise<Product[]>} Масив товарів
 */
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return mockClothingProducts.filter(product =>
    product.category.toLowerCase().includes(category.toLowerCase())
  );
};

/**
 * Отримує обмежену кількість товарів
 * @async
 * @param {number} [limit=8] - Ліміт товарів
 * @param {number} [offset=0] - Зміщення
 * @returns {Promise<Product[]>} Масив товарів
 */
export const getLimitedProducts = async (limit: number = 8, offset: number = 0): Promise<Product[]> => {
  return mockClothingProducts.slice(offset, offset + limit);
};

/**
 * Тестує продуктивність кешування
 * @async
 * @returns {Promise<void>}
 */
export const testCachePerformance = async (): Promise<void> => {
  console.log('🧪 Testing cache performance...');

  // Перший виклик - має бути повільним
  console.time('First API call');
  await getProductsWithCache();
  console.timeEnd('First API call');

  // Другий виклик - має бути швидким (кеш)
  console.time('Cached API call');
  await getProductsWithCache();
  console.timeEnd('Cached API call');

  // Тест з різними фільтрами
  console.time('Filtered API call');
  await getProductsWithCache({ category: "men's clothing" });
  console.timeEnd('Filtered API call');

  console.time('Cached filtered API call');
  await getProductsWithCache({ category: "men's clothing" });
  console.timeEnd('Cached filtered API call');

  // Перевіряємо статистику кешу
  const stats = getCacheStats();
  console.log('📊 Cache stats:', stats);
};
