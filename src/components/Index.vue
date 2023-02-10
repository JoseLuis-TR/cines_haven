<template>
  <Header></Header>
  <main>
    <section class="released">
      <h2 class="released__title">Hoy en cartelera</h2>
      <h2 v-for="item in todaySessions" class="released__title">{{ item }}</h2>
    </section>
    <section class="toBeReleased">
      <h2 class="toBeReleased__title">Cartelera de los próximos días</h2>
      <h2 v-for="item in sinceToday" class="released__title">{{ item }}</h2>
    </section>
  </main>
</template>

<script>
import Header from "./Header.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {Header},
  data(){
    return{
      todaySessions : [],
      sinceToday : []
    }
  },
  async created() {
    this.todaySessions = await this.getTodaySessions();
    this.sinceToday = await this.getSinceTodaySessions()
  },
  methods: {
    async getTodaySessions() {
      let response = await fetch('http://localhost:3001/havenV1/sessions/today')
      return response.json();
    },
    async getSinceTodaySessions(){
      let response = await fetch('http://localhost:3001/havenV1/sessions/sincetoday')
      return response.json()
    }
  }
})

</script>