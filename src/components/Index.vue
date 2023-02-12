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

export default defineComponent({
  components: {Footer, TodayCarousel, Cartelera, Header},
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