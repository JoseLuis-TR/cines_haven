<template>
  <Transition name="movie_in_view">
    <article
        class="carousel__container"
        v-show="currentMovie === index"
        @click="seeMovieDetails(todayMovie.movie_id)">
        <img
            class="carousel__container--image"
            :src="todayMovie.movieScreen"
            alt="Captura de pelicula">
        <section
            class="carousel__container__cuadroTexto">
          <p
              class="carousel__container__cuadroTexto--title">
            {{todayMovie.movieName}}
          </p>
        </section>
    </article>
  </Transition>
</template>

<script>
/**
 * @file CarouselItem.vue - Componente que contiene la información de cada película del carrusel
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @property {string} name - Nombre del componente
 * @vue-prop {Object} todayMovie - Objeto que contiene la información de la película
 * @vue-prop {number} index - Índice de la película en el carrusel
 * @vue-prop {number} currentMovie - Índice de la película que se está mostrando en el carrusel
 */
export default {
  name: "CarouselItem",
  props: ["todayMovie", "currentMovie", "index"],
  methods:{
    /**
     * Función que redirige a la página de la película
     * @param {number} movieID - ID de la película
     */
    seeMovieDetails(movieID){
      this.$router.push(`pelicula/${movieID}`)
    }
  }
}
</script>
