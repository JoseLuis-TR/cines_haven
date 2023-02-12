<template>
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
</template>

<script>
import CarouselItem from "./CarouselItem.vue";
import CarouselIndicators from "./CarouselIndicators.vue";
export default {
  name: "TodCarousel",
  components: {CarouselIndicators, CarouselItem},
  data(){
    return{
      moviesToday : [],
      currentMovie : 0,
      movieInterval: null
    }
  },
  methods:{
    async getTodaySessions() {
      let response = await fetch('http://localhost:3001/havenV1/sessions/today')
      this.moviesToday = await response.json()
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
    await this.getTodaySessions()
    this.startMovieInterval()
  },
  beforeUnmount() {
    this.stopMovieInterval()
  }
}
</script>
