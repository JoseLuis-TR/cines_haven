<template>
  <Header></Header>
  <main>
    <article class="released">
      <h2 class="released__title">Hoy en cartelera</h2>
      <TodayCarousel></TodayCarousel>
    </article>
    <article class="toBeReleased">
      <h2 class="toBeReleased__title">Cartelera de los próximos días</h2>
      <Cartelera></Cartelera>
    </article>
  </main>
  <Footer></Footer>
</template>

<script>
import Header from "./Header.vue";
import {defineComponent} from "vue";
import Cartelera from "./Cartelera.vue";
import TodayCarousel from "./carousel/TodayCarousel.vue";
import Footer from "./Footer.vue";

/**
 * @file Index.vue - Componente inicial de la aplicación
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @property {string} name - Nombre del componente
 * @property {Object} components - Componentes que se utilizarán en el inicio
 * @property {Object} components.Header - Componente Header
 * @property {Object} components.Cartelera - Componente Cartelera de los próximos días
 * @property {Object} components.TodayCarousel - Componente Carousel de las películas de hoy
 * @property {Object} components.Footer - Componente Footer
 */
export default defineComponent({
  components: {Footer, TodayCarousel, Cartelera, Header}
})

</script>