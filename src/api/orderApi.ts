// --- Виправлений файл: src/api/orderApi.ts ---

import type { OrderPayload } from '@/types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import api from './config';

/**
 * Надсилає дані замовлення на сервер
 * @param orderData Об'єкт замовлення
 */
export async function postOrder(orderData: OrderPayload) {
  // 2. Використовуємо 'api.post' замість 'fetch' або 'API_URL'.
  // 'baseURL' ('https://fakestoreapi.com') вже вбудований в 'api'.
  // Ми просто вказуємо кінцеву точку (endpoint), наприклад '/orders'.

  console.log('Відправка замовлення на API:', orderData);

  // --- Імітація (як і раніше) ---
  // (Оскільки 'fakestoreapi.com' насправді не прийме наше замовлення,
  // ми залишаємо імітацію, але тепер ми знаємо,
  // що реальний запит буде виглядати як у блоці "реального запиту")
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!orderData.customer.fullName || orderData.items.length === 0) {
    throw new Error('Помилка валідації: імя або кошик порожні.');
  }
  const response = { success: true, orderId: Math.floor(Math.random() * 10000) };
  console.log('Імітована відповідь:', response);
  return response;

  /*
  // --- Приклад РЕАЛЬНОГО запиту з вашим 'api' ---
  try {
    // 3. 'api.post' приймає кінцеву точку ('/orders') та дані
    const response = await api.post('/orders', orderData);

    // axios автоматично загортає відповідь у поле 'data'
    return response.data;

  } catch (error) {
    // Ваш інтерцептор в config.ts вже залогує деталі помилки
    console.error('Помилка в postOrder:', error);

    // Перекидаємо помилку, щоб orderStore міг її зловити
    // і показати користувачеві
    throw new Error('Не вдалося надіслати замовлення.');
  }
  */
}
