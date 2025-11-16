# LINO - Vue E-Commerce App

## Опис проєкту
Vue 3 застосунок інтернет-магазину одягу LINO з каталогом товарів, фільтрами, кошиком і списком улюблених. Реалізовано через Composition API, Pinia, Vue Router та TypeScript.
---
## Команда
| Роль                    | ПІБ                | Група   | GitHub                                                 |
|-------------------------|--------------------|---------|--------------------------------------------------------|
| Team Lead               | Ярмолюк Людмила    | 343-5   | [github.com/LYarmoliuk](https://github.com/LYarmoliuk) |
| Developer 1 (UI/UX)     | Сусла Владислав    | 343-5   | [github.com/Vlad8800](https://github.com/Vlad8800)     |
| Developer 2 (Logic/API) | Загребенюк Богдан  | 343-5   | [github.com/booooooo76](https://github.com/booooooo76) |
---
## Використані технології
- **Frontend**: Vue 3 (Composition API), TypeScript, Pinia, Vue Router
- **State Management**: Pinia з persistence через localStorage
- **API Layer**: Axios для HTTP запитів, Fake Store API (тимчасово мокові дані)
- **Performance**: Двохрівневе кешування (memory + localStorage), debounce, lazy loading
- **Tools**: ESLint, Prettier, Vite
- **Styling**: Custom CSS з responsive design
---
Live Demo

https://your-username.github.io/vue-ecommerce-app/

---
## Як запустити проєкт
```bash
Клонувати репозиторій
git clone https://github.com/your-username/vue-ecommerce-app.git
cd vue-ecommerce-app

Встановити залежності
npm install
npm install vue-router 
npm install --save-dev @vue/tsconfig @types/node

Запустити в режимі розробки
npm run dev

Білд для продакшн
npm run build
npm run preview

---
Структура проєкту
vue-ecommerce-app/
│
├── public/
├── src/
│   ├── api/                # API сервіси та mock-дані
│   │   ├── productsApi.ts
│   │   ├── categories.ts
│   │   ├── config.ts
│   │   └── mockData.ts
│   │
│   ├── assets/             # стилі
│   │   └── main.css
│   │
│   ├── components/
│   │   ├── layout/         # хедер/футер
│   │   └── ui/             # UI елементи
│   │       ├── ProductCard.vue
│   │       ├── ProductList.vue
│   │       ├── FilterPanel.vue
│   │       ├── AppPagination.vue
│   │       ├── LoadingSpinner.vue
│   │       └── ErrorMessage.vue
│   │
│   ├── router/
│   │   └── index.ts
│   │
│   ├── stores/             # Pinia stores
│   │   ├── products.ts
│   │   ├── cart.ts
│   │   ├── favorites.ts
│   │   ├── categories.ts
│   │   └── counter.ts
│   │
│   ├── types/              # TS типи
│   │
│   ├── utils/              # утиліти
│   │   ├── cache.ts
│   │   ├── debounce.ts
│   │   ├── localStorage.ts
│   │   └── performance.ts
│   │
│   ├── views/              # сторінки
│   │   ├── HomeView.vue
│   │   ├── ProductDetailView.vue
│   │   ├── CartView.vue
│   │   ├── WishlistView.vue
│   │   ├── AboutView.vue
│   │   └── NotFoundView.vue
│   │
│   ├── App.vue
│   └── main.ts
│
├── package.json
├── vite.config.ts
└── tsconfig.json
---
API ендпоінти, що використовуються
Mock products API (/src/api/productsApi.ts)
getProducts() – повертає список товарів
getProductById(id: number)
getFilteredProducts(filters)
getCategories()
Mock categories API
getCategories() — повертає масив категорій
LocalStorage API
робота з:
- favorites
- cart
- cache
---
 # Функціонал, реалізований у проекті
Каталог товарів:
- показ списку товарів
- сортування (ціна, популярність)
- фільтрація:
   - категорії
   - ціна
- пагінація
- lazy-loading зображень

Картка товару:
- повна інформація про продукт
- кнопка "В кошик"
- кнопка "У вибране"

Кошик:
- додавання товарів
- збільшення/зменшення кількості
- підрахунок загальної суми
- видалення товарів

Вибране:
- додавання/видалення товарів
- збереження у localStorage

Оптимізація продуктивності:
- Debounce для фільтрів
- Кешування товарів
- Кеш категорій
- Локальне збереження кошика та вибраних товарів
- Вимірювання часу завантаження (performance.ts)

Маршрутизація
- / — головна
- /product/:id
- /cart
- /favorites
- /about

