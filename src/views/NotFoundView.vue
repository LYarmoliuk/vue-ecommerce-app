<template>
  <div class="not-found">
    <div class="container">
      <div class="not-found-content">
        <!-- Анімована іконка -->
        <div class="error-icon">
          <div class="icon-circle">
            <span class="icon-text">404</span>
          </div>
          <div class="pulse-ring"></div>
        </div>

        <!-- Текст контенту -->
        <div class="text-content">
          <h1 class="error-title">404 - Сторінку не знайдено</h1>
          <p class="error-description">
            Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
          </p>
          <p class="error-suggestion">
            Спробуйте повернутися на головну сторінку або скористатися пошуком.
          </p>
        </div>

        <!-- Інтерактивні кнопки -->
        <div class="action-buttons">
          <router-link
            to="/"
            class="home-link primary-link"
            aria-label="Повернутися на головну сторінку"
          >
            <span class="link-icon">🏠</span>
            <span class="link-text">На головну</span>
          </router-link>

          <button
            @click="goBack"
            class="back-link secondary-link"
            aria-label="Повернутися до попередньої сторінки"
          >
            <span class="link-icon">↩️</span>
            <span class="link-text">Назад</span>
          </button>
        </div>

        <!-- Додаткові опції -->
        <div class="additional-options">
          <p class="options-title">Або спробуйте:</p>
          <div class="options-grid">
            <router-link to="/products" class="option-card">
              <span class="option-icon">🛍️</span>
              <span class="option-text">Перейти до магазину</span>
            </router-link>
            <router-link to="/search" class="option-card">
              <span class="option-icon">🔍</span>
              <span class="option-text">Скористатися пошуком</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.not-found-content {
  text-align: center;
  background: white;
  border-radius: 24px;
  padding: 3rem 2rem;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.not-found-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: -200% 0; }
  50% { background-position: 200% 0; }
}

/* ==================== */
/* ERROR ICON ANIMATION */
/* ==================== */
.error-icon {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.icon-circle {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 800;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  position: relative;
  z-index: 2;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  border: 2px solid #667eea;
  border-radius: 50%;
  animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0;
  }
}

/* ==================== */
/* TEXT CONTENT */
/* ==================== */
.text-content {
  margin-bottom: 2.5rem;
}

.error-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-description {
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.error-suggestion {
  font-size: 1rem;
  color: #9ca3af;
  line-height: 1.5;
}

/* ==================== */
/* ACTION BUTTONS */
/* ==================== */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

/* ==================== */
/* PRIMARY LINK HOVER EFFECTS */
/* ==================== */
.primary-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
}

.primary-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.primary-link:hover::before {
  left: 100%;
}

.primary-link:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow:
    0 8px 25px rgba(102, 126, 234, 0.4),
    0 0 0 2px rgba(255, 255, 255, 0.2);
}

.primary-link:active {
  transform: translateY(-1px) scale(1.02);
  transition-duration: 0.1s;
}

.primary-link:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 3px;
  border-radius: 50px;
}

.link-icon {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.primary-link:hover .link-icon {
  transform: scale(1.2) rotate(-5deg);
}

/* ==================== */
/* SECONDARY LINK HOVER EFFECTS */
/* ==================== */
.secondary-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  color: #667eea;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.secondary-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.05), transparent);
  transition: left 0.6s ease;
}

.secondary-link:hover::before {
  left: 100%;
}

.secondary-link:hover {
  background: #f8fafc;
  border-color: #667eea;
  color: #764ba2;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.secondary-link:active {
  transform: translateY(-1px);
  transition-duration: 0.1s;
}

.secondary-link:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 2px;
  border-radius: 50px;
}

.secondary-link:hover .link-icon {
  transform: scale(1.2) rotate(-10deg);
}

/* ==================== */
/* ADDITIONAL OPTIONS */
/* ==================== */
.additional-options {
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
}

.options-title {
  color: #6b7280;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

/* ==================== */
/* OPTION CARDS HOVER EFFECTS */
/* ==================== */
.option-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f8fafc;
  color: #374151;
  text-decoration: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.option-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.6s ease;
}

.option-card:hover::before {
  left: 100%;
}

.option-card:hover {
  background: white;
  border-color: #667eea;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  color: #667eea;
}

.option-card:active {
  transform: translateY(0) scale(1);
  transition-duration: 0.1s;
}

.option-card:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 2px;
  border-radius: 12px;
}

.option-icon {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.option-card:hover .option-icon {
  transform: scale(1.2);
}

.option-text {
  font-weight: 500;
  font-size: 0.9rem;
}

/* ==================== */
/* RESPONSIVE DESIGN */
/* ==================== */
@media (max-width: 768px) {
  .not-found-content {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }

  .error-title {
    font-size: 2rem;
  }

  .error-description {
    font-size: 1.1rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .primary-link,
  .secondary-link {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .options-grid {
    grid-template-columns: 1fr;
  }

  .icon-circle {
    width: 100px;
    height: 100px;
    font-size: 1.5rem;
  }

  .pulse-ring {
    width: 120px;
    height: 120px;
  }

  /* Менш інтенсивні ефекти на мобільних */
  .primary-link:hover,
  .secondary-link:hover,
  .option-card:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 480px) {
  .not-found-content {
    padding: 1.5rem 1rem;
  }

  .error-title {
    font-size: 1.75rem;
  }

  .error-description {
    font-size: 1rem;
  }

  .primary-link,
  .secondary-link {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}

/* ==================== */
/* ACCESSIBILITY */
/* ==================== */
@media (prefers-reduced-motion: reduce) {
  .icon-circle,
  .pulse-ring,
  .not-found-content::before {
    animation: none;
  }

  .primary-link,
  .secondary-link,
  .option-card {
    transition: opacity 0.1s ease;
  }

  .primary-link:hover,
  .secondary-link:hover,
  .option-card:hover {
    transform: none;
  }
}

/* ==================== */
/* SMOOTH TRANSITIONS */
/* ==================== */
.primary-link,
.secondary-link,
.option-card,
.link-icon,
.option-icon {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
