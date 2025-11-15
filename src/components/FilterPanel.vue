<template>
  <div class="filter-panel">
    <h3 class="filter-title">Фільтри</h3>
    <div class="filter-group">
      <label for="search">Назва товару</label>
      <input
        id="search"
        type="text"
        placeholder="Шукайте..."
        :value="modelValue.search"
        @input="updateFilter('search', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <div class="filter-group price-group">
      <label>Ціна</label>
      <div class="price-inputs">
        <input
          type="number"
          placeholder="Min"
          :value="modelValue.minPrice"
          @input="updateFilter('minPrice', ($event.target as HTMLInputElement).value)"
        />
        <span>-</span>
        <input
          type="number"
          placeholder="Max"
          :value="modelValue.maxPrice"
          @input="updateFilter('maxPrice', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <div class="filter-group">
      <label for="category">Категорія</label>
      <select
        id="category"
        :value="modelValue.category"
        @change="updateFilter('category', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Всі категорії</option>
        <option value="men">Чоловічий одяг</option>
        <option value="women">Жіночий одяг</option>
      </select>
    </div>

    <div class="filter-buttons">
      <button class="btn btn-primary" @click="emit('apply')">
        Застосувати фільтри
      </button>
      <button class="btn btn-secondary" @click="emit('clear')">
        Очистити фільтри
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Filters {
  search: string;
  minPrice: string | number;
  maxPrice: string | number;
  category: string;
}

const props = defineProps<{
  modelValue: Filters;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Filters): void;
  (e: 'apply'): void;
  (e: 'clear'): void;
}>();

const updateFilter = (key: keyof Filters, value: string | number) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
  });
};
</script>

<style scoped>
.filter-panel {
  background: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  height: fit-content;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  transform: translateY(73px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-panel:hover {
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.filter-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1e293b;
}

.filter-group {
  margin-right: 24px;
  margin-block: 24px;
}

.filter-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  color: #475569;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.filter-group:focus-within label {
  color: #3b82f6;
}

/* ==================== */
/* INPUT HOVER EFFECTS */
/* ==================== */
input[type='text'],
input[type='number'],
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

input[type='text']:hover,
input[type='number']:hover,
select:hover {
  border-color: #94a3b8;
  background-color: #fafafa;
}

input[type='text']:focus,
input[type='number']:focus,
select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #ffffff;
}

/* Focus visible для клавіатурної навігації */
input[type='text']:focus-visible,
input[type='number']:focus-visible,
select:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* ==================== */
/* PRICE GROUP */
/* ==================== */
.price-group .price-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price-inputs span {
  color: #94a3b8;
  font-weight: 600;
}

/* ==================== */
/* BUTTON HOVER EFFECTS */
/* ==================== */
.filter-buttons {
  display: grid;
  gap: 10px;
  margin-top: 24px;
}

.btn {
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
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
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn:active {
  transform: translateY(0);
  transition-duration: 0.1s;
}

/* Focus visible для кнопок */
.btn:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 2px;
}

/* Primary Button */
.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-primary:active {
  background-color: #1d4ed8;
  transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
  background-color: #e2e8f0;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background-color: #cbd5e1;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #374151;
}

.btn-secondary:active {
  background-color: #94a3b8;
  transform: translateY(0);
}

/* ==================== */
/* ACCESSIBILITY */
/* ==================== */

/* Підтримка зменшення руху */
@media (prefers-reduced-motion: reduce) {
  .filter-panel,
  .btn,
  input[type='text'],
  input[type='number'],
  select,
  .filter-group label {
    transition: none;
  }

  .btn::before {
    display: none;
  }

  .btn-primary:hover,
  .btn-secondary:hover {
    transform: none;
  }

  .filter-panel:hover {
    transform: translateY(73px);
  }
}

/* ==================== */
/* RESPONSIVE DESIGN */
/* ==================== */
@media (max-width: 768px) {
  .filter-panel {
    position: static;
    transform: none;
    margin-bottom: 20px;
  }

  .filter-panel:hover {
    transform: none;
  }

  .price-group .price-inputs {
    flex-direction: column;
    gap: 8px;
  }

  .price-inputs span {
    display: none;
  }

  /* Менш інтенсивні ефекти на мобільних */
  .btn-primary:hover,
  .btn-secondary:hover {
    transform: translateY(-1px);
  }
}

/* ==================== */
/* SMOOTH TRANSITIONS */
/* ==================== */
.filter-panel,
.btn,
input[type='text'],
input[type='number'],
select,
.filter-group label {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
