/**
 * @file Утиліти для оптимізації продуктивності
 * @description Функції для попереднього завантаження та вимірювання продуктивності
 */

/**
 * Попередньо завантажує зображення для покращення UX
 * @param {string[]} urls - Масив URL зображень для попереднього завантаження
 * @returns {void}
 */
export const preloadImages = (urls: string[]): void => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

/**
 * Вимірює час виконання асинхронної функції
 * @template T
 * @param {() => Promise<T>} fn - Асинхронна функція для вимірювання
 * @param {string} label - Мітка для console.time
 * @returns {Promise<T>} Результат виконання функції
 */
export const measurePerformance = async <T>(fn: () => Promise<T>, label: string): Promise<T> => {
  console.time(label);
  const result = await fn();
  console.timeEnd(label);
  return result;
};
