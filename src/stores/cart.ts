/**
 * @file Store для управління кошиком
 * @description Керування товарами в кошику з перевіркою доступності та persistence
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem, Product } from '@/types';
import { storage, STORAGE_KEYS } from '@/utils/localStorage';

/**
 * Store для управління кошиком з перевіркою доступності товарів
 */
export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([]);

  /**
   * Завантажує кошик з localStorage при ініціалізації
   * @returns {void}
   */
  const loadFromStorage = (): void => {
    const savedCart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
    items.value = savedCart;

    // Очистити товари, яких немає в наявності
    const validItems = items.value.filter(item => item.product.inStock);
    if (validItems.length !== items.value.length) {
      items.value = validItems;
      saveToStorage();
      console.warn('🛑 Removed out-of-stock items from cart');
    }
  };

  /**
   * Зберігає кошик в localStorage
   * @returns {void}
   */
  const saveToStorage = (): void => {
    storage.set(STORAGE_KEYS.CART, items.value);
  };

  // Getters

  /**
   * Загальна сума кошика
   * @type {ComputedRef<number>}
   */
  const total = computed(() => {
    return items.value.reduce((sum: number, item: CartItem) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  });

  /**
   * Загальна кількість товарів в кошику
   * @type {ComputedRef<number>}
   */
  const totalItems = computed(() => {
    return items.value.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  });

  /**
   * Перевіряє чи товар є в кошику
   * @type {ComputedRef<(productId: number) => boolean>}
   */
  const isInCart = computed(() => (productId: number): boolean => {
    return items.value.some(item => item.product.id === productId);
  });

  /**
   * Отримує кількість товару в кошику
   * @type {ComputedRef<(productId: number) => number>}
   */
  const getItemQuantity = computed(() => (productId: number): number => {
    const item = items.value.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  });

  // Actions

  /**
   * Додає товар в кошик з перевіркою inStock статусу
   * @param {Product} product - Товар для додавання
   * @param {number} [quantity=1] - Кількість товару
   * @param {string} [size] - Розмір товару
   * @param {string} [color] - Колір товару
   * @returns {boolean} true якщо товар додано, false якщо недоступний
   */
  const addToCart = (product: Product, quantity: number = 1, size?: string, color?: string): boolean => {
    // 🔒 ЗАХИСТ: Перевірка чи товар в наявності
    if (!product.inStock) {
      console.warn(`🚫 Cannot add out-of-stock product: ${product.title}`);
      return false;
    }

    const existingItemIndex = items.value.findIndex(
      item => item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
    );

    if (existingItemIndex !== -1) {
      // Якщо товар вже є в кошику, збільшуємо кількість
      const existingItem = items.value[existingItemIndex];
      if (existingItem) {
        existingItem.quantity += quantity;
      }
    } else {
      // Додаємо новий товар в кошик
      items.value.push({
        product,
        quantity,
        selectedSize: size,
        selectedColor: color
      });
    }

    saveToStorage();
    return true;
  };

  /**
   * Видаляє товар з кошика
   * @param {number} productId - ID товару
   * @param {string} [size] - Розмір товару
   * @param {string} [color] - Колір товару
   * @returns {void}
   */
  const removeFromCart = (productId: number, size?: string, color?: string): void => {
    const itemIndex = items.value.findIndex(
      item => item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor === color
    );

    if (itemIndex !== -1) {
      items.value.splice(itemIndex, 1);
      saveToStorage();
    }
  };

  /**
   * Оновлює кількість товару в кошику
   * @param {number} productId - ID товару
   * @param {number} quantity - Нова кількість
   * @param {string} [size] - Розмір товару
   * @param {string} [color] - Колір товару
   * @returns {boolean} true якщо оновлено, false якщо недоступний
   */
  const updateQuantity = (productId: number, quantity: number, size?: string, color?: string): boolean => {
    const item = items.value.find(
      item => item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor === color
    );

    if (item) {
      // 🔒 ЗАХИСТ: Не дозволяємо збільшувати кількість для out-of-stock товарів
      if (quantity > item.quantity && !item.product.inStock) {
        console.warn(`🚫 Cannot increase quantity for out-of-stock product: ${item.product.title}`);
        return false;
      }

      if (quantity <= 0) {
        removeFromCart(productId, size, color);
      } else {
        item.quantity = quantity;
        saveToStorage();
      }
    }
    return true;
  };

  /**
   * Збільшує кількість товару на 1
   * @param {number} productId - ID товару
   * @param {string} [size] - Розмір товару
   * @param {string} [color] - Колір товару
   * @returns {boolean} true якщо оновлено, false якщо недоступний
   */
  const incrementQuantity = (productId: number, size?: string, color?: string): boolean => {
    const item = items.value.find(
      item => item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor === color
    );

    if (item) {
      // 🔒 ЗАХИСТ: Перевірка наявності перед збільшенням
      if (!item.product.inStock) {
        console.warn(`🚫 Cannot increment out-of-stock product: ${item.product.title}`);
        return false;
      }
      item.quantity += 1;
      saveToStorage();
    }
    return true;
  };

  /**
   * Зменшує кількість товару на 1
   * @param {number} productId - ID товару
   * @param {string} [size] - Розмір товару
   * @param {string} [color] - Колір товару
   * @returns {boolean} true якщо оновлено
   */
  const decrementQuantity = (productId: number, size?: string, color?: string): boolean => {
    const item = items.value.find(
      item => item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor === color
    );

    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        saveToStorage();
      } else {
        removeFromCart(productId, size, color);
      }
    }
    return true;
  };

  /**
   * Очищає весь кошик
   * @returns {void}
   */
  const clearCart = (): void => {
    items.value = [];
    storage.remove(STORAGE_KEYS.CART);
  };

  /**
   * Перевіряє всі товари в кошику на доступність
   * @returns {boolean} true якщо всі товари доступні
   */
  const validateCartItems = (): boolean => {
    const invalidItems = items.value.filter(item => !item.product.inStock);

    if (invalidItems.length > 0) {
      console.warn(`🛑 Found ${invalidItems.length} out-of-stock items in cart`);
      // Видалити невалідні товари
      items.value = items.value.filter(item => item.product.inStock);
      saveToStorage();
      return false;
    }

    return true;
  };

  // Ініціалізація - завантажити дані з localStorage
  loadFromStorage();

  return {
    // State
    items,

    // Getters
    total,
    totalItems,
    isInCart,
    getItemQuantity,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    loadFromStorage,
    validateCartItems // 🔒 Експортуємо функцію перевірки
  };
});
