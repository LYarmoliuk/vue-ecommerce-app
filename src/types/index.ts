// ==========================================
// 1. ПРОДУКТИ ТА КОШИК
// ==========================================

// Базовий тип продукту
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

// ==========================================
// 2. ОФОРМЛЕННЯ ЗАМОВЛЕННЯ (CHECKOUT)
// ==========================================

// Типи для вибору у формі
export type DeliveryMethod = 'mail' | 'postomat' | 'courier';
export type PaymentMethod = 'card' | 'cash';

// Дані форми, яку заповнює користувач
export interface OrderForm {
  fullName: string;
  phone: string;
  deliveryMethod: DeliveryMethod | null;
  paymentMethod: PaymentMethod | null;
}

// Об'єкт, який відправляється на бекенд при створенні замовлення
export interface OrderPayload {
  customer: OrderForm;
  items: CartItem[];
  totalPrice: number;
}

// ==========================================
// 3. КОРИСТУВАЧІ ТА ІСТОРІЯ ЗАМОВЛЕНЬ
// ==========================================

// Користувач
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// Історичне замовлення (те, що приходить з бекенду в "Мої замовлення")
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

// Відгуки
export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ==========================================
// 4. ФІЛЬТРИ ТА ПОШУК
// ==========================================

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

export interface OrderFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

// ==========================================
// 5. API ТА ВІДПОВІДІ
// ==========================================

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: number;
  details?: unknown;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

// ==========================================
// 6. СИСТЕМНІ ТИПИ ТА UTILS
// ==========================================

export interface AppSettings {
  theme: 'light' | 'dark';
  currency: string;
  language: string;
}

export interface Statistics {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

export interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  read: boolean;
  createdAt: string;
}

export interface ImageSizes {
  thumbnail?: string;
  medium?: string;
  large?: string;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
}

export interface LocalStorageCacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface Modal {
  id: string;
  component: unknown;
  props?: Record<string, unknown>;
  open: boolean;
}

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
