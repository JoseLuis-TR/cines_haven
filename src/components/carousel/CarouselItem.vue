<template>
  <Transition name="movie_in_view">
    <article
        class="carousel__container"
        v-show="currentMovie === index">
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
export default {
  name: "CarouselItem",
  props: ["todayMovie", "currentMovie", "index"]
}
</script>
