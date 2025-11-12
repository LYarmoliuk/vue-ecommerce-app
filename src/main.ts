import { createApp } from 'vue'
import { createPinia } from 'pinia' // Додати цей імпорт
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) // Додати цей рядок
app.use(router)

app.mount('#app')
