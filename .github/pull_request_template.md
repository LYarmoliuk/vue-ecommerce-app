---Як протестувати---

1. Checkout цей branch: `git checkout feature/product-card`
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

