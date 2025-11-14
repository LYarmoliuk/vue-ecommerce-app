// Створити utils/performance.ts
export const preloadImages = (urls: string[]): void => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

export const measurePerformance = async <T>(fn: () => Promise<T>, label: string): Promise<T> => {
  console.time(label);
  const result = await fn();
  console.timeEnd(label);
  return result;
};
