<template>
  <form class="checkout" @submit.prevent="handleSubmit">

    <h3 class="form-title">Оформлення замовлення</h3>

    <!-- Ім’я -->
    <label class="field">
      <span>Повне ім’я</span>
      <input
        type="text"
        v-model="order.form.fullName"
        @input="update('fullName', order.form.fullName)"
        placeholder="Введіть ім’я"
        required
      />
    </label>

    <!-- Телефон -->
    <label class="field">
      <span>Телефон</span>
      <input
        type="text"
        v-model="order.form.phone"
        @input="update('phone', order.form.phone)"
        placeholder="+380..."
        required
      />
    </label>

    <!-- Доставка -->
    <label class="field">
      <span>Спосіб доставки</span>
      <select
        v-model="order.form.deliveryMethod"
        @change="update('deliveryMethod', order.form.deliveryMethod)"
        required
      >
        <option disabled value="">Виберіть спосіб</option>
        <option value="mail">Пошта</option>
        <option value="postomat">Поштомат</option>
        <option value="courier">Кур’єр</option>
      </select>
    </label>

    <!-- Оплата -->
    <label class="field">
      <span>Метод оплати</span>
      <select
        v-model="order.form.paymentMethod"
        @change="update('paymentMethod', order.form.paymentMethod)"
        required
      >
        <option disabled value="">Виберіть спосіб</option>
        <option value="card">Карта</option>
        <option value="cash">Готівка</option>
      </select>
    </label>

    <!-- Кнопка -->
    <button class="submit" type="submit" :disabled="order.loading">
      {{ order.loading ? "Обробка..." : "Підтвердити замовлення" }}
    </button>

    <p v-if="order.error" class="error">{{ order.error }}</p>
    <p v-if="success" class="success">Замовлення успішно оформлено!</p>

  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOrderStore } from "@/stores/order";

const order = useOrderStore();
const success = ref(false);

function update(field: any, value: any) {
  order.updateFormField(field, value);
}

async function handleSubmit() {
  const ok = await order.submitOrder();

  if (ok) {
    success.value = true;
    setTimeout(() => {
      success.value = false;
    }, 3000);
  }
}
</script>

<style scoped>
.checkout {
  background: white;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 4px 10px #0002;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-title {
  font-size: 1.3rem;
  font-weight: 700;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.field input,
.field select {
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.submit {
  width: 100%;
  background: #10b981;
  color: white;
  padding: 0.8rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.error {
  color: red;
}

.success {
  color: #10b981;
  font-weight: 700;
}
</style>
