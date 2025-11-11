import axios from 'axios';

// Базове налаштування axios
const api = axios.create({
  baseURL: 'https://fakestoreapi.com', // або твій API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Інтерцептор для обробки помилок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обробка різних типів помилок
    if (error.response) {
      // Помилка від сервера
      console.error('API Error:', error.response.status, error.response.data);

      switch (error.response.status) {
        case 401:
          console.error('Unauthorized - перевір токен аутентифікації');
          break;
        case 404:
          console.error('Ресурс не знайдено');
          break;
        case 500:
          console.error('Внутрішня помилка сервера');
          break;
        default:
          console.error('Неочікувана помилка');
      }
    } else if (error.request) {
      // Помилка мережі
      console.error('Network Error - перевір підключення до інтернету');
    } else {
      // Інші помилки
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Інтерцептор для додавання заголовків (наприклад, токену)
api.interceptors.request.use(
  (config) => {
    // Тут можна додати токен аутентифікації
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
