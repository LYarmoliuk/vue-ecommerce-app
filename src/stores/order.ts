// --- Новий файл: src/stores/order.ts ---

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useCartStore } from './cart'; // Імпортуємо кошик
import * as orderApi from '@/api/orderApi'; // Помилка зникне після перезапуску IDE
import type { OrderForm, OrderPayload, DeliveryMethod, PaymentMethod } from '@/types';

// Визначаємо початковий стан форми
const initialFormState: OrderForm = {
  fullName: '',
  phone: '',
  deliveryMethod: null,
  paymentMethod: null,
};

export const useOrderStore = defineStore('order', () => {
  // === СТАН (STATE) ===
  const form = ref<OrderForm>({ ...initialFormState });
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Отримуємо доступ до іншого стору (кошика)
  const cartStore = useCartStore();

  // === ДІЇ (ACTIONS) ===

  /**
   * Оновлює поле у формі замовлення
   */
  function updateFormField(
    field: keyof OrderForm,
    value: string | DeliveryMethod | PaymentMethod | null
  ) {
    if (field in form.value) {
      // 2. ЗАМІНЕНО:
      // @ts-expect-error - TS не може звузити тип 'value' до конкретного ключа 'field'
      form.value[field] = value;
    }
  }

  /**
   * Скидає форму до початкового стану
   */
  function resetForm() {
    form.value = { ...initialFormState };
  }

  /**
   * Головна дія: збирає дані та відправляє замовлення
   */
  async function submitOrder(): Promise<boolean> {
    loading.value = true;
    error.value = null;

    if (cartStore.items.length === 0) {
      error.value = 'Кошик порожній. Неможливо оформити замовлення.';
      loading.value = false;
      return false;
    }

    // 1. Готуємо об'єкт для відправки на бекенд
    const orderPayload: OrderPayload = {
      customer: { ...form.value }, // Передаємо копію даних форми
      items: cartStore.items,
      totalPrice: cartStore.total,
    };

    try {
      // 2. Викликаємо наш API
      const response = await orderApi.postOrder(orderPayload);
      console.log('Замовлення успішно відправлено:', response);

      // 3. Успіх: очищуємо кошик та форму
      cartStore.clearCart();
      resetForm();

      return true;

    } catch (err) {
      console.error('Помилка при відправці замовлення:', err);
      error.value = (err as Error).message || 'Сталася невідома помилка.';
      return false;

    } finally {
      loading.value = false;
    }
  }

  return {
    // Стан
    form,
    loading,
    error,

    // Дії
    updateFormField,
    submitOrder,
    resetForm,
  };
});
