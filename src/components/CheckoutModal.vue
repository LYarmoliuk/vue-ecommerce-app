<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-window">
      <button class="close-btn" @click="close">✖</button>

      <CheckoutForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckoutForm from './CheckoutForm.vue'

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-window {
  background: white;
  width: 500px;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
  position: relative;
  animation: popup 0.25s ease-out;
}

@keyframes popup {
  from {
    transform: scale(0.7);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 18px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #555;
}
</style>
