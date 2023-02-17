import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import './assets/sass/main.sass'
import App from './App.vue'
import Index from './components/Index.vue'
import MovieDetails from "./components/MovieDetails.vue";

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives
})


const routes = [
    {
        path : '/',
        name: 'Inicio',
        component:Index,
        meta:{
            title: "Cines Haven - Inicio",
        }
    },
    {
        path : '/pelicula/:id',
        name : 'Detalles pelicula',
        component: MovieDetails,
        meta: {
            title: "Cines Haven - Detalles"
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
app.use(vuetify)

app.mount('#app')