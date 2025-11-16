<template>
  <div class="product-detail">
    <div class="container">
      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb" aria-label="Навігаційний шлях">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item">
            <router-link
              to="/"
              class="breadcrumb-link"
              aria-label="Перейти на головну сторінку"
            >
              Головна
            </router-link>
          </li>
          <li class="breadcrumb-separator" aria-hidden="true">/</li>
          <li class="breadcrumb-item">
            <span :aria-current="!loading && !error ? 'page' : undefined">
              {{ product?.title || 'Завантаження...' }}
            </span>
          </li>
        </ol>
      </nav>

      <!-- Loading State -->
      <div v-if="loading" class="loading" role="status" aria-live="polite">
        <div class="skeleton-layout">
          <div class="skeleton-gallery">
            <div class="skeleton-main-image" aria-hidden="true"></div>
            <div class="skeleton-thumbnails">
              <div v-for="n in 4" :key="n" class="skeleton-thumbnail" aria-hidden="true"></div>
            </div>
          </div>
          <div class="skeleton-info">
            <div class="skeleton-title" aria-hidden="true"></div>
            <div class="skeleton-category" aria-hidden="true"></div>
            <div class="skeleton-price" aria-hidden="true"></div>
            <div class="skeleton-rating" aria-hidden="true"></div>
            <div class="skeleton-description" aria-hidden="true"></div>
            <div class="skeleton-description" aria-hidden="true" style="width: 70%"></div>
            <div class="skeleton-buttons">
              <div class="skeleton-button" aria-hidden="true"></div>
              <div class="skeleton-button" aria-hidden="true"></div>
            </div>
          </div>
        </div>
        <p class="sr-only">Завантаження деталей товару...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error" role="alert" aria-live="assertive">
        <h2 class="error-title">Помилка завантаження</h2>
        <p>{{ error }}</p>
        <button
          @click="retryLoading"
          class="retry-btn"
          aria-label="Спробувати завантажити товар ще раз"
        >
          Спробувати знову
        </button>
      </div>

      <!-- Not Found State -->
      <div v-else-if="!product && !loading" class="not-found" role="alert">
        <h2>Товар не знайдено</h2>
        <p>На жаль, ми не можемо знайти цей товар.</p>
        <router-link
          to="/"
          class="back-link"
          aria-label="Повернутися до списку товарів"
        >
          ← Повернутися до магазину
        </router-link>
      </div>

      <!-- Product Content -->
      <main v-else-if="product" class="product-content">
        <div class="product-layout">
          <!-- Gallery Section -->
          <section class="gallery-section" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" class="sr-only">Галерея зображень товару</h2>
            <div class="main-image">
              <img
  :src="currentImage"
  :alt="`Основне зображення товару: ${product.title}`"
  class="product-main-image"
  @error="handleImageError($event, 'main')"
  loading="eager"
  width="600"
  height="500"
/>
            </div>
            <div class="image-thumbnails" role="list" aria-label="Мініатюри зображень">
              <button
                v-for="(image, index) in galleryImages"
                :key="index"
                class="thumbnail"
                :class="{ active: currentImage === image }"
                @click="currentImage = image"
                @keydown.enter="currentImage = image"
                @keydown.space="currentImage = image"
                :aria-label="`Переглянути фото ${index + 1} з ${galleryImages.length} товару ${product.title}`"
                :aria-current="currentImage === image ? 'true' : 'false'"
                role="listitem"
                tabindex="0"
              >
                <img
  :src="image"
  :alt="`${product.title} - мініатюра ${index + 1}`"
  width="80"
  height="80"
  loading="lazy"
  @error="handleImageError($event, 'thumbnail')"
/>
              </button>
            </div>
          </section>

          <!-- Product Info Section -->
          <section class="info-section" aria-labelledby="product-info-heading">
            <h1 id="product-info-heading" class="product-title">{{ product.title }}</h1>

            <p class="product-category">
              <span class="sr-only">Категорія:</span>
              {{ formatCategory(product.category) }}
            </p>

            <p class="product-price">
              <span class="sr-only">Ціна:</span>
              ${{ product.price }}
            </p>

            <div class="product-rating" role="img" :aria-label="`Рейтинг: ${product.rating.rate} з 5 зірок на основі ${product.rating.count} відгуків`">
              <span aria-hidden="true">⭐ {{ product.rating.rate }} ({{ product.rating.count }} відгуків)</span>
            </div>

            <div class="product-description">
              <h2>Опис товару</h2>
              <p>{{ product.description }}</p>
            </div>

            <div class="additional-info">
              <h3 class="sr-only">Додаткова інформація про товар</h3>
              <div v-if="product.brand" class="info-item">
                <strong>Бренд:</strong> {{ product.brand }}
              </div>
              <div v-if="product.material" class="info-item">
                <strong>Матеріал:</strong> {{ product.material }}
              </div>
              <div class="info-item">
                <strong>Наявність:</strong>
                <span
                  :class="product.inStock ? 'in-stock' : 'out-of-stock'"
                  role="status"
                  :aria-live="product.inStock ? 'polite' : 'assertive'"
                >
                  {{ product.inStock ? 'Є в наявності' : 'Немає в наявності' }}
                </span>
              </div>
            </div>

            <div class="action-buttons">
              <button
                @click="addToCart"
                class="add-to-cart-btn"
                :disabled="!product.inStock || addingToCart"
                :aria-label="product.inStock ? `Додати ${product.title} до кошика` : 'Товар недоступний для додавання в кошик'"
                :aria-busy="addingToCart"
              >
                <span v-if="addingToCart" aria-hidden="true">⏳</span>
                <span v-else aria-hidden="true">🛒</span>
                {{ addingToCart ? 'Додаємо...' : (product.inStock ? 'Додати в кошик' : '❌ Немає в наявності') }}
              </button>

              <button
                @click="toggleFavorite"
                class="add-to-wishlist-btn"
                :aria-label="isFavorite ? `Видалити ${product.title} з улюблених` : `Додати ${product.title} до улюблених`"
                :aria-pressed="isFavorite"
              >
                <span aria-hidden="true">{{ isFavorite ? '💔' : '❤️' }}</span>
                {{ isFavorite ? 'Видалити з улюблених' : 'Додати в улюблене' }}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { useFavoritesStore } from '@/stores/favorites';
import { getProductGallery } from '@/api/productsApi';

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const loading = ref(false);
const error = ref<string | null>(null);
const currentImage = ref('');
const galleryImages = ref<string[]>([]);
const addingToCart = ref(false);

const productId = computed(() => Number(route.params.id));
const product = computed(() => productsStore.selectedProduct);

const isFavorite = computed(() => {
  return favoritesStore.isFavorite(productId.value);
});

const formatCategory = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    "men's clothing": "Чоловічий одяг",
    "women's clothing": "Жіночий одяг",
    "electronics": "Електроніка",
    "jewelery": "Ювелірні вироби"
  };
  return categoryMap[category] || category;
};

const loadProduct = async () => {
  loading.value = true;
  error.value = null;

  try {
    const productData = await productsStore.fetchProductById(productId.value);
    if (productData) {
      galleryImages.value = await getProductGallery(productId.value);
      currentImage.value = galleryImages.value[0] || productData.image;
    }
  } catch (err) {
    error.value = 'Не вдалося завантажити товар. Будь ласка, спробуйте пізніше.';
    console.error('Error loading product:', err);
  } finally {
    loading.value = false;
  }
};

const addToCart = async () => {
  if (!product.value || !product.value.inStock) return;

  addingToCart.value = true;

  try {
    const success = cartStore.addToCart(product.value, 1);
    if (success) {
      // Можна додати візуальний фідбек замість alert
      console.log('Товар додано до кошика!');
    } else {
      console.error('Не вдалося додати товар');
    }
  } catch (err) {
    console.error('Помилка при додаванні до кошика:', err);
  } finally {
    addingToCart.value = false;
  }
};

const toggleFavorite = () => {
  if (!product.value) return;

  if (isFavorite.value) {
    favoritesStore.removeFromFavorites(product.value.id);
  } else {
    favoritesStore.addToFavorites(product.value);
  }
};

const handleImageError = (event: Event, imageType: 'main' | 'thumbnail' = 'main') => {
  const target = event.target as HTMLImageElement;

  // Різні placeholder для різних типів зображень
  if (imageType === 'main') {
    target.src = 'https://via.placeholder.com/600x500/cccccc/969696?text=Зображення+недоступне';
  } else {
    target.src = 'https://via.placeholder.com/80x80/cccccc/969696?text=Фото';
  }

  target.alt = 'Зображення товару недоступне';
};

const retryLoading = () => {
  loadProduct();
};

onMounted(() => {
  loadProduct();
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadProduct();
    }
  }
);
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

.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* ==================== */
/* BREADCRUMB */
/* ==================== */
.breadcrumb {
  margin-bottom: 2rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
}

.breadcrumb-link {
  color: #3b82f6;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
  padding: 4px 8px;
  margin: -4px -8px;
}

.breadcrumb-link:hover {
  color: #2563eb;
  background: rgba(59, 130, 246, 0.1);
  text-decoration: none;
  transform: translateY(-1px);
}

.breadcrumb-link:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* ==================== */
/* SKELETON LOADING */
/* ==================== */
.skeleton-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.skeleton-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-main-image {
  width: 100%;
  height: 500px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 16px;
}

.skeleton-thumbnails {
  display: flex;
  gap: 0.75rem;
}

.skeleton-thumbnail {
  width: 80px;
  height: 80px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 8px;
}

.skeleton-info {
  padding: 1rem 0;
}

.skeleton-title {
  height: 32px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 6px;
  margin-bottom: 12px;
}

.skeleton-category {
  height: 20px;
  width: 120px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 16px;
}

.skeleton-price {
  height: 40px;
  width: 100px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 6px;
  margin-bottom: 16px;
}

.skeleton-rating {
  height: 24px;
  width: 150px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 24px;
}

.skeleton-description {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 8px;
}

.skeleton-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.skeleton-button {
  height: 60px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 12px;
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
/* LOADING & ERROR STATES */
/* ==================== */
.loading, .error, .not-found {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
}

.error {
  color: #ef4444;
}

.error-title {
  color: #dc2626;
  margin-bottom: 1rem;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.retry-btn:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
}

.back-link {
  color: #3b82f6;
  text-decoration: none;
  margin-top: 1rem;
  display: inline-block;
  transition: all 0.3s ease;
  border-radius: 6px;
  padding: 8px 12px;
  margin: -8px -12px;
}

.back-link:hover {
  color: #2563eb;
  background: rgba(59, 130, 246, 0.1);
  text-decoration: none;
  transform: translateX(-4px);
}

.back-link:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* ==================== */
/* PRODUCT LAYOUT */
/* ==================== */
.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

/* ==================== */
/* GALLERY SECTION */
/* ==================== */
.gallery-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.main-image:hover {
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}

.product-main-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-image:hover .product-main-image {
  transform: scale(1.02);
}

.image-thumbnails {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 8px 4px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 3px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  flex-shrink: 0;
  background: none;
  padding: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.thumbnail::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(59, 130, 246, 0);
  transition: background 0.3s ease;
  border-radius: 8px;
}

.thumbnail:hover::before {
  background: rgba(59, 130, 246, 0.1);
}

.thumbnail:hover {
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.thumbnail.active {
  border-color: #3b82f6;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.thumbnail:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.thumbnail:hover img {
  transform: scale(1.1);
}

/* ==================== */
/* INFO SECTION */
/* ==================== */
.info-section {
  padding: 1rem 0;
}

.product-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1e293b;
  line-height: 1.2;
}

.product-category {
  color: #64748b;
  margin-bottom: 1rem;
  text-transform: capitalize;
  font-size: 1.1rem;
  font-weight: 500;
}

.product-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.product-rating {
  color: #f59e0b;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-description {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
}

.product-description h2 {
  margin-bottom: 0.75rem;
  color: #1e293b;
  font-size: 1.25rem;
}

.product-description p {
  line-height: 1.7;
  color: #475569;
  margin: 0;
}

.additional-info {
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
  font-size: 1rem;
}

.in-stock {
  color: #10b981;
  font-weight: 600;
  padding: 4px 8px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 6px;
  margin-left: 8px;
}

.out-of-stock {
  color: #ef4444;
  font-weight: 600;
  padding: 4px 8px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 6px;
  margin-left: 8px;
}

/* ==================== */
/* ACTION BUTTONS */
/* ==================== */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.add-to-cart-btn, .add-to-wishlist-btn {
  padding: 1.25rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-to-cart-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.add-to-cart-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.add-to-cart-btn:active:not(:disabled) {
  transform: translateY(-1px);
  transition-duration: 0.1s;
}

.add-to-cart-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.add-to-cart-btn[aria-busy="true"] {
  opacity: 0.7;
  cursor: wait;
}

.add-to-wishlist-btn {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #475569;
  border: 2px solid #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.add-to-wishlist-btn:hover {
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  border-color: #94a3b8;
  color: #334155;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.add-to-wishlist-btn:active {
  transform: translateY(-1px);
  transition-duration: 0.1s;
}

.add-to-wishlist-btn[aria-pressed="true"] {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-color: #fca5a5;
  color: #dc2626;
}

/* Focus states for buttons */
.add-to-cart-btn:focus-visible,
.add-to-wishlist-btn:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
}

/* ==================== */
/* RESPONSIVE DESIGN */
/* ==================== */
@media (max-width: 768px) {
  .product-layout,
  .skeleton-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-main-image,
  .skeleton-main-image {
    height: 300px;
  }

  .product-title {
    font-size: 1.75rem;
  }

  .product-price {
    font-size: 2rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .add-to-cart-btn, .add-to-wishlist-btn {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }

  /* Менш інтенсивні ефекти на мобільних */
  .add-to-cart-btn:hover:not(:disabled),
  .add-to-wishlist-btn:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 480px) {
  .product-detail {
    padding: 1rem 0.5rem;
  }

  .image-thumbnails {
    gap: 0.5rem;
  }

  .thumbnail,
  .skeleton-thumbnail {
    width: 60px;
    height: 60px;
  }

  .product-description {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
}

/* ==================== */
/* ACCESSIBILITY IMPROVEMENTS */
/* ==================== */
@media (prefers-reduced-motion: reduce) {
  .breadcrumb-link,
  .retry-btn,
  .back-link,
  .thumbnail,
  .add-to-cart-btn,
  .add-to-wishlist-btn,
  .main-image,
  .product-main-image,
  .skeleton-main-image,
  .skeleton-thumbnail,
  .skeleton-title,
  .skeleton-category,
  .skeleton-price,
  .skeleton-rating,
  .skeleton-description,
  .skeleton-button {
    transition: none;
    animation: none;
  }

  .product-main-image,
  .thumbnail img {
    transition: none;
  }

  .thumbnail:hover,
  .add-to-cart-btn:hover:not(:disabled),
  .add-to-wishlist-btn:hover {
    transform: none;
  }

  .skeleton-main-image,
  .skeleton-thumbnail,
  .skeleton-title,
  .skeleton-category,
  .skeleton-price,
  .skeleton-rating,
  .skeleton-description,
  .skeleton-button {
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

  .in-stock {
    color: #060;
  }
}

/* ==================== */
/* SMOOTH TRANSITIONS */
/* ==================== */
.breadcrumb-link,
.retry-btn,
.back-link,
.thumbnail,
.add-to-cart-btn,
.add-to-wishlist-btn,
.main-image,
.product-main-image {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
