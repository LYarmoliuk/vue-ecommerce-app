import api from './config';
import type { Category } from '@/types';

// Отримати всі категорії
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<string[]>('/products/categories');

    // Конвертуємо строки в об'єкти Category
    return response.data.map((category, index) => ({
      id: index + 1,
      name: category,
      description: `Products in ${category} category`
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Отримати категорію по ID
export const getCategoryById = async (id: number): Promise<Category> => {
  try {
    const categories = await getCategories();
    const category = categories.find(cat => cat.id === id);

    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }

    return category;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
};

// Отримати категорію по назві
export const getCategoryByName = async (name: string): Promise<Category | undefined> => {
  try {
    const categories = await getCategories();
    return categories.find(cat =>
      cat.name.toLowerCase() === name.toLowerCase()
    );
  } catch (error) {
    console.error(`Error fetching category ${name}:`, error);
    throw error;
  }
};
