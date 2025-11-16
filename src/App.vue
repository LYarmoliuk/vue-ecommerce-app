<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { type RouteLocationNormalized } from 'vue-router'
</script>

<template>
  <div id="app-container">
    <AppHeader />

    <main class="main-content">
      <div class="router-view-container">
        <RouterView v-slot="{ Component, route }">
          <transition
            :name="getTransitionName(route)"
            mode="out-in"
            @before-enter="onBeforeEnter"
            @after-enter="onAfterEnter"
          >
            <component
              :is="Component"
              :key="route.path"
              class="page-content"
            />
          </transition>
        </RouterView>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style>
/* ==================== */
/* GLOBAL TRANSITION STYLES */
/* ==================== */

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

/* Scale Transition */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* ==================== */
/* LAYOUT STYLES */
/* ==================== */
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
}

.main-content {
  flex: 1 0 auto;
  padding: 0;
  width: 100%;
  position: relative;
}

.router-view-container {
  position: relative;
  min-height: calc(100vh - 140px);
  overflow-x: hidden;
}

.page-content {
  animation-duration: 0.4s;
  animation-fill-mode: both;
}

/* ==================== */
/* PERFORMANCE OPTIMIZATIONS */
/* ==================== */

/* Hardware acceleration for smooth animations */
.fade-enter-active,
.fade-leave-active,
.slide-enter-active,
.slide-leave-active,
.scale-enter-active,
.scale-leave-active {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  will-change: transform, opacity;
}

/* Prevent layout shifts */
.router-view-container > * {
  contain: layout style paint;
}

/* ==================== */
/* RESPONSIVE DESIGN */
/* ==================== */

@media (max-width: 768px) {
  .main-content {
    padding: 0;
  }

  /* Simpler animations on mobile for better performance */
  .fade-enter-from,
  .fade-leave-to,
  .slide-enter-from,
  .slide-leave-to,
  .scale-enter-from,
  .scale-leave-to {
    transform: none !important;
  }

  .fade-enter-active,
  .fade-leave-active,
  .slide-enter-active,
  .slide-leave-active,
  .scale-enter-active,
  .scale-leave-active {
    transition: opacity 0.3s ease !important;
  }
}

/* ==================== */
/* ACCESSIBILITY */
/* ==================== */

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active,
  .slide-enter-active,
  .slide-leave-active,
  .scale-enter-active,
  .scale-leave-active {
    transition: opacity 0.1s ease !important;
  }

  .fade-enter-from,
  .fade-leave-to,
  .slide-enter-from,
  .slide-leave-to,
  .scale-enter-from,
  .scale-leave-to {
    transform: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .fade-enter-from,
  .fade-leave-to,
  .slide-enter-from,
  .slide-leave-to,
  .scale-enter-from,
  .scale-leave-to {
    opacity: 0.2;
  }
}

/* ==================== */
/* LOADING STATES */
/* ==================== */

/* Optional: Add loading indicator styles */
.page-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

/* ==================== */
/* SMOOTH SCROLLING */
/* ==================== */

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

/* ==================== */
/* FOCUS MANAGEMENT */
/* ==================== */

/* Ensure focus is properly managed during transitions */
.page-content:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* ==================== */
/* BROWSER SPECIFIC OPTIMIZATIONS */
/* ==================== */

/* Safari specific optimizations */
@supports (-webkit-touch-callout: none) {
  .main-content {
    /* Safari needs this for smooth scrolling */
    -webkit-overflow-scrolling: touch;
  }
}

/* Firefox specific optimizations */
@-moz-document url-prefix() {
  .router-view-container {
    /* Firefox performance optimization */
    will-change: transform;
  }
}
</style>

<script lang="ts">
// Additional transition logic can be added here if needed
export default {
  methods: {
    onBeforeEnter() {
      // Optional: Add loading state or analytics
      console.log('Route transition starting')
    },
    onAfterEnter() {
      // Optional: Remove loading state or trigger animations
      console.log('Route transition completed')

      // Scroll to top on route change
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    getTransitionName(route: RouteLocationNormalized) {
      // Ensure we always return a string for the transition name
      if (route && route.meta && typeof route.meta.transition === 'string') {
        return route.meta.transition
      }
      return 'fade'
    }
  }
}
</script>
