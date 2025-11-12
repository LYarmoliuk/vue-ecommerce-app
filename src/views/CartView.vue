<template>
  <div class="cart-view">
    <h1 class="cart-title">Кошик</h1>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p class="empty-text">Кошик порожній</p>
      <RouterLink to="/" class="shop-link">
        Почати покупки
      </RouterLink>
    </div>

    <div v-else class="cart-content">
      <!-- Список товарів -->
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="`${item.product.id}-${item.selectedSize}-${item.selectedColor}`"
             class="cart-item">
          <div class="item-content">
            <img
              :src="item.product.image"
              :alt="item.product.title"
              class="item-image"
            >

            <div class="item-details">
              <h3 class="item-title">{{ item.product.title }}</h3>
              <p class="item-price">${{ item.product.price }}</p>

              <div v-if="item.selectedSize" class="item-option">
                Розмір: {{ item.selectedSize }}
              </div>

              <div v-if="item.selectedColor" class="item-option">
                Колір: {{ item.selectedColor }}
              </div>
            </div>

            <div class="quantity-controls">
              <button
                @click="cartStore.decrementQuantity(item.product.id, item.selectedSize, item.selectedColor)"
                class="quantity-btn"
              >
                -
              </button>

              <span class="quantity">{{ item.quantity }}</span>

              <button
                @click="cartStore.incrementQuantity(item.product.id, item.selectedSize, item.selectedColor)"
                class="quantity-btn"
              >
                +
              </button>

              <button
                @click="cartStore.removeFromCart(item.product.id, item.selectedSize, item.selectedColor)"
                class="remove-btn"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Загальна сума -->
      <div class="cart-summary">
        <h2 class="summary-title">Підсумок</h2>

        <div class="summary-details">
          <div class="summary-row">
            <span>Товари ({{ cartStore.totalItems }}):</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>

          <div class="summary-total">
            <span>Всього:</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
        </div>

        <button class="checkout-btn">
          Оформити замовлення
        </button>

        <button
          @click="cartStore.clearCart()"
          class="clear-btn"
        >
          Очистити кошик
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
</script>

<style scoped>
.cart-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.cart-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.empty-cart {
  text-align: center;
  padding: 3rem 0;
}

.empty-text {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.shop-link {
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  margin-top: 1rem;
}

.shop-link:hover {
  background: #2563eb;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.item-content {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.375rem;
}

.item-details {
  flex: 1;
}

.item-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.item-price {
  color: #374151;
  margin-bottom: 0.5rem;
}

.item-option {
  font-size: 0.875rem;
  color: #6b7280;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  cursor: pointer;
}

.quantity {
  width: 3rem;
  text-align: center;
}

.remove-btn {
  margin-left: 1rem;
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
}

.remove-btn:hover {
  color: #dc2626;
}

.cart-summary {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: fit-content;
}

.summary-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.summary-details {
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.125rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 0.5rem;
}

.checkout-btn {
  width: 100%;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 0.5rem;
}

.checkout-btn:hover {
  background: #2563eb;
}

.clear-btn {
  width: 100%;
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.clear-btn:hover {
  background: #f9fafb;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .item-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
