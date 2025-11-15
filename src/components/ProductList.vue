<template>
  <div class="product-list-container">
    <!-- Loading State with Skeletons -->
    <div v-if="isLoading" class="loading-container">
      <div class="skeleton-grid">
        <div v-for="n in 6" :key="n" class="skeleton-product-card">
          <div class="skeleton-image-container">
            <div class="skeleton-image" aria-hidden="true"></div>
          </div>
          <div class="skeleton-info">
            <div class="skeleton-title" aria-hidden="true"></div>
            <div class="skeleton-category" aria-hidden="true"></div>
            <div class="skeleton-meta">
              <div class="skeleton-price" aria-hidden="true"></div>
              <div class="skeleton-rating" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="sr-only" role="status" aria-live="polite">
        Завантаження товарів
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="no-products">
      <div class="empty-state">
        <div class="empty-icon" aria-hidden="true">📦</div>
        <h3 class="empty-title">Товарів не знайдено</h3>
        <p class="empty-description">Спробуйте змінити параметри пошуку або фільтри</p>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="product-grid" role="list" aria-label="Список товарів">
      <article
        v-for="(product, index) in products"
        :key="product.id"
        class="product-card"
        @click="goToProduct(product.id)"
        @keydown.enter="goToProduct(product.id)"
        @keydown.space="goToProduct(product.id)"
        tabindex="0"
        role="listitem"
        :aria-label="`Товар: ${product.title}. Ціна: $${product.price}. Рейтинг: ${product.rating.rate} з 5 зірок на основі ${product.rating.count} відгуків. ${!product.inStock ? 'Немає в наявності' : ''}`"
        :aria-posinset="index + 1"
        :aria-setsize="products.length"
      >
        <div class="product-image-container">
          <img
            :src="product.image"
            :alt="`Зображення товару: ${product.title}`"
            class="product-image"
            @error="handleImageError"
            loading="lazy"
            width="300"
            height="200"
          />
          <div class="product-overlay">
            <button
              class="quick-view-btn"
              @click.stop="goToProduct(product.id)"
              :aria-label="`Швидкий перегляд товару: ${product.title}`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Швидкий перегляд
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.title }}</h3>
          <p class="product-category">{{ formatCategory(product.category) }}</p>
          <div class="product-meta">
            <p class="product-price">
              <span class="sr-only">Ціна:</span>
              ${{ product.price }}
            </p>
            <p class="product-rating">
              <span class="rating-stars" aria-hidden="true">⭐</span>
              <span class="sr-only">Рейтинг: {{ product.rating.rate }} з 5 зірок на основі {{ product.rating.count }} відгуків</span>
              <span aria-hidden="true">{{ product.rating.rate }} ({{ product.rating.count }})</span>
            </p>
          </div>
          <p
            v-if="!product.inStock"
            class="out-of-stock"
            role="status"
            aria-live="polite"
          >
            Немає в наявності
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '@/types';

defineProps<{
  products: Product[];
  isLoading: boolean;
}>();

const router = useRouter()

const goToProduct = (productId: number) => {
  router.push(`/product/${productId}`)
}

const formatCategory = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    "men's clothing": "Чоловічий одяг",
    "women's clothing": "Жіночий одяг",
    "electronics": "Електроніка",
    "jewelery": "Ювелірні вироби"
  };
  return categoryMap[category] || category;
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://via.placeholder.com/300x400/cccccc/969696?text=No+Image';
  target.alt = 'Зображення товару недоступне';
};
</script>

<style scoped>
/* ==================== */
/* SCREEN READER ONLY */
/* ==================== */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ==================== */
/* SKELETON LOADING STATES */
/* ==================== */
.loading-container {
  padding: 2rem 0;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.skeleton-product-card {
  background: #fff;
  border: 2px solid #f1f5f9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.skeleton-image-container {
  position: relative;
  overflow: hidden;
  background: #f8fafc;
}

.skeleton-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-info {
  padding: 16px;
}

.skeleton-title {
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 8px;
}

.skeleton-category {
  height: 16px;
  width: 70%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 12px;
}

.skeleton-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skeleton-price {
  height: 24px;
  width: 60px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-rating {
  height: 20px;
  width: 80px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* ==================== */
/* EMPTY STATE */
/* ==================== */
.no-products {
  padding: 4rem 2rem;
}

.empty-state {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
  animation: float 3s ease-in-out infinite;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-description {
  color: #6b7280;
  line-height: 1.5;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* ==================== */
/* PRODUCT GRID */
/* ==================== */
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.product-card {
  border: 2px solid #f1f5f9;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
}

/* ==================== */
/* HOVER ЕФЕКТИ КАРТКИ */
/* ==================== */
.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 2px rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
}

.product-card:active {
  transform: translateY(-4px) scale(1.01);
  transition-duration: 0.1s;
}

/* ==================== */
/* FOCUS STATE ДЛЯ ДОСТУПНОСТІ */
/* ==================== */
.product-card:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 4px;
  transform: translateY(-4px);
  box-shadow:
    0 15px 20px -5px rgba(0, 0, 0, 0.1),
    0 0 0 2px rgba(102, 126, 234, 0.2);
}

/* Покращений focus для всіх інтерактивних елементів */
button:focus-visible,
.product-card:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 2px;
}

/* ==================== */
/* КОНТЕЙНЕР ЗОБРАЖЕННЯ */
/* ==================== */
.product-image-container {
  position: relative;
  overflow: hidden;
  background: #f8fafc;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image {
  transform: scale(1.08);
  filter: brightness(1.05);
}

/* ==================== */
/* OVERLAY ДЛЯ ШВИДКОГО ПЕРЕГЛЯДУ */
/* ==================== */
.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(102, 126, 234, 0.9) 0%,
    rgba(118, 75, 162, 0.8) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.quick-view-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  border: none;
  padding: 12px 20px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.product-card:hover .quick-view-btn {
  transform: translateY(0);
}

.quick-view-btn:hover {
  background: white;
  color: #764ba2;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.quick-view-btn:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
  background: white;
}

/* ==================== */
/* ІНФОРМАЦІЯ ПРО ТОВАР */
/* ==================== */
.product-info {
  padding: 16px;
}

.product-name {
  font-size: 1.15rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.product-card:hover .product-name {
  color: #667eea;
}

.product-category {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 12px;
  text-transform: capitalize;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #3b82f6;
  margin: 0;
  transition: color 0.3s ease;
}

.product-card:hover .product-price {
  color: #667eea;
}

.product-rating {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-stars {
  color: #f59e0b;
  filter: drop-shadow(0 1px 2px rgba(245, 158, 11, 0.3));
}

.out-of-stock {
  font-size: 0.8rem;
  color: #ef4444;
  margin: 8px 0 0;
  font-weight: 500;
}

/* ==================== */
/* АДАПТИВНІ СТИЛІ */
/* ==================== */
@media (max-width: 1024px) {
  .product-grid,
  .skeleton-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .product-grid,
  .skeleton-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .product-image,
  .skeleton-image {
    height: 180px;
  }

  .product-card:hover {
    transform: translateY(-4px) scale(1.01);
  }

  .quick-view-btn {
    padding: 10px 16px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .product-grid,
  .skeleton-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .product-card,
  .skeleton-product-card {
    border-radius: 12px;
  }

  .product-info,
  .skeleton-info {
    padding: 12px;
  }

  .empty-icon {
    font-size: 3rem;
  }

  .empty-title {
    font-size: 1.25rem;
  }

  /* Менш інтенсивні ефекти на мобільних */
  .product-card:active {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
  }
}

/* ==================== */
/* ACCESSIBILITY IMPROVEMENTS */
/* ==================== */
@media (prefers-reduced-motion: reduce) {
  .product-card,
  .product-image,
  .product-overlay,
  .quick-view-btn,
  .skeleton-image,
  .skeleton-title,
  .skeleton-category,
  .skeleton-price,
  .skeleton-rating,
  .empty-icon {
    transition: none;
    animation: none;
  }

  .product-card:hover,
  .product-card:active {
    transform: none;
  }

  .skeleton-image,
  .skeleton-title,
  .skeleton-category,
  .skeleton-price,
  .skeleton-rating {
    background: #f0f0f0;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .product-card {
    border-color: #000;
  }

  .product-price {
    color: #000;
  }

  .out-of-stock {
    color: #c00;
  }
}

/* ==================== */
/* ПЛАВНІ ПЕРЕХОДИ ДЛЯ ВСІХ ІНТЕРАКТИВНИХ ЕЛЕМЕНТІВ */
/* ==================== */
.product-card,
.product-image,
.product-overlay,
.quick-view-btn,
.product-name,
.product-price {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-overlay,
.product-card:hover .quick-view-btn {
  transition-duration: 0.4s;
}
</style>
