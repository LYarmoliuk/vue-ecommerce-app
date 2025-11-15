export class ApiCache {
  private cache = new Map<string, { data: unknown; timestamp: number }>();
  private defaultTTL = 5 * 60 * 1000; // 5 хвилин

  set(key: string, data: unknown, ttl: number = this.defaultTTL): void {
    this.cache.set(key, { data, timestamp: Date.now() + ttl });
  }

  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }
}

export const globalCache = new ApiCache();
