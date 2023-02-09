<template>
  <Header></Header>
  <main>
    <section class="released">
      <h2 class="released__title">En cartelera</h2>
    </section>
    <section class="toBeReleased">
      <h2 class="toBeReleased__title">Próximas sesiones</h2>
    </section>
  </main>
</template>

<script>
import Header from "./Header.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {Header}
})

</script>