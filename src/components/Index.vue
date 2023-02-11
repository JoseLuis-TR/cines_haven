<template>
  <Header></Header>
  <main>
    <article class="released">
      <h2 class="released__title">Hoy en cartelera</h2>
      <h2 v-for="item in todaySessions" class="released__title">{{ item }}</h2>
    </article>
    <article class="toBeReleased">
      <h2 class="toBeReleased__title">Cartelera de los próximos días</h2>
      <Cartelera></Cartelera>
    </article>
  </main>
</template>

<script>
import Header from "./Header.vue";
import {defineComponent} from "vue";
import Cartelera from "./Cartelera.vue";

export default defineComponent({
  components: {Cartelera, Header},
  data(){
    return{
      todaySessions : [],
      sinceToday : [],
    }
  },
  async created() {
    this.todaySessions = await this.getTodaySessions();
    },
  methods: {
    async getTodaySessions() {
      let response = await fetch('http://localhost:3001/havenV1/sessions/today')
      return response.json();
    }
  }
})

</script>