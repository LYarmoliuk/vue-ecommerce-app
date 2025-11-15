/**
 * @file Утиліта debounce для оптимізації частотних викликів
 * @description Декоратор для обмеження частоти виклику функцій
 */

/**
 * Дебаунс функція для оптимізації частотних викликів
 * @template T - Тип оригінальної функції
 * @param {T} func - Функція для дебаунсу
 * @param {number} wait - Час очікування в мілісекундах
 * @returns {T} Дебаунснута версія функції з тими самими параметрами
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: number | undefined;

  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};
