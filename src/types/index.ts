// Тип товару
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  size?: string;
  color?: string;
  inStock: boolean;
}

// Тип категорії
export interface Category {
  id: number;
  name: string;
  image?: string;
  description?: string;
}

// Тип фільтрів для товарів
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  sizes?: string[];
  colors?: string[];
  sortBy?: 'price' | 'rating' | 'name';
  sortOrder?: 'asc' | 'desc';
}

// Тип для пагінації
export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
