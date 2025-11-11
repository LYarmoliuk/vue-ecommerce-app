import api from './config';
import type { Product, ProductFilters } from '@/types';

// Отримати всі товари
export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();

    if (filters?.category) {
      params.append('category', filters.category);
    }
    if (filters?.minPrice) {
      params.append('minPrice', filters.minPrice.toString());
    }
    if (filters?.maxPrice) {
      params.append('maxPrice', filters.maxPrice.toString());
    }

    const response = await api.get<Product[]>(`/products?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Отримати товар по ID
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Отримати товари по категорії
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

// Отримати обмежену кількість товарів (для пагінації)
export const getLimitedProducts = async (limit: number = 10): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(`/products?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching limited products:', error);
    throw error;
  }
};

// Пошук товарів
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const allProducts = await getProducts();
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
