import type { Product, ProductFilters } from '@/types';
import { mockClothingProducts } from './mockData';
import { storage } from '@/utils/localStorage';

// Інтерфейс для кешованих даних
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// Кеш для запитів в пам'яті
const apiCache = new Map<string, CacheItem<unknown>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 хвилин

// Ключі для localStorage
const STORAGE_KEYS = {
  PRODUCTS_CACHE: 'vue-ecommerce-products-cache',
  PRODUCT_CACHE: 'vue-ecommerce-product-cache'
} as const;

// Інтерфейс для localStorage елементів
interface LocalStorageCacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Допоміжні функції для localStorage кешу
const saveToLocalStorage = <T>(key: string, data: T, ttl: number = CACHE_DURATION): void => {
  const item: LocalStorageCacheItem<T> = {
    data,
    timestamp: Date.now(),
    ttl
  };
  storage.set(key, item);
};

const getFromLocalStorage = <T>(key: string): T | null => {
  const item = storage.get<LocalStorageCacheItem<T>>(key, null);
  if (!item) return null;

  if (Date.now() - item.timestamp > item.ttl) {
    storage.remove(key);
    return null;
  }

  return item.data;
};

// Генерація ключів для кешу
const generateProductsCacheKey = (filters?: ProductFilters): string => {
  const baseKey = STORAGE_KEYS.PRODUCTS_CACHE;
  return filters ? `${baseKey}_${JSON.stringify(filters)}` : `${baseKey}_all`;
};

const generateProductCacheKey = (id: number): string => {
  return `${STORAGE_KEYS.PRODUCT_CACHE}_${id}`;
};

// Базові функції API
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

// Кешовані версії з двохрівневим кешуванням (пам'ять + localStorage)
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

// Функції для управління кешем
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

// Оптимізації для зображень
export const getOptimizedImage = async (productId: number, size: 'thumbnail' | 'medium' | 'large' = 'medium'): Promise<string> => {
  const sizes = {
    thumbnail: '200',
    medium: '400',
    large: '800'
  };

  const product = await getProductByIdWithCache(productId);
  return product.image.replace('400', sizes[size]);
};

export const getProductGallery = async (productId: number): Promise<string[]> => {
  const mainProduct = mockClothingProducts.find(p => p.id === productId);

  if (!mainProduct) {
    return [];
  }

  return [
    mainProduct.image,
    mainProduct.image.replace('400', '401'),
    mainProduct.image.replace('400', '402'),
    mainProduct.image.replace('400', '403'),
  ];
};

export const getProductGalleryPaginated = async (productId: number, page: number = 1, limit: number = 3): Promise<string[]> => {
  const allImages = await getProductGallery(productId);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return allImages.slice(startIndex, endIndex);
};

// Інші функції
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return mockClothingProducts.filter(product =>
    product.category.toLowerCase().includes(category.toLowerCase())
  );
};

export const getLimitedProducts = async (limit: number = 8, offset: number = 0): Promise<Product[]> => {
  return mockClothingProducts.slice(offset, offset + limit);
};

// Тестові функції для перевірки кешування
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
