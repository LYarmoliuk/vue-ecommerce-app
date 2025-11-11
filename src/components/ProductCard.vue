<!-- src/components/ProductCard.vue -->
<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image" />

    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-price">{{ product.price }} ₴</p>

    <div class="buttons">
      <button class="btn add-cart" @click="$emit('add-to-cart', product)">
        🛒 Add to Cart
      </button>
      <button class="btn add-wishlist" @click="$emit('add-to-wishlist', product)">
        ❤️ Add to Wishlist
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number
  name: string
  price: number
  image: string
}

defineProps<{ product: Product }>()
defineEmits(['add-to-cart', 'add-to-wishlist'])
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 20px;
  text-align: center;
  transition: all 0.35s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
}

.product-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.product-price {
  font-size: 1.6rem;
  color: #007bff;
  font-weight: 700;
  margin-bottom: 16px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-cart {
  background: #007bff;
  color: #fff;
}

.add-cart:hover {
  background: #0056b3;
}

.add-wishlist {
  background: #ff4b5c;
  color: #fff;
}

.add-wishlist:hover {
  background: #e63946;
}
</style>
