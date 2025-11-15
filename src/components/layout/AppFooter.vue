<template>
  <footer class="app-footer">
    <div class="footer-content">

      <!-- Секція "Про проект" -->
      <div class="footer-section">
        <h3 class="section-title">Про Проект</h3>
        <p class="section-text">Це E-commerce додаток, створений в рамках лабораторної роботи з Vue.js.</p>
        <p class="section-text">Використані технології: Vue 3, TypeScript, Vue Router, Pinia.</p>
      </div>

      <!-- Секція "Команда" -->
      <div class="footer-section">
        <h3 class="section-title">Команда Розробки</h3>
        <ul class="team-list">
          <li class="team-member">
            <strong class="member-name">Ярмолюк Людмила (Team Lead)</strong><br>
            <a
              href="https://github.com/LYarmoliuk"
              class="github-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub профіль Ярмолюк Людмила"
            >
              GitHub: LYarmoliuk
            </a>
          </li>
          <li class="team-member">
            <strong class="member-name">Сусла Владислав (Developer)</strong><br>
            <a
              href="https://github.com/Vlad8800"
              class="github-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub профіль Сусла Владислав"
            >
              GitHub: Vlad8800
            </a>
          </li>
          <li class="team-member">
            <strong class="member-name">Загребенюк Богдан (Developer)</strong><br>
            <a
              href="https://github.com/booooooo76"
              class="github-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub профіль Загребенюк Богдан"
            >
              GitHub: booooooo76
            </a>
          </li>
        </ul>
      </div>

      <!-- Секція "Посилання" -->
      <div class="footer-section">
        <h3 class="section-title">Корисні Посилання</h3>
        <ul class="links-list">
          <li class="link-item">
            <a
              href="#"
              class="footer-link"
              aria-label="Перейти до сторінки допомоги"
            >
              Допомога
            </a>
          </li>
          <li class="link-item">
            <a
              href="#"
              class="footer-link"
              aria-label="Переглянути політику конфіденційності"
            >
              Політика Конфіденційності
            </a>
          </li>
        </ul>
      </div>

    </div>
    <div class="footer-bottom">
      <p class="copyright">
        &copy; {{ new Date().getFullYear() }} Lino. Всі права захищено.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: #f8f9fa;
  padding: 50px 20px 20px;
  margin-top: 60px;
  border-top: 4px solid #667eea;
  position: relative;
  overflow: hidden;
}

.app-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  position: relative;
  z-index: 1;
}

/* ==================== */
/* FOOTER SECTIONS */
/* ==================== */
.footer-section {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-section:hover {
  transform: translateY(-5px);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffffff;
  position: relative;
  padding-bottom: 10px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.footer-section:hover .section-title::after {
  width: 60px;
}

.section-text {
  color: #adb5bd;
  margin-bottom: 15px;
  line-height: 1.7;
  transition: color 0.3s ease;
}

.footer-section:hover .section-text {
  color: #dee2e6;
}

/* ==================== */
/* TEAM LIST */
/* ==================== */
.team-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.team-member {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.team-member::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.6s ease;
}

.team-member:hover::before {
  left: 100%;
}

.team-member:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.member-name {
  color: #ffffff;
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.team-member:hover .member-name {
  color: #667eea;
}

/* ==================== */
/* GITHUB LINKS */
/* ==================== */
.github-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 4px 8px;
  border-radius: 6px;
  margin: -4px -8px;
  display: inline-block;
}

.github-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #007bff, #0056b3);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.github-link:hover {
  color: #0056b3;
  background: rgba(0, 123, 255, 0.1);
  text-decoration: none;
  transform: translateY(-2px);
}

.github-link:hover::before {
  transform: scaleX(1);
}

.github-link:focus-visible {
  outline: 3px solid #007bff;
  outline-offset: 2px;
  border-radius: 6px;
}

/* ==================== */
/* LINKS LIST */
/* ==================== */
.links-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.link-item {
  margin-bottom: 12px;
}

.footer-link {
  color: #adb5bd;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 8px 12px;
  border-radius: 8px;
  margin: -8px -12px;
  display: inline-block;
}

.footer-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.footer-link:hover {
  color: #ffffff;
  background: rgba(102, 126, 234, 0.1);
  text-decoration: none;
  transform: translateX(10px);
}

.footer-link:hover::before {
  transform: scaleX(1);
}

.footer-link:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 2px;
  border-radius: 8px;
}

/* ==================== */
/* FOOTER BOTTOM */
/* ==================== */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 25px;
  margin-top: 40px;
  text-align: center;
  position: relative;
}

.footer-bottom::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 1px;
}

.copyright {
  color: #adb5bd;
  font-size: 0.95rem;
  margin: 0;
  transition: color 0.3s ease;
}

.footer-bottom:hover .copyright {
  color: #dee2e6;
}

/* ==================== */
/* RESPONSIVE DESIGN */
/* ==================== */
@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
  }

  .app-footer {
    padding: 60px 20px 25px;
  }

  .section-title {
    font-size: 1.375rem;
  }
}

@media (min-width: 1024px) {
  .footer-content {
    gap: 60px;
  }

  .app-footer {
    padding: 70px 20px 30px;
  }
}

/* ==================== */
/* ACCESSIBILITY */
/* ==================== */
@media (prefers-reduced-motion: reduce) {
  .app-footer::before,
  .team-member::before,
  .github-link,
  .footer-link,
  .footer-section,
  .section-title::after {
    transition: none;
    animation: none;
  }

  .footer-section:hover,
  .team-member:hover,
  .github-link:hover,
  .footer-link:hover {
    transform: none;
  }
}

/* ==================== */
/* SMOOTH TRANSITIONS */
/* ==================== */
.github-link,
.footer-link,
.footer-section,
.team-member,
.section-text,
.copyright {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
