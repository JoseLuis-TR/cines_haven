<template>
  <p class="loadingScreen__text">{{this.mensajeCarga}}</p>
  <v-progress-circular
      indeterminate
      size="50"
      width="7"
      color="#E5BB3D"></v-progress-circular>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: ["mensajeCarga"]
}
</script>

<style scoped>

</style>