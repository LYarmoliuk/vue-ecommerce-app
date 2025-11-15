<template>
  <!-- Всі класи Tailwind видалено -->
  <footer class="app-footer">
    <div class="footer-content">

      <!-- Секція "Про проект" -->
      <div class="footer-section">
        <h3>Про Проект</h3>
        <p>Це E-commerce додаток, створений в рамках лабораторної роботи з Vue.js.</p>
        <p>Використані технології: Vue 3, TypeScript, Vue Router, Pinia.</p>
      </div>

      <!-- Секція "Команда" -->
      <div class="footer-section">
        <h3>Команда Розробки</h3>
        <ul>
          <li>
            <strong>Ярмолюк Людмила (Team Lead)</strong><br>
            <a href="https://github.com/LYarmoliuk">GitHub: LYarmoliuk</a>
          </li>
          <li>
            <strong>Сусла Владислав (Developer)</strong><br>
            <a href="https://github.com/Vlad8800">GitHub: Vlad8800</a>
          </li>
              <li>
            <strong>Загребенюк Богдан (Developer)</strong><br>
            <a href="https://github.com/booooooo76">GitHub: booooooo76</a>
          </li>
        </ul>
      </div>

      <!-- Секція "Посилання" -->
      <div class="footer-section">
        <h3>Корисні Посилання</h3>
        <ul>
          <li><a href="#">Допомога</a></li>
          <li><a href="#">Політика Конфіденційності</a></li>
        </ul>
      </div>

    </div>
    <div class="footer-bottom">
      &copy; {{ new Date().getFullYear() }} Lino. Всі права захищено.
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #343a40; /* Темний фон */
  color: #f8f9fa; /* Світлий текст */
  padding: 40px 20px 20px;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr; /* 1 колонка на мобільних */
  gap: 30px;
}

.footer-section h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffffff;
}

.footer-section p, .footer-section li {
  color: #adb5bd; /* Сірий текст */
  margin-bottom: 10px;
  line-height: 1.6;
}

.footer-section ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.footer-section a {
  color: #007bff; /* Сині посилання */
  text-decoration: none;
}
.footer-section a:hover {
  text-decoration: underline;
}

.footer-bottom {
  border-top: 1px solid #495057; /* Лінія-розділювач */
  padding-top: 20px;
  margin-top: 30px;
  text-align: center;
  color: #adb5bd;
}

/* Медіа-запит для ПК (desktop) */
@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(3, 1fr); /* 3 колонки на ПК */
  }
}
</style>
