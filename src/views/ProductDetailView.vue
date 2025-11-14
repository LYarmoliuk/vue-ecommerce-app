<template>
  <div class="product-detail">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">Головна</router-link> /
        <span>{{ product?.title || 'Завантаження...' }}</span>
      </nav>

      <div v-if="loading" class="loading">
        <p>Завантаження деталей товару...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="retryLoading" class="retry-btn">Спробувати знову</button>
      </div>

      <div v-else-if="!product && !loading" class="not-found">
        <h2>Товар не знайдено</h2>
        <router-link to="/" class="back-link">← Повернутися до магазину</router-link>
      </div>

      <div v-else-if="product" class="product-content">
        <div class="product-layout">
          <div class="gallery-section">
            <div class="main-image">
              <img :src="currentImage" :alt="product.title" />
            </div>
            <div class="image-thumbnails">
              <div
                v-for="(image, index) in galleryImages"
                :key="index"
                class="thumbnail"
                :class="{ active: currentImage === image }"
                @click="currentImage = image"
              >
                <img :src="image" :alt="`${product.title} - фото ${index + 1}`" />
              </div>
            </div>
          </div>

          <div class="info-section">
            <h1 class="product-title">{{ product.title }}</h1>
            <p class="product-category">{{ formatCategory(product.category) }}</p>
            <p class="product-price">${{ product.price }}</p>

            <div class="product-rating">
              ⭐ {{ product.rating.rate }} ({{ product.rating.count }} відгуків)
            </div>

            <div class="product-description">
              <h3>Опис</h3>
              <p>{{ product.description }}</p>
            </div>

            <div class="additional-info">
              <div v-if="product.brand" class="info-item">
                <strong>Бренд:</strong> {{ product.brand }}
              </div>
              <div v-if="product.material" class="info-item">
                <strong>Матеріал:</strong> {{ product.material }}
              </div>
              <div class="info-item">
                <strong>Наявність:</strong>
                <span :class="product.inStock ? 'in-stock' : 'out-of-stock'">
                  {{ product.inStock ? 'Є в наявності' : 'Немає в наявності' }}
                </span>
              </div>
            </div>

            <div class="action-buttons">
              <button
                @click="addToCart"
                class="add-to-cart-btn"
                :disabled="!product.inStock"
              >
                {{ product.inStock ? '🛒 Додати в кошик' : '❌ Немає в наявності' }}
              </button>
              <button
                @click="toggleFavorite"
                class="add-to-wishlist-btn"
              >
                {{ isFavorite ? '💔 Видалити з улюблених' : '❤️ Додати в улюблене' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'; // <--- ЗМІНА: Видалено useRouter
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { useFavoritesStore } from '@/stores/favorites';
import { getProductGallery } from '@/api/productsApi';

const route = useRoute();
// <--- ЗМІНА: Видалено const router = useRouter();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const loading = ref(false);
const error = ref<string | null>(null);
const currentImage = ref('');
const galleryImages = ref<string[]>([]);

const productId = computed(() => Number(route.params.id));

// <--- ЗМІНА: Тепер посилається на новий selectedProduct зі стору
const product = computed(() => productsStore.selectedProduct);

const isFavorite = computed(() => {
  return favoritesStore.isFavorite(productId.value);
});

const formatCategory = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    "men's clothing": "Чоловічий одяг",
    "women's clothing": "Жіночий одяг"
  };
  return categoryMap[category] || category;
};

// <--- ЗМІНА: Логіка спрощена, бо fetchProductById зі стору
// тепер сам обробляє кешування і встановлює selectedProduct
const loadProduct = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Ця дія тепер сама знаходить/завантажує товар
    // і встановлює 'selectedProduct' у сторі
    const productData = await productsStore.fetchProductById(productId.value);

    // Завантажуємо галерею фото
    galleryImages.value = await getProductGallery(productId.value);
    currentImage.value = galleryImages.value[0] || productData.image;

  } catch (err) {
    error.value = 'Не вдалося завантажити товар';
    console.error('Error loading product:', err);
  } finally {
    loading.value = false;
  }
};

// <--- ЗМІНА: Додано перевірку на успішне додавання
const addToCart = () => {
  if (!product.value) return;

  const success = cartStore.addToCart(product.value, 1);
  if (success) {
    alert('Товар додано до кошика! 🛒');
  } else {
    // Це спрацює, якщо логіка cartStore поверне false (наприклад, перевірка наявності)
    alert('❌ Не вдалося додати товар (можливо, немає в наявності)');
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

const retryLoading = () => {
  loadProduct();
};

onMounted(() => {
  loadProduct();
});

// Реагуємо на зміну ID в URL
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
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.breadcrumb {
  margin-bottom: 2rem;
  color: #64748b;
}

.breadcrumb a {
  color: #3b82f6;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.loading, .error, .not-found {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
}

.error {
  color: #ef4444;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-link {
  color: #3b82f6;
  text-decoration: none;
  margin-top: 1rem;
  display: inline-block;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

/* Галерея */
.gallery-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
}

.image-thumbnails {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
}

.thumbnail.active {
  border-color: #3b82f6;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

/* Інформація */
.product-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.product-category {
  color: #64748b;
  margin-bottom: 1rem;
  text-transform: capitalize;
}

.product-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 1rem;
}

.product-rating {
  color: #f59e0b;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.product-description {
  margin-bottom: 2rem;
}

.product-description h3 {
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.product-description p {
  line-height: 1.6;
  color: #475569;
}

.additional-info {
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  margin-bottom: 0.5rem;
}

.in-stock {
  color: #10b981;
  font-weight: 600;
}

.out-of-stock {
  color: #ef4444;
  font-weight: 600;
}

/* Великі кнопки */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.add-to-cart-btn, .add-to-wishlist-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.add-to-cart-btn {
  background: #3b82f6;
  color: white;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-2px);
}

.add-to-cart-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.add-to-wishlist-btn {
  background: #f1f5f9;
  color: #475569;
  border: 2px solid #cbd5e1;
}

.add-to-wishlist-btn:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .main-image img {
    height: 300px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .add-to-cart-btn, .add-to-wishlist-btn {
    padding: 0.75rem 1.5rem;
  }
}
</style>
