<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <div class="welcome-container">
    <div class="welcome-grid">
      <WelcomeItem class="welcome-card card-hover">
        <template #icon>
          <div class="icon-wrapper documentation">
            <DocumentationIcon />
          </div>
        </template>
        <template #heading>
          <span class="heading-text">Документація</span>
          <span class="badge">Старт тут</span>
        </template>

        <p class="description">
          Офіційна
          <a href="https://vuejs.org/" target="_blank" rel="noopener" class="link">документація Vue</a>
          надає всю необхідну інформацію для початку роботи.
        </p>
      </WelcomeItem>

      <WelcomeItem class="welcome-card card-hover">
        <template #icon>
          <div class="icon-wrapper tooling">
            <ToolingIcon />
          </div>
        </template>
        <template #heading>
          <span class="heading-text">Інструменти</span>
          <span class="badge badge-purple">Dev Tools</span>
        </template>

        <p class="description">
          Проект використовує
          <a href="https://vite.dev/guide/features.html" target="_blank" rel="noopener" class="link">Vite</a>.
          Рекомендоване середовище —
          <a href="https://code.visualstudio.com/" target="_blank" rel="noopener" class="link">VSCode</a>
          з
          <a href="https://github.com/vuejs/language-tools" target="_blank" rel="noopener" class="link">Vue - Official</a>.
        </p>

        <div class="tools-list">
          <span class="tool-tag">
            <a href="https://vitest.dev/" target="_blank" rel="noopener" class="link-plain">Vitest</a>
          </span>
          <span class="tool-tag">
            <a href="https://www.cypress.io/" target="_blank" rel="noopener" class="link-plain">Cypress</a>
          </span>
          <span class="tool-tag">
            <a href="https://playwright.dev/" target="_blank" rel="noopener" class="link-plain">Playwright</a>
          </span>
        </div>

        <div class="readme-link">
          <a href="javascript:void(0)" @click="openReadmeInEditor" class="link-secondary">
            📄 Детальніше в <code>README.md</code>
          </a>
        </div>
      </WelcomeItem>

      <WelcomeItem class="welcome-card card-hover">
        <template #icon>
          <div class="icon-wrapper ecosystem">
            <EcosystemIcon />
          </div>
        </template>
        <template #heading>
          <span class="heading-text">Екосистема</span>
          <span class="badge badge-teal">Бібліотеки</span>
        </template>

        <p class="description">
          Офіційні інструменти та бібліотеки для вашого проекту:
        </p>

        <div class="ecosystem-grid">
          <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener" class="ecosystem-item">
            <span class="eco-icon">🍍</span>
            <span>Pinia</span>
          </a>
          <a href="https://router.vuejs.org/" target="_blank" rel="noopener" class="ecosystem-item">
            <span class="eco-icon">🛣️</span>
            <span>Vue Router</span>
          </a>
          <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener" class="ecosystem-item">
            <span class="eco-icon">🧪</span>
            <span>Test Utils</span>
          </a>
          <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener" class="ecosystem-item">
            <span class="eco-icon">🔧</span>
            <span>Dev Tools</span>
          </a>
        </div>

        <p class="more-resources">
          Більше ресурсів на
          <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener" class="link">Awesome Vue</a>
        </p>
      </WelcomeItem>

      <WelcomeItem class="welcome-card card-hover">
        <template #icon>
          <div class="icon-wrapper community">
            <CommunityIcon />
          </div>
        </template>
        <template #heading>
          <span class="heading-text">Спільнота</span>
          <span class="badge badge-pink">Підтримка</span>
        </template>

        <p class="description">
          Потрібна допомога? Задайте питання на:
        </p>

        <div class="community-links">
          <a href="https://chat.vuejs.org" target="_blank" rel="noopener" class="community-link discord">
            <span class="comm-icon">💬</span>
            <div class="comm-content">
              <strong>Vue Land</strong>
              <small>Офіційний Discord</small>
            </div>
          </a>

          <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener" class="community-link stackoverflow">
            <span class="comm-icon">📚</span>
            <div class="comm-content">
              <strong>StackOverflow</strong>
              <small>Питання та відповіді</small>
            </div>
          </a>
        </div>

        <div class="social-links">
          <a href="https://bsky.app/profile/vuejs.org" target="_blank" rel="noopener" class="social-link">
            <span>🦋 Bluesky</span>
          </a>
          <a href="https://x.com/vuejs" target="_blank" rel="noopener" class="social-link">
            <span>𝕏 Twitter</span>
          </a>
        </div>
      </WelcomeItem>

      <WelcomeItem class="welcome-card card-hover support-card">
        <template #icon>
          <div class="icon-wrapper support">
            <SupportIcon />
          </div>
        </template>
        <template #heading>
          <span class="heading-text">Підтримати Vue</span>
          <span class="badge badge-gold">❤️ Спонсор</span>
        </template>

        <p class="description">
          Як незалежний проект, Vue покладається на підтримку спільноти. Ви можете допомогти,
          <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener" class="link link-sponsor">ставши спонсором</a>.
        </p>

        <div class="support-cta">
          <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener" class="sponsor-button">
            <span>💚</span>
            <span>Стати спонсором</span>
          </a>
        </div>
      </WelcomeItem>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  padding: 2rem 0;
}

.welcome-grid {
  display: grid;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(66, 184, 131, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.welcome-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #42b883, #35495e);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.welcome-card:hover::before {
  transform: scaleX(1);
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(66, 184, 131, 0.15);
  border-color: rgba(66, 184, 131, 0.3);
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.documentation {
  background: linear-gradient(135deg, #42b883 0%, #35a872 100%);
}

.tooling {
  background: linear-gradient(135deg, #646cff 0%, #5558d9 100%);
}

.ecosystem {
  background: linear-gradient(135deg, #00d4aa 0%, #00b894 100%);
}

.community {
  background: linear-gradient(135deg, #ff6b9d 0%, #f06292 100%);
}

.support {
  background: linear-gradient(135deg, #ffd700 0%, #ffb900 100%);
}

.welcome-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.heading-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-right: 0.75rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #42b883 0%, #35a872 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(66, 184, 131, 0.3);
}

.badge-purple {
  background: linear-gradient(135deg, #646cff 0%, #5558d9 100%);
  box-shadow: 0 2px 8px rgba(100, 108, 255, 0.3);
}

.badge-teal {
  background: linear-gradient(135deg, #00d4aa 0%, #00b894 100%);
  box-shadow: 0 2px 8px rgba(0, 212, 170, 0.3);
}

.badge-pink {
  background: linear-gradient(135deg, #ff6b9d 0%, #f06292 100%);
  box-shadow: 0 2px 8px rgba(255, 107, 157, 0.3);
}

.badge-gold {
  background: linear-gradient(135deg, #ffd700 0%, #ffb900 100%);
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

.description {
  color: #5a6c7d;
  line-height: 1.7;
  margin-top: 1rem;
  font-size: 1rem;
}

.link {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  padding-bottom: 2px;
}

.link:hover {
  color: #35a872;
  border-bottom-color: #42b883;
}

.tools-list {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.tool-tag {
  padding: 0.5rem 1rem;
  background: rgba(100, 108, 255, 0.1);
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(100, 108, 255, 0.2);
}

.tool-tag:hover {
  background: rgba(100, 108, 255, 0.2);
  transform: translateY(-2px);
}

.link-plain {
  color: #646cff;
  text-decoration: none;
}

.readme-link {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
}

.link-secondary {
  color: #5a6c7d;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.link-secondary:hover {
  color: #42b883;
}

.link-secondary code {
  background: rgba(66, 184, 131, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.ecosystem-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 212, 170, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.ecosystem-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 212, 170, 0.2);
  border-color: #00d4aa;
}

.eco-icon {
  font-size: 1.5rem;
}

.more-resources {
  margin-top: 1.5rem;
  color: #5a6c7d;
  font-size: 0.95rem;
}

.community-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.community-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.community-link:hover {
  transform: translateX(8px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.discord:hover {
  border-color: #5865f2;
  background: linear-gradient(135deg, rgba(88, 101, 242, 0.05), rgba(88, 101, 242, 0.1));
}

.stackoverflow:hover {
  border-color: #f48024;
  background: linear-gradient(135deg, rgba(244, 128, 36, 0.05), rgba(244, 128, 36, 0.1));
}

.comm-icon {
  font-size: 2rem;
}

.comm-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.comm-content strong {
  color: #2c3e50;
  font-size: 1.05rem;
}

.comm-content small {
  color: #5a6c7d;
  font-size: 0.85rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-link {
  flex: 1;
  padding: 0.75rem;
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.1), rgba(66, 184, 131, 0.05));
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(66, 184, 131, 0.2);
}

.social-link:hover {
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.2), rgba(66, 184, 131, 0.1));
  transform: translateY(-2px);
}

.support-card {
  background: linear-gradient(135deg, rgba(255, 248, 220, 0.5) 0%, rgba(255, 243, 205, 0.3) 100%);
}

.link-sponsor {
  color: #ff6b6b;
  font-weight: 700;
}

.link-sponsor:hover {
  color: #ff5252;
}

.support-cta {
  margin-top: 2rem;
  text-align: center;
}

.sponsor-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
}

.sponsor-button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 30px rgba(255, 107, 107, 0.4);
}

@media (min-width: 768px) {
  .welcome-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .welcome-card:nth-child(1),
  .welcome-card:nth-child(5) {
    grid-column: span 2;
  }
}
</style>
