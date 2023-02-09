import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import './assets/sass/main.sass'
import App from './App.vue'
import Index from './components/Index.vue'


const routes = [
    { path : '/', component:Index}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)

app.use(router)

app.mount('#app')