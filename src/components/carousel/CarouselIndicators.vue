<template>
  <section class="carousel__controls">
    <transition-group name="indicators">
      <button
          class="carousel__controls--indicators"
          :class="{activeIndicator : currentIndex === index}"
          v-for="(item,index) in total"
          :key="index"
          @click="$emit('changeMovie', index)"
      >
      </button>
    </transition-group>
  </section>
</template>

<script>
/**
 * @file CarouselIndicators.vue - Componente que contiene los indicadores del carrusel
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @property {string} name - Nombre del componente
 * @property {Object} emits - Eventos que emite el componente
 * @property {Object} emits.changeMovie - Evento que emite el componente para cambiar de película
 * @vue-prop {number} total - Número total de películas
 * @vue-prop {number} currentIndex - Índice de la película actual
 */
export default {
  name: "CarouselIndicators",
  emits: ['changeMovie'],
  props: ["total", "currentIndex"]
}
</script>