<template>
  <p class="loadingScreen__text">{{this.mensajeCarga}}</p>
  <v-progress-circular
      indeterminate
      size="50"
      width="7"
      color="#E5BB3D"></v-progress-circular>
</template>

<script>

/**
 * @file LoadingScreen.vue - Muestra una pantalla de carga con un mensaje y un spinner
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @property {string} name - Nombre del componente
 * @vue-prop {String} mensajeCarga - Mensaje que se muestra en la pantalla de carga
 */
export default {
  name: "LoadingScreen",
  props: ["mensajeCarga"]
}
</script>