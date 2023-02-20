<template>
  <article class="loadingScreen" v-if="isLoading">
  <LoadingScreen
      mensaje-carga="Cargando cartelera de hoy.."></LoadingScreen>
  </article>
  <Transition v-else name="todayCartelera">
    <article>
      <section
          class="carousel">
        <carousel-item
            v-for="(movie, index) in this.moviesToday"
            :today-movie="movie"
            :key="`movie-${index}`"
            :current-movie="currentMovie"
            :index="index"
            @mouseenter="this.stopMovieInterval"
            @mouseleave="this.startMovieInterval"></carousel-item>
      </section>
      <carousel-indicators
          :total="moviesToday.length"
          :current-index="currentMovie"
          @change-movie="changeMovie($event)">
      </carousel-indicators>
    </article>
  </Transition>
</template>

<script>
import CarouselItem from "./CarouselItem.vue";
import CarouselIndicators from "./CarouselIndicators.vue";
import LoadingScreen from "../LoadingScreen.vue";
/**
 * @file TodayCarousel.vue - Carousel de peliculas que se estan proyectando hoy
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @property {Object} name - Nombre del componente
 * @property {Object} components - Componentes que se utilizan en el carousel
 * @property {Object} components.LoadingScreen - Componente pantalla de carga
 * @property {Object} components.CarouselIndicators - Componente indicadores del carousel
 * @property {Object} components.CarouselItem - Componente item del carousel
 * @vue-data {Array} moviesToday - Array de peliculas que se estan proyectando hoy
 * @vue-data {number} [currentMovie = 0] - Indice de la pelicula que se esta mostrando
 * @vue-data {number} [movieInterval = null] - Intervalo de tiempo para cambiar de pelicula
 * @vue-data {boolean} [isLoading = false] - Indica si se esta cargando la cartelera de hoy
 */
export default {
  name: "TodCarousel",
  components: {LoadingScreen, CarouselIndicators, CarouselItem},
  data(){
    return{
      moviesToday : [],
      currentMovie : 0,
      movieInterval: null,
      isLoading: false
    }
  },
  methods:{
    /**
     * Función que obtiene las peliculas que se estan proyectando hoy
     * @returns {Promise<void>} - Promesa que se resuelve cuando se obtienen las peliculas
     */
    async getTodaySessions() {
      // Llamada a la API para obtener las peliculas que se estan proyectando hoy
      return await fetch('https://backcines-haven.onrender.com/havenv1/sessions/today')
          .then(response => response.json())
          .then(data => {
            // Se asigna el array de peliculas a la variable moviesToday
            this.moviesToday = data
            this.isLoading = false
          })
    },
    /**
     * Función que cambia la pelicula que se esta mostrando
     * @param {number} index - Indice de la pelicula que se quiere mostrar
     */
    setCurrentMovie(index){
      this.currentMovie = index;
    },
    /**
     * Función que inicia el intervalo de tiempo para cambiar de pelicula
     */
    startMovieInterval(){
      this.movieInterval = setInterval(() => {
        const index = this.currentMovie < this.moviesToday.length - 1 ? this.currentMovie + 1 : 0;
        this.setCurrentMovie(index);
      }, 5000)
    },
    /**
     * Función que para el intervalo de tiempo para cambiar de pelicula
     */
    stopMovieInterval(){
      clearInterval(this.movieInterval)
    },
    /**
     * Función que cambia la pelicula que se esta mostrando
     * @param {number} index - Indice de la pelicula que se quiere mostrar
     */
    changeMovie(index){
      this.stopMovieInterval()
      this.currentMovie = index
      this.startMovieInterval()
    }
  },
  // Cuando se monta el componente se obtienen las peliculas que se estan proyectando hoy
  // y se inicia el intervalo de tiempo para cambiar de pelicula
  async mounted() {
    this.isLoading = true
    await this.getTodaySessions()
    this.startMovieInterval()
  }
}
</script>