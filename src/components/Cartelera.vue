<template>
  <section v-if="sinceToday" class="sliderSinceToday">
    <button
        class="sliderSinceToday__previousButton"
        @click="showPreviousDates">
      <ion-icon name="caret-back-outline"></ion-icon>    </button>
    <section
        class="sliderSinceToday__item"
        v-for="date in visibleDates"
        :key="date"
        @click="showHours(date)"
        :class="{'selected': date === selectedDate}">
      {{date}}
    </section>
    <button
        class="sliderSinceToday__nextButton"
        @click="showNextDates">
    </button>
  </section>
  <section v-if="moviesList" class="infoMovies">
    <p v-for="session in moviesList">{{session}}</p>
  </section>
</template>

<script>
export default {
  name: "Cartelera",
  data(){
    return{
      sinceToday : [],
      dates : [],
      visibleDates: [],
      index: 0,
      selectedDate: "",
      moviesList: []
    }
  },
  methods:{
    async getSinceTodaySessions(){
      let response = await fetch('http://localhost:3001/havenV1/sessions/sincetoday')
      this.sinceToday = await response.json()
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
      console.log(this.dates)
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
      this.visibleDates = this.dates.slice(this.index, this.index + 4)
      if(this.visibleDates.length < 4){
        this.visibleDates.push(...Array(4-this.visibleDates.length).fill(""));
      }
    },
    showHours(date){
      this.moviesList = this.sinceToday.filter(
          session => session.date === date
      )
      this.selectedDate = date;
    }
  },
  async mounted() {
    await this.getSinceTodaySessions()
    this.sortDates()
    this.updateVisibleDates()
  }
}
</script>
