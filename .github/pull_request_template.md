---Як протестувати---

1. Checkout цей branch: `git checkout dev`
2. Встановити залежності: `npm install`, 'npm install vue-router', 'npm install --save-dev @vue/tsconfig @types/node'
3. Запустити проєкт: `npm run dev`
4. Відкрити: http://localhost:5173
5. Протестувати:
   - Наведи мишку на картку (має бути hover ефект)
   - Натисни "Add to Cart" (має показати alert поки що)
   - Натисни heart icon для wishlist
   - Зменши вікно браузера (перевір responsive)


---Що виконано?---
Створино TypeScript типи:
-Тип товару одягу (Product)
-Тип категорії (Category)
-Тип фільтрів (ProductFilters)

Створено:
-Header
-Footer
-Базові компоненти LoadingSpinner і ErrorMessage

Створено ProductCard компонент:
-Фото товару
-Назва
-Ціна (велика, яскрава)
-Кнопки "Add to Cart", "Add to Wishlist"
-Hover ефекти
-Сітка карток товарів (3-4 колонки)
-Loading state
-Empty state (якщо товарів немає)

Створено FilterPanel компонент:

Input для пошуку за назвою
Input для мінімальної ціни
Input для максимальної ціни
Select для вибору категорії одягу
Кнопка "Apply Filters"
Кнопка "Clear Filters"
Підключити фільтри до HomePage
Синхронізувати фільтри з URL (query parameters)


Створено Pagination компонент:

Кнопки "Previous" та "Next"
Показ поточної сторінки
Disable кнопок коли на першій/останній сторінці

Створено Pinia store для товарів (products.ts):

State: список товарів, завантаження, помилки, фільтри
Actions: отримати товари з API, застосувати фільтри
Getters: відфільтровані товари

Створено Pinia store для категорій:

Actions: отримати список категорій одягу
Додати логіку пагінації:
Поточна сторінка
Кнопки Next/Previous
Offset та limit для API

Створено типи для кошика (CartItem, Cart)
Створено Pinia store для кошика (cart.ts):

State: масив товарів, загальна сума
Actions: додати, видалити, змінити кількість
Збереження в localStorage
Завантаження з localStorage при старті

Створено Pinia store для улюбленого (favorites.ts):

State: масив улюблених товарів
Actions: додати/видалити
Збереження в localStorage

Створено utils/localStorage.ts (helper функції)

Налаштовано Vue Router:

/ (HomePage - каталог)
/product/:id (деталі товару)
/cart (кошик)
/favorites (улюблене)
/404 (сторінка помилки)

Налаштовано Scroll Behavior (скрол до верху при зміні роуту)
Додати Route Guards якщо потрібно


Створено ProductDetailPage:

Галерея фото (3-5 зображень)
Велика назва товару
Ціна (дуже яскраво)
Опис товару
Великі кнопки "Add to Cart", "Add to Wishlist"
Breadcrumbs (навігація)

Створено CartPage:

Список товарів у кошику
CartItem компонент для кожного товару
Можливість змінити кількість (+/-)
Кнопка видалити
CartSummary компонент (загальна сума)
Кнопка "Checkout" (placeholder)

Створено FavoritesPage:

Сітка улюблених товарів
Кнопка "Remove from Wishlist"
Кнопка "Add to Cart"

Створено NotFoundPage (404):

Повідомлення
Кнопка "Go Home"