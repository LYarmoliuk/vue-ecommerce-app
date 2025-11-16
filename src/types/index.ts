// Базові типи для продуктів
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  gallery?: string[];
  rating: {
    rate: number;
    count: number;
  };
  size?: string;
  color?: string;
  inStock: boolean;
  brand?: string;
  material?: string;
}

// Фільтри для продуктів
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  searchQuery?: string;
  sortBy?: 'price' | 'rating' | 'name';
  sortOrder?: 'asc' | 'desc';
}

// Пагінація
export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// Елемент кошика
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

// Категорії
export interface Category {
  id: number;
  name: string;
  description: string;
}

// Стан завантаження
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

// Користувач (якщо буде авторизація)
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// Замовлення
export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  shippingAddress?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

// Відгуки про товари
export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Налаштування сайту
export interface AppSettings {
  theme: 'light' | 'dark';
  currency: string;
  language: string;
}

// Відповідь API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Помилка API
export interface ApiError {
  message: string;
  code: number;
  details?: unknown;
}

// Фільтри для історії замовлень
export interface OrderFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

// Статистика
export interface Statistics {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

// Нотифікації
export interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  read: boolean;
  createdAt: string;
}

// Додати до існуючих типів
export interface ImageSizes {
  thumbnail?: string;
  medium?: string;
  large?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
}
// Додати в @/types/index.ts
export interface ImageSizes {
  thumbnail?: string;
  medium?: string;
  large?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}
// Модальні вікна
export interface Modal {
  id: string;
  component: unknown; // Замінили any на unknown
  props?: Record<string, unknown>;
  open: boolean;
}

// Конфігурація сайту
export interface SiteConfig {
  name: string;
  description: string;
  logo: string;
  favicon: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}
export interface LocalStorageCacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}
