<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="app-container">
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <div class="logo-wrapper">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
            <div class="logo-glow"></div>
          </div>
        </div>

        <div class="wrapper">
          <HelloWorld msg="You did it!" />

          <nav class="navigation">
            <div class="nav-background"></div>
            <RouterLink to="/" class="nav-link">
              <span class="nav-icon">🏠</span>
              <span class="nav-text">Home</span>
              <span class="nav-indicator"></span>
            </RouterLink>
            <RouterLink to="/about" class="nav-link">
              <span class="nav-icon">ℹ️</span>
              <span class="nav-text">About</span>
              <span class="nav-indicator"></span>
            </RouterLink>
          </nav>
        </div>
      </div>

      <div class="header-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
    </header>

    <main class="main-content">
      <div class="content-wrapper">
        <RouterView v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
    </main>

    <div class="background-pattern"></div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.background-pattern {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(66, 184, 131, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(100, 108, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.header {
  position: relative;
  z-index: 10;
  padding: 2rem 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(66, 184, 131, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.logo-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo-wrapper {
  position: relative;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

.logo {
  display: block;
  width: 100px;
  height: 100px;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 8px 16px rgba(66, 184, 131, 0.3));
  transition: all 0.4s ease;
}

.logo-wrapper:hover .logo {
  transform: scale(1.1) rotate(10deg);
  filter: drop-shadow(0 12px 24px rgba(66, 184, 131, 0.5));
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
  z-index: 1;
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.navigation {
  position: relative;
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  background: white;
  border-radius: 50px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(66, 184, 131, 0.1);
}

.nav-background {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  height: calc(100% - 1.5rem);
  width: calc(50% - 1rem);
  background: linear-gradient(135deg, #42b883 0%, #35a872 100%);
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.4);
  z-index: 1;
}

.navigation:has(.nav-link:nth-child(3).router-link-active) .nav-background {
  left: calc(50% + 0.25rem);
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: #5a6c7d;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  z-index: 2;
  white-space: nowrap;
  min-width: 120px;
  justify-content: center;
}

.nav-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.nav-text {
  transition: all 0.3s ease;
}

.nav-indicator {
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%) scale(0);
  width: 6px;
  height: 6px;
  background: #42b883;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.nav-link:hover {
  color: #2c3e50;
}

.nav-link:hover .nav-icon {
  transform: scale(1.2) translateY(-2px);
}

.nav-link.router-link-active {
  color: white;
}

.nav-link.router-link-active .nav-text {
  font-weight: 700;
}

.nav-link:not(.router-link-active):hover {
  background: rgba(66, 184, 131, 0.05);
}

.header-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: decorationFloat 8s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #42b883, #35495e);
  top: -100px;
  right: -50px;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #646cff, #42b883);
  bottom: -75px;
  left: -50px;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #35495e, #646cff);
  top: 50%;
  left: 30%;
  animation-delay: 4s;
}

@keyframes decorationFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -20px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

.main-content {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 300px);
  padding: 2rem 1.5rem;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* Анімації переходів між сторінками */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Мобільна версія */
@media (max-width: 767px) {
  .header {
    padding: 1.5rem 1rem;
  }

  .logo {
    width: 80px;
    height: 80px;
  }

  .navigation {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    padding: 0.5rem;
    border-radius: 20px;
  }

  .nav-background {
    width: calc(100% - 1rem);
    height: calc(50% - 0.75rem);
    top: 0.5rem;
    left: 0.5rem;
  }

  .navigation:has(.nav-link:nth-child(3).router-link-active) .nav-background {
    top: calc(50% + 0.25rem);
    left: 0.5rem;
  }

  .nav-link {
    width: 100%;
    justify-content: flex-start;
    padding: 1rem 1.5rem;
  }

  .main-content {
    padding: 1.5rem 1rem;
  }
}

/* Планшети */
@media (min-width: 768px) and (max-width: 1023px) {
  .navigation {
    min-width: 280px;
  }
}

/* Десктоп */
@media (min-width: 1024px) {
  .header {
    padding: 2rem 3rem;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  .logo-section {
    margin-bottom: 0;
  }

  .logo {
    width: 125px;
    height: 125px;
  }

  .wrapper {
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  .navigation {
    margin-left: auto;
  }

  .main-content {
    padding: 3rem 3rem;
  }
}

/* Великі екрани */
@media (min-width: 1440px) {
  .header {
    padding: 2.5rem 4rem;
  }

  .main-content {
    padding: 4rem 4rem;
  }
}
</style>
