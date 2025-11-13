<template>
  <div class="cart-view">
    <div class="header-section">
      <div class="header-content">
        <h1 class="cart-title">
          <span class="cart-icon">🛒</span>
          Кошик
        </h1>
        <p class="subtitle" v-if="cartStore.items.length > 0">
          {{ cartStore.totalItems }} {{ getItemWord(cartStore.totalItems) }}
        </p>
      </div>
    </div>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <div class="empty-content">
        <div class="empty-icon">🛒</div>
        <h2 class="empty-title">Кошик порожній</h2>
        <p class="empty-description">Додайте товари до кошика, щоб розпочати покупки</p>
        <RouterLink to="/" class="shop-link">
          <span class="link-icon">🛍️</span>
          Почати покупки
        </RouterLink>
      </div>
    </div>

    <div v-else class="cart-content">
      <!-- Список товарів -->
      <div class="cart-items-container">
        <div class="items-header">
          <h2>Ваші товари</h2>
        </div>

        <transition-group name="cart-item" tag="div" class="cart-items">
          <div v-for="item in cartStore.items"
               :key="`${item.product.id}-${item.selectedSize}-${item.selectedColor}`"
               class="cart-item">
            <div class="item-card">
              <div class="item-image-container">
                <img
                  :src="item.product.image"
                  :alt="item.product.title"
                  class="item-image"
                >
              </div>

              <div class="item-info">
                <div class="item-main">
                  <h3 class="item-title">{{ item.product.title }}</h3>
                  <p class="item-price">${{ item.product.price }}</p>
                </div>

                <div class="item-options">
                  <div v-if="item.selectedSize" class="option-badge">
                    <span class="option-label">Розмір:</span>
                    <span class="option-value">{{ item.selectedSize }}</span>
                  </div>

                  <div v-if="item.selectedColor" class="option-badge">
                    <span class="option-label">Колір:</span>
                    <span class="option-value">{{ item.selectedColor }}</span>
                  </div>
                </div>
              </div>

              <div class="item-actions">
                <div class="quantity-section">
                  <label class="quantity-label">Кількість:</label>
                  <div class="quantity-controls">
                    <button
                      @click="cartStore.decrementQuantity(item.product.id, item.selectedSize, item.selectedColor)"
                      class="quantity-btn"
                      :disabled="item.quantity <= 1"
                    >
                      <span>−</span>
                    </button>

                    <span class="quantity">{{ item.quantity }}</span>

                    <button
                      @click="cartStore.incrementQuantity(item.product.id, item.selectedSize, item.selectedColor)"
                      class="quantity-btn"
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>

                <div class="item-total">
                  <span class="total-label">Сума:</span>
                  <span class="total-price">${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                </div>

                <button
                  @click="cartStore.removeFromCart(item.product.id, item.selectedSize, item.selectedColor)"
                  class="remove-btn"
                  title="Видалити товар"
                >
                  <span class="remove-icon">🗑️</span>
                  <span class="remove-text">Видалити</span>
                </button>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Загальна сума -->
      <div class="cart-summary-container">
        <div class="cart-summary">
          <h2 class="summary-title">Підсумок замовлення</h2>

          <div class="summary-details">
            <div class="summary-row">
              <span class="summary-label">Товари ({{ cartStore.totalItems }}):</span>
              <span class="summary-value">${{ cartStore.total.toFixed(2) }}</span>
            </div>

            <div class="summary-row">
              <span class="summary-label">Доставка:</span>
              <span class="summary-value free">Безкоштовно</span>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-total">
              <span class="total-label">Всього:</span>
              <span class="total-value">${{ cartStore.total.toFixed(2) }}</span>
            </div>
          </div>

          <button class="checkout-btn">
            <span class="checkout-icon">✓</span>
            <span>Оформити замовлення</span>
          </button>

          <button
            @click="cartStore.clearCart()"
            class="clear-btn"
          >
            <span class="clear-icon">🗑️</span>
            <span>Очистити кошик</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const getItemWord = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'товарів';
  }
  if (lastDigit === 1) {
    return 'товар';
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'товари';
  }
  return 'товарів';
};
</script>

<style scoped>
.cart-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding-bottom: 3rem;
}

.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 1rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.cart-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.cart-icon {
  font-size: 2.5rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.subtitle {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.125rem;
  font-weight: 500;
}

.empty-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.empty-content {
  text-align: center;
  max-width: 500px;
}

.empty-icon {
  font-size: 6rem;
  color: #d1d5db;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.empty-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.75rem;
}

.empty-description {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.shop-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
}

.shop-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
}

.link-icon {
  font-size: 1.5rem;
}

.cart-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2rem;
  align-items: start;
}

.cart-items-container {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.items-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-bottom: 2px solid #e5e7eb;
}

.items-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.cart-items {
  padding: 1rem;
}

.cart-item {
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.cart-item:last-child {
  margin-bottom: 0;
}

.item-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  transition: all 0.3s ease;
}

.item-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.item-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  background: #f9fafb;
}

.item-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.item-card:hover .item-image {
  transform: scale(1.05);
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item-main {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-title {
  font-weight: 700;
  font-size: 1.125rem;
  color: #1f2937;
  line-height: 1.4;
  margin: 0;
}

.item-price {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.item-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.option-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: #f3f4f6;
  border-radius: 50px;
  font-size: 0.875rem;
}

.option-label {
  color: #6b7280;
  font-weight: 500;
}

.option-value {
  color: #374151;
  font-weight: 600;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

.quantity-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.quantity-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f9fafb;
  padding: 0.25rem;
  border-radius: 50px;
  border: 2px solid #e5e7eb;
}

.quantity-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: white;
  color: #667eea;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.quantity-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.quantity-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.quantity {
  min-width: 2.5rem;
  text-align: center;
  font-weight: 700;
  font-size: 1.125rem;
  color: #1f2937;
}

.item-total {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.total-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.total-price {
  font-size: 1.25rem;
  font-weight: 800;
  color: #10b981;
}

.remove-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  color: #ef4444;
  border: 2px solid #fecaca;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.remove-icon {
  font-size: 1rem;
}

.cart-summary-container {
  position: sticky;
  top: 2rem;
}

.cart-summary {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

.summary-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.summary-details {
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.summary-label {
  color: #6b7280;
  font-size: 1rem;
}

.summary-value {
  font-weight: 600;
  color: #1f2937;
  font-size: 1rem;
}

.summary-value.free {
  color: #10b981;
  font-weight: 700;
}

.summary-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
  margin: 1rem 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
}

.total-label {
  font-size: 1.125rem;
  font-weight: 700;
  color: #374151;
}

.total-value {
  font-size: 1.875rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.checkout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 1.125rem;
  cursor: pointer;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(16, 185, 129, 0.4);
}

.checkout-icon {
  font-size: 1.5rem;
}

.clear-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  color: #374151;
}

.clear-icon {
  font-size: 1.125rem;
}

.security-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0.75rem;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 0.5rem;
  color: #16a34a;
}

.badge-icon {
  font-size: 1.125rem;
}

.badge-text {
  font-weight: 600;
  font-size: 0.875rem;
}

/* Анімації для transition-group */
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.5s ease;
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.cart-item-move {
  transition: transform 0.5s ease;
}

@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary-container {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-title {
    font-size: 2rem;
  }

  .cart-icon {
    font-size: 2rem;
  }

  .item-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .item-image-container {
    margin: 0 auto;
  }

  .item-actions {
    align-items: center;
    width: 100%;
  }

  .remove-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .header-section {
    padding: 2rem 1rem 1.5rem;
  }

  .cart-title {
    font-size: 1.75rem;
  }

  .empty-icon {
    font-size: 4rem;
  }

  .empty-title {
    font-size: 1.5rem;
  }

  .item-card {
    padding: 1rem;
  }

  .item-image {
    width: 100px;
    height: 100px;
  }
}
</style>
