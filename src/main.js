import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Print  from './printjs'
import { createPinia } from "pinia";
const pinia = createPinia();

// import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Print)

app.mount('#app')
