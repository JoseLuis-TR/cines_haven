<template>
  <article class="loadingScreen" v-if="isLoading">
  <LoadingScreen
      mensaje-carga="Cargando cartelera de hoy.."></LoadingScreen>
  </article>
  <Transition v-else name="todayCartelera">
    <article>
      <section
          class="carousel">
        <carousel-item
            v-for="(movie, index) in this.moviesToday"
            :today-movie="movie"
            :key="`movie-${index}`"
            :current-movie="currentMovie"
            :index="index"
            @mouseenter="this.stopMovieInterval"
            @mouseleave="this.startMovieInterval"></carousel-item>
      </section>
      <carousel-indicators
          :total="moviesToday.length"
          :current-index="currentMovie"
          @change-movie="changeMovie($event)">
      </carousel-indicators>
    </article>
  </Transition>
</template>

<script>
import CarouselItem from "./CarouselItem.vue";
import CarouselIndicators from "./CarouselIndicators.vue";
import LoadingScreen from "../LoadingScreen.vue";
export default {
  name: "TodCarousel",
  components: {LoadingScreen, CarouselIndicators, CarouselItem},
  data(){
    return{
      moviesToday : [],
      currentMovie : 0,
      movieInterval: null,
      isLoading: false
    }
  },
  methods:{
    async getTodaySessions() {
      return await fetch('https://backcines-haven.onrender.com/havenv1/sessions/today')
          .then(response => response.json())
          .then(data => {
            this.moviesToday = data
            this.isLoading = false
          })
    },
    setCurrentMovie(index){
      this.currentMovie = index;
    },
    startMovieInterval(){
      this.movieInterval = setInterval(() => {
        const index = this.currentMovie < this.moviesToday.length - 1 ? this.currentMovie + 1 : 0;
        this.setCurrentMovie(index);
      }, 5000)
    },
    stopMovieInterval(){
      clearInterval(this.movieInterval)
    },
    changeMovie(index){
      this.stopMovieInterval()
      this.currentMovie = index
      this.startMovieInterval()
    }
  },
  async mounted() {
    this.isLoading = true
    await this.getTodaySessions()
    this.startMovieInterval()
  },
  beforeUnmount() {
    this.stopMovieInterval()
  }
}
</script>