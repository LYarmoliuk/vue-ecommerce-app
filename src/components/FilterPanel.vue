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
}
.filter-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1e293b;
}
.filter-group {
  margin-bottom: 20px;
}
.filter-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #475569;
}
input[type='text'],
input[type='number'],
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
}
.price-group .price-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}
.price-inputs span {
  color: #94a3b8;
}
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
  transition: all 0.2s;
}
.btn-primary {
  background-color: #3b82f6;
  color: white;
}
.btn-primary:hover {
  background-color: #2563eb;
}
.btn-secondary {
  background-color: #e2e8f0;
  color: #475569;
}
.btn-secondary:hover {
  background-color: #cbd5e1;
}
</style>
