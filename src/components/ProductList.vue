<!-- src/components/ProductList.vue -->
<template>
  <div class="product-list">
    <div v-if="loading" class="loading-state">
      <div class="skeleton" v-for="i in 6" :key="i"></div>
    </div>

    <div v-else-if="error" class="error-state">
      ⚠️ {{ error }}
    </div>

    <div v-else-if="products.length === 0" class="empty-state">
      😔 No products found.
    </div>

    <div v-else class="grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
        @add-to-wishlist="handleAddToWishlist"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref('')

const fetchProducts = async () => {
  try {
    loading.value = true
    await new Promise((r) => setTimeout(r, 1200)) // Імітація запиту

    products.value = [
      { id: 1, name: 'iPhone 15 Pro', price: 49999, image: '/img/iphone15.webp' },
      { id: 2, name: 'MacBook Air M3', price: 59999, image: '/img/macbook.webp' },
      { id: 3, name: 'AirPods Pro 2', price: 9999, image: '/img/airpods.webp' },
      { id: 4, name: 'Apple Watch 9', price: 14999, image: '/img/watch.webp' }
    ]
  } catch (err) {
    error.value = 'Failed to load products 😢'
  } finally {
    loading.value = false
  }
}

const handleAddToCart = (product: Product) => {
  alert(`✅ ${product.name} added to cart!`)
}

const handleAddToWishlist = (product: Product) => {
  alert(`💖 ${product.name} added to wishlist!`)
}

onMounted(fetchProducts)
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 30px;
}

.loading-state {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 30px;
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e6e6e6 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  height: 300px;
  border-radius: 12px;
  animation: shimmer 1.6s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.error-state,
.empty-state {
  text-align: center;
  font-size: 1.2rem;
  padding: 40px 0;
  color: #555;
}
</style>
