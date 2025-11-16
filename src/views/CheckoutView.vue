<template>
  <div class="checkout-page">
    <!-- Декоративні елементи -->
    <div class="decoration-circle circle-1"></div>
    <div class="decoration-circle circle-2"></div>
    <div class="decoration-circle circle-3"></div>

    <div class="checkout-container">
      <!-- Заголовок -->
      <div class="header">
        <div class="icon-wrapper">
          <span class="cart-icon">🛒</span>
        </div>
        <h1 class="title">Оформлення замовлення</h1>
        <p class="subtitle">Ще крок до вашої покупки</p>
      </div>

      <!-- Помилка -->
      <transition name="fade">
        <div v-if="order.error" class="alert error-box">
          <span class="alert-icon">⚠️</span>
          <span class="alert-text">{{ order.error }}</span>
        </div>
      </transition>

      <!-- Успіх -->
      <transition name="fade">
        <div v-if="success" class="alert success-box">
          <span class="alert-icon">✅</span>
          <span class="alert-text">Замовлення успішно оформлено!</span>
        </div>
      </transition>

      <!-- Форма -->
      <div class="form">

        <!-- Секція: Контактна інформація -->
        <div class="section">
          <h2 class="section-title">
            <span class="section-icon"></span>
            Контактна інформація
          </h2>

          <!-- Ім'я -->
          <div class="form-group">
            <label class="label">
              <span class="label-text">Прізвище та ім'я</span>
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <input
                type="text"
                placeholder="Іван Петренко"
                v-model="order.form.fullName"
                :class="['input', { 'input-error': errors.fullName }]"
                @blur="validateFullName"
                @input="errors.fullName = ''"
              />
              <span class="input-icon"></span>
            </div>
            <transition name="slide-fade">
              <span v-if="errors.fullName" class="error-text">
                <span class="error-icon">⚠</span>
                {{ errors.fullName }}
              </span>
            </transition>
          </div>

          <!-- Телефон -->
          <div class="form-group">
            <label class="label">
              <span class="label-text">Номер телефону</span>
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <input
                type="tel"
                placeholder="+380 XX XXX XX XX"
                v-model="order.form.phone"
                :class="['input', { 'input-error': errors.phone }]"
                @blur="validatePhone"
                @input="errors.phone = ''"
              />
              <span class="input-icon"></span>
            </div>
            <transition name="slide-fade">
              <span v-if="errors.phone" class="error-text">
                <span class="error-icon">⚠</span>
                {{ errors.phone }}
              </span>
            </transition>
          </div>
        </div>

        <!-- Секція: Доставка та оплата -->
        <div class="section">
          <h2 class="section-title">
            <span class="section-icon"></span>
            Доставка та оплата
          </h2>

          <!-- Доставка -->
          <div class="form-group">
            <label class="label">
              <span class="label-text">Спосіб доставки</span>
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <select
                v-model="order.form.deliveryMethod"
                :class="['input select', { 'input-error': errors.deliveryMethod }]"
                @blur="validateDeliveryMethod"
                @change="errors.deliveryMethod = ''"
              >
                <option disabled value="">Оберіть спосіб доставки</option>
                <option value="nova_poshta"> Нова Пошта</option>
                <option value="ukrposhta"> УкрПошта</option>
                <option value="courier"> Кур'єр по місту</option>
              </select>
            </div>
            <transition name="slide-fade">
              <span v-if="errors.deliveryMethod" class="error-text">
                <span class="error-icon">⚠</span>
                {{ errors.deliveryMethod }}
              </span>
            </transition>
          </div>

          <!-- Оплата -->
          <div class="form-group">
            <label class="label">
              <span class="label-text">Метод оплати</span>
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <select
                v-model="order.form.paymentMethod"
                :class="['input select', { 'input-error': errors.paymentMethod }]"
                @blur="validatePaymentMethod"
                @change="errors.paymentMethod = ''"
              >
                <option disabled value="">Оберіть метод оплати</option>
                <option value="card"> Картка онлайн</option>
                <option value="cod"> Готівка при отриманні</option>
              </select>
            </div>
            <transition name="slide-fade">
              <span v-if="errors.paymentMethod" class="error-text">
                <span class="error-icon">⚠</span>
                {{ errors.paymentMethod }}
              </span>
            </transition>
          </div>
        </div>

        <!-- Кнопка відправки -->
        <button
          type="button"
          class="submit-btn"
          :disabled="order.loading || hasErrors"
          @click="submit"
        >
          <span v-if="order.loading" class="btn-content loading">
            <span class="spinner"></span>
            <span>Обробка замовлення...</span>
          </span>
          <span v-else class="btn-content">
            <span class="btn-icon">✓</span>
            <span>Підтвердити замовлення</span>
          </span>
        </button>
      </div>

      <!-- Кнопка назад -->
      <RouterLink to="/cart" class="back-btn">
        <span class="back-arrow">←</span>
        <span>Повернутися до кошика</span>
      </RouterLink>

      <!-- Безпека -->
      <div class="security-badge">
        <span class="shield-icon">🔒</span>
        <span class="security-text">Ваші дані під надійним захистом</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useOrderStore } from "@/stores/order";

const order = useOrderStore();
const router = useRouter();
const success = ref(false);

const errors = reactive({
  fullName: "",
  phone: "",
  deliveryMethod: "",
  paymentMethod: ""
});

function validateFullName() {
  if (!order.form.fullName.trim()) {
    errors.fullName = "Введіть ім'я";
  } else if (order.form.fullName.trim().length < 3) {
    errors.fullName = "Ім'я має містити мінімум 3 символи";
  } else {
    errors.fullName = "";
  }
}

function validatePhone() {
  const phone = order.form.phone.trim();
  const regex = /^\+380\d{9}$/;

  if (!phone) {
    errors.phone = "Введіть номер телефону";
  } else if (!regex.test(phone)) {
    errors.phone = "Формат: +380XXXXXXXXX";
  } else {
    errors.phone = "";
  }
}

function validateDeliveryMethod() {
  if (!order.form.deliveryMethod) {
    errors.deliveryMethod = "Виберіть спосіб доставки";
  } else {
    errors.deliveryMethod = "";
  }
}

function validatePaymentMethod() {
  if (!order.form.paymentMethod) {
    errors.paymentMethod = "Виберіть метод оплати";
  } else {
    errors.paymentMethod = "";
  }
}

const hasErrors = computed(() => {
  return (
    !!errors.fullName ||
    !!errors.phone ||
    !!errors.deliveryMethod ||
    !!errors.paymentMethod
  );
});

async function submit() {
  validateFullName();
  validatePhone();
  validateDeliveryMethod();
  validatePaymentMethod();

  if (hasErrors.value) {
    // Прокрутити до верху, якщо є помилки
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const ok = await order.submitOrder();

  if (ok) {
    success.value = true;
    // Прокрутити до верху для показу повідомлення про успіх
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.checkout-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Декоративні елементи */
.decoration-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  pointer-events: none;
}

.circle-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  top: -300px;
  right: -200px;
  animation: float 12s ease-in-out infinite;
}

.circle-2 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
  bottom: -200px;
  left: -150px;
  animation: float 15s ease-in-out infinite reverse;
}

.circle-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.25), transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-40px) rotate(10deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.15;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.25;
  }
}

/* Контейнер */
.checkout-container {
  background: #ffffff;
  max-width: 600px;
  width: 100%;
  padding: 2.5rem;
  border-radius: 28px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;
  animation: slideIn 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Заголовок */
.header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.cart-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.title {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
}

/* Алерти */
.alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  font-weight: 600;
  animation: slideDown 0.4s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.error-box {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #b91c1c;
  border: 2px solid #f87171;
}

.success-box {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
  border: 2px solid #34d399;
}

/* Форма */
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Секції */
.section {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 20px;
  border: 2px solid #e5e7eb;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.section-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* Поля форми */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.6rem;
}

.label-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
}

.required {
  color: #ef4444;
  font-size: 1.1rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  padding: 1rem 1.2rem;
  padding-right: 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 14px;
  font-size: 1rem;
  color: #1f2937;
  background: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
  transform: translateY(-1px);
}

.input-error {
  border-color: #ef4444;
  background: #fef2f2;
}

.input-error:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.15);
}

.input::placeholder {
  color: #9ca3af;
}

.input-icon {
  position: absolute;
  right: 1rem;
  font-size: 1.25rem;
  pointer-events: none;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.input:focus + .input-icon {
  opacity: 1;
}

.select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  cursor: pointer;
  padding-right: 3rem;
}

.error-text {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
}

.error-icon {
  font-size: 1rem;
}

/* Кнопка відправки */
.submit-btn {
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 700;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(16, 185, 129, 0.5);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}

.btn-icon {
  font-size: 1.3rem;
  font-weight: bold;
}

.loading {
  animation: pulse-btn 1.5s ease-in-out infinite;
}

@keyframes pulse-btn {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Кнопка назад */
.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem;
  margin-top: 1.5rem;
  background: #f3f4f6;
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-btn:hover {
  background: #e5e7eb;
  transform: translateX(-4px);
}

.back-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s;
}

.back-btn:hover .back-arrow {
  transform: translateX(-4px);
}

/* Значок безпеки */
.security-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0.75rem;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.shield-icon {
  font-size: 1.1rem;
}

/* Анімації переходів */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Адаптивність */
@media (max-width: 640px) {
  .checkout-container {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .icon-wrapper {
    width: 70px;
    height: 70px;
  }

  .cart-icon {
    font-size: 2rem;
  }

  .section {
    padding: 1.25rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .input {
    padding: 0.9rem 1rem;
    font-size: 0.95rem;
  }

  .submit-btn {
    padding: 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .checkout-page {
    padding: 1rem 0.75rem;
  }

  .checkout-container {
    padding: 1.25rem;
    border-radius: 24px;
  }

  .form {
    gap: 1.5rem;
  }

  .section {
    padding: 1rem;
  }
}
</style>
