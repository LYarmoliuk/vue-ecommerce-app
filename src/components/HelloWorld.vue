<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <div class="content-wrapper">
      <div class="icon-wrapper">
        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <h1 class="main-title">
        <span class="gradient-text">{{ msg }}</span>
      </h1>

      <p class="subtitle">
        Ви успішно створили проект з
        <a href="https://vite.dev/" target="_blank" rel="noopener" class="tech-link vite">
          <span class="link-icon">⚡</span> Vite
        </a>
        та
        <a href="https://vuejs.org/" target="_blank" rel="noopener" class="tech-link vue">
          <span class="link-icon">💚</span> Vue 3
        </a>
      </p>

      <div class="cta-section">
        <p class="cta-text">Що далі?</p>
        <div class="features">
          <div class="feature">
            <span class="feature-icon">🚀</span>
            <span>Швидка розробка</span>
          </div>
          <div class="feature">
            <span class="feature-icon">⚡</span>
            <span>Блискавична продуктивність</span>
          </div>
          <div class="feature">
            <span class="feature-icon">🎨</span>
            <span>Сучасний UI</span>
          </div>
        </div>
      </div>
    </div>

    <div class="background-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
  </div>
</template>

<style scoped>
.greetings {
  position: relative;
  padding: 3rem 1.5rem;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.icon-wrapper {
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
}

.icon {
  width: 80px;
  height: 80px;
  color: #42b883;
  filter: drop-shadow(0 4px 20px rgba(66, 184, 131, 0.3));
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.main-title {
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite;
  display: inline-block;
}

@keyframes shimmer {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
}

.subtitle {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: #666;
  line-height: 1.8;
  margin-bottom: 3rem;
  font-weight: 400;
}

.tech-link {
  color: inherit;
  text-decoration: none;
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin: 0 0.2rem;
  position: relative;
}

.link-icon {
  font-size: 1.1em;
}

.tech-link.vite {
  color: #646cff;
  background: rgba(100, 108, 255, 0.1);
}

.tech-link.vite:hover {
  background: rgba(100, 108, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
}

.tech-link.vue {
  color: #42b883;
  background: rgba(66, 184, 131, 0.1);
}

.tech-link.vue:hover {
  background: rgba(66, 184, 131, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
}

.cta-section {
  margin-top: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.05) 0%, rgba(53, 73, 94, 0.05) 100%);
  border-radius: 20px;
  border: 1px solid rgba(66, 184, 131, 0.2);
  backdrop-filter: blur(10px);
}

.cta-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #35495e;
  margin-bottom: 1.5rem;
}

.features {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-weight: 500;
  color: #35495e;
}

.feature:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.2);
}

.feature-icon {
  font-size: 1.5rem;
}

.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: pulse 4s ease-in-out infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #42b883, #35495e);
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #646cff, #42b883);
  bottom: -150px;
  left: -150px;
  animation-delay: 1s;
}

.circle-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #35495e, #646cff);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 2s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.15;
  }
}

@media (min-width: 1024px) {
  .greetings {
    padding: 4rem 2rem;
  }

  .content-wrapper {
    text-align: left;
  }

  .icon-wrapper {
    text-align: left;
  }

  .features {
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .features {
    flex-direction: column;
    align-items: stretch;
  }

  .feature {
    justify-content: center;
  }
}
</style>
