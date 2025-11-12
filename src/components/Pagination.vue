<template>
  <div class="pagination" v-if="totalPages > 1">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="btn"
    >
      &larr; Previous
    </button>
    <span class="page-info">
      Page <strong>{{ currentPage }}</strong> of <strong>{{ totalPages }}</strong>
    </span>
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="btn"
    >
      Next &rarr;
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'change-page', page: number): void;
}>();

const changePage = (page: number) => {
  // Перевіряємо, чи сторінка в допустимих межах
  if (page > 0 && page <= props.totalPages) {
    emit('change-page', page);
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
}
.page-info {
  font-size: 1rem;
  color: #475569;
}
.btn {
  padding: 10px 16px;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s;
}
.btn:hover:not(:disabled) {
  background-color: #f1f5f9;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
