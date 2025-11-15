<!-- src/components/ProductCard.vue -->
<template>
  <article class="product-card">
    <div class="product-image-container">
      <img
        :src="product.image"
        :alt="product.name"
        class="product-image"
        loading="lazy"
      />
      <div class="product-overlay">
        <button
          class="quick-action-btn view-details"
          @click="$emit('view-details', product)"
          aria-label="Швидкий перегляд товару"
        >
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="product-content">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }} ₴</p>

      <div class="buttons">
        <button
          class="btn add-cart"
          @click="$emit('add-to-cart', product)"
          aria-label="Додати товар до кошика"
        >
          <span class="btn-icon">🛒</span>
          <span class="btn-text">В кошик</span>
        </button>
        <button
          class="btn add-wishlist"
          @click="$emit('add-to-wishlist', product)"
          aria-label="Додати товар до улюблених"
        >
          <span class="btn-icon">❤️</span>
          <span class="btn-text">Улюблене</span>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Product {
  id: number
  name: string
  price: number
  image: string
}

defineProps<{ product: Product }>()
defineEmits(['add-to-cart', 'add-to-wishlist', 'view-details'])
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 0;
  text-align: left;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
  pointer-events: none;
}

.product-card:hover::before {
  opacity: 1;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 2px rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
}

.product-card:focus-within {
  outline: 3px solid #667eea;
  outline-offset: 4px;
}

/* ==================== */
/* IMAGE CONTAINER */
/* ==================== */
.product-image-container {
  position: relative;
  overflow: hidden;
  background: #f8fafc;
  border-radius: 18px 18px 0 0;
  margin: 12px 12px 0;
}

.product-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image {
  transform: scale(1.08);
  filter: brightness(1.05) saturate(1.1);
}

/* ==================== */
/* OVERLAY EFFECTS */
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px 16px 0 0;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.quick-action-btn {
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.product-card:hover .quick-action-btn {
  transform: translateY(0);
}

.quick-action-btn:hover {
  background: white;
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.quick-action-btn:focus-visible {
  outline: 3px solid white;
  outline-offset: 2px;
}

.btn-icon {
  width: 24px;
  height: 24px;
  color: #667eea;
  transition: transform 0.3s ease;
}

.quick-action-btn:hover .btn-icon {
  transform: scale(1.2);
}

/* ==================== */
/* PRODUCT CONTENT */
/* ==================== */
.product-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 2;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
  transition: color 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card:hover .product-name {
  color: #667eea;
}

.product-price {
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  transition: all 0.3s ease;
}

.product-card:hover .product-price {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: scale(1.05);
}

/* ==================== */
/* BUTTONS CONTAINER */
/* ==================== */
.buttons {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn:active {
  transform: translateY(0) scale(0.98);
  transition-duration: 0.1s;
}

.btn:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 2px;
}

/* ==================== */
/* ADD TO CART BUTTON */
/* ==================== */
.add-cart {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.add-cart:hover {
  background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 8px 25px rgba(0, 123, 255, 0.4),
    0 0 0 2px rgba(0, 123, 255, 0.1);
}

.add-cart .btn-icon {
  color: white;
  transition: transform 0.3s ease;
}

.add-cart:hover .btn-icon {
  transform: scale(1.2) rotate(-5deg);
}

/* ==================== */
/* ADD TO WISHLIST BUTTON */
/* ==================== */
.add-wishlist {
  background: linear-gradient(135deg, #ff4b5c 0%, #e63946 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(255, 75, 92, 0.3);
}

.add-wishlist:hover {
  background: linear-gradient(135deg, #e63946 0%, #d63031 100%);
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 8px 25px rgba(255, 75, 92, 0.4),
    0 0 0 2px rgba(255, 75, 92, 0.1);
}

.add-wishlist .btn-icon {
  color: white;
  transition: transform 0.3s ease;
}

.add-wishlist:hover .btn-icon {
  transform: scale(1.2) rotate(5deg);
}

/* ==================== */
/* RESPONSIVE DESIGN */
/* ==================== */
@media (max-width: 768px) {
  .product-card {
    border-radius: 16px;
    margin: 8px;
  }

  .product-image {
    height: 200px;
  }

  .product-content {
    padding: 16px;
  }

  .product-name {
    font-size: 1.1rem;
  }

  .product-price {
    font-size: 1.5rem;
  }

  .buttons {
    flex-direction: column;
    gap: 8px;
  }

  .btn {
    padding: 10px 14px;
    font-size: 0.85rem;
  }

  /* Менш інтенсивні ефекти на мобільних */
  .product-card:hover {
    transform: translateY(-4px) scale(1.01);
  }

  .btn:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 480px) {
  .product-image-container {
    margin: 8px 8px 0;
    border-radius: 12px 12px 0 0;
  }

  .product-image {
    height: 180px;
  }

  .product-name {
    font-size: 1rem;
  }

  .product-price {
    font-size: 1.4rem;
  }

  .quick-action-btn {
    width: 50px;
    height: 50px;
  }

  .btn-icon {
    width: 20px;
    height: 20px;
  }
}

/* ==================== */
/* ACCESSIBILITY */
/* ==================== */
@media (prefers-reduced-motion: reduce) {
  .product-card,
  .product-image,
  .btn,
  .quick-action-btn,
  .product-overlay {
    transition: none;
  }

  .product-card:hover {
    transform: none;
  }
}

/* ==================== */
/* SMOOTH TRANSITIONS */
/* ==================== */
.product-card,
.product-image,
.product-overlay,
.quick-action-btn,
.btn,
.product-name,
.product-price {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-overlay,
.product-card:hover .quick-action-btn {
  transition-duration: 0.4s;
}
</style>
