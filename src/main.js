import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import './assets/sass/main.sass'
import App from './App.vue'
import Index from './components/Index.vue'
import MovieDetails from "./components/MovieDetails.vue";

// Importaciones de Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives
})

// Se definen las rutas que serán utilizadas en nuestra aplicación
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

// Se crea el router
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// Se define el título de la página
router.beforeEach((to, from) => {
    document.title = to.meta?.title ?? 'Haven'
})

// Se crea la aplicación
const app = createApp(App)

// Se agregan las dependencias
app.use(router)
app.use(vuetify)

// Se monta la aplicación
app.mount('#app')