<template>
  <article class="loadingScreen" v-if="isLoading">
    <LoadingScreen
        mensaje-carga="Cargando cartelera de los próximos días.."></LoadingScreen>
  </article>
  <section v-else class="sliderSinceToday">
    <button
        class="sliderSinceToday__sliderButton"
        @click="showPreviousDates">
      <img src="../assets/icons/left.svg" alt="Atras">
    </button>
    <section
        class="sliderSinceToday__item"
        v-for="date in visibleDates"
        :key="date.date"
        @click="toggleClass(date.date)"
        v-bind:class="{'selected': date.date === selectedDate}"
        >
      {{date.formattedDate}}
    </section>
    <button
        class="sliderSinceToday__sliderButton"
        @click="showNextDates">
      <img src="../assets/icons/right.svg" alt="Siguiente">
    </button>
  </section>
  <section  class="infoMovies">
    <section class="infoMovies__item" v-for="session in moviesList">
      <section class="infoMovies__item__data">
        <img class="infoMovies__item__data--poster" 
              :src="session.moviePoster"
              alt="Poster pelicula"
              @click="seeMovieDetails(session.movie_id)">
        <p 
          class="infoMovies__item__data--titulo"
          @click="seeMovieDetails(session.movie_id)">
          {{session.movieName}}
        </p>
        <p class="infoMovies__item__data--sala">{{session.roomName}}</p>
      </section>
      <section class="infoMovies__item__times">
        <p @click="handleBuy" class="infoMovies__item__times--hour" v-for="hour in session.time" >{{hour}}</p>
      </section>
    </section>
  </section>
  <buy-confirmation
      :confirm-buy="showConfirmation"
      @close-confirmation="handleConfirmation">
  </buy-confirmation>
</template>

<script>
import LoadingScreen from "./LoadingScreen.vue";
import BuyConfirmation from "./BuyConfirmation.vue";

export default {
  name: "Cartelera",
  components: {LoadingScreen, BuyConfirmation},
  data(){
    return{
      sinceToday : [],
      dates : [],
      visibleDates: [],
      index: 0,
      selectedDate: "",
      moviesList: [],
      isLoading: false,
      showConfirmation: false
    }
  },
  watch:{
    selectedDate: function (val) {
      this.showHours(val)
    }
  },
  methods:{
    handleBuy(){
      this.showConfirmation = true
    },
    handleConfirmation(){
      this.showConfirmation = false
    },
    async getSinceTodaySessions(){
      return await fetch('https://backcines-haven.onrender.com/havenv1/sessions/sincetoday')
          .then(response => response.json())
          .then(data => {
            this.sinceToday = data
            this.isLoading = false
          })
    },
    sortDates(){
      let uniqueDates = new Set();

      this.sinceToday.forEach(session => {
        uniqueDates.add(session["date"])
      })

      this.dates = Array.from(uniqueDates)

      this.dates.sort(function (a, b) {
        return new Date(a) - new Date(b)
      })
    },
    showPreviousDates(){
      if(this.index > 0){
        this.index -= 1;
        this.updateVisibleDates();
      }
    },
    showNextDates(){
      if(this.index + 4 < this.dates.length){
        this.index += 1;
        this.updateVisibleDates();
      }
    },
    updateVisibleDates(){
      this.visibleDates = []
      const wantedDates = this.dates.slice(this.index, this.index + 4)
      wantedDates.forEach(date => {
        let dateString ;
        let dateParts = date.split("/")
        let formattedDate = new Date(dateParts[2], dateParts[1]-1, dateParts[0])
        let today = new Date()
        let tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));

        if(formattedDate.toDateString() === today.toDateString()){
          dateString = "Hoy"
        } else if(formattedDate.toDateString() === tomorrow.toDateString()){
          dateString = "Mañana"
        } else {
          const options = {day: "numeric", month: "2-digit", weekday: "long"};
          dateString = formattedDate.toLocaleDateString("es-ES",options).replace(",","");
        }

        this.visibleDates.push({date:date, formattedDate: dateString})
      })
    },
    showHours(date){
      this.moviesList = this.sinceToday.filter(
          session => session.date === date
      )
    },
    toggleClass(date){
      this.selectedDate = date;
    },
    seeMovieDetails(movieID){
      this.$router.push(`pelicula/${movieID}`)
    }
  },
  async mounted() {
    this.isLoading = true
    await this.getSinceTodaySessions()
    this.sortDates()
    this.updateVisibleDates()
    this.selectedDate = this.dates[0]
  }
}
</script>
