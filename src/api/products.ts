import type { Product, ProductFilters } from '@/types';
import { mockClothingProducts } from './mockData';

// Тимчасово використовуємо фейкові дані (api не використовується)
export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  try {
    // Імітуємо затримку мережі
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProducts = [...mockClothingProducts];

        // Застосовуємо фільтри
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

        // Фільтрація по назві (пошук)
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

// Отримати товар по ID
export const getProductById = async (id: number): Promise<Product> => {
  const product = mockClothingProducts.find(p => p.id === id);
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
};

// Отримати товари по категорії
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return mockClothingProducts.filter(product =>
    product.category.toLowerCase().includes(category.toLowerCase())
  );
};

// Отримати обмежену кількість товарів
export const getLimitedProducts = async (limit: number = 8, offset: number = 0): Promise<Product[]> => {
  return mockClothingProducts.slice(offset, offset + limit);
};
