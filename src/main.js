import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import './assets/sass/main.sass'
import App from './App.vue'
import Index from './components/Index.vue'


const routes = [
    {
        path : '/',
        component:Index,
        meta:{
            title: "Haven - Inicio",
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from) => {
    document.title = to.meta?.title ?? 'Haven'
})

const app = createApp(App)

app.use(router)

app.mount('#app')