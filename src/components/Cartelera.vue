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
/**
 * @file Cartelera.vue - Componente que contiene la cartelera de las próximas sesiones
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @property {string} name - Nombre del componente
 * @property {Object} components - Componentes que se utilizan en la cartelera
 * @property {Object} components.LoadingScreen - Componente de carga
 * @property {Object} components.BuyConfirmation - Componente de confirmación de compra
 * @vue-data {Array} sinceToday - Array con las sesiones desde hoy
 * @vue-data {Array} dates - Array con las fechas de las sesiones
 * @vue-data {Array} visibleDates - Array con las fechas visibles en el slider
 * @vue-data {number} [index = 0] - Índice de la fecha seleccionada
 * @vue-data {string} selectedDate - Fecha seleccionada
 * @vue-data {Array} moviesList - Array con las películas de la fecha seleccionada
 * @vue-data {boolean} [isLoading = false] - Indica si se está cargando la cartelera
 * @vue-data {boolean} [showConfirmation = false] - Indica si se muestra la confirmación de compra
 */
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
  // Se detecta cuando cambia la fecha seleccionada y se muestran las horas de la fecha seleccionada
  watch:{
    selectedDate: function (val) {
      this.showHours(val)
    }
  },
  methods:{
    /**
     * Muestra el mensaje de confirmación de compra
     */
    handleBuy(){
      this.showConfirmation = true
    },
    /**
     * Oculta el mensaje de confirmación de compra
     */
    handleConfirmation(){
      this.showConfirmation = false
    },
    /**
     * Llama a la api para obtener las sesiones desde hoy
     */
    async getSinceTodaySessions(){
      return await fetch('https://backcines-haven.onrender.com/havenv1/sessions/sincetoday')
          .then(response => response.json())
          .then(data => {
            this.sinceToday = data
            this.isLoading = false
          })
    },
    /**
     * Ordena las fechas de las sesiones recibidas en la llamada
     */
    sortDates(){
      let uniqueDates = new Set();

      // Se crea una lista única de fechas de las sesiones
      this.sinceToday.forEach(session => {
        uniqueDates.add(session["date"])
      })

      // Se crea un array con las fechas únicas
      this.dates = Array.from(uniqueDates)

      // Se ordenan las fechas
      this.dates.sort(function (a, b) {
        return new Date(a) - new Date(b)
      })
    },
    /**
     * Muestra las 3 anteriores fechas y la siguiente
     */
    showPreviousDates(){
      if(this.index > 0){
        this.index -= 1;
        this.updateVisibleDates();
      }
    },
    /**
     * Muestra las 3 siguientes fechas y la anterior
     */
    showNextDates(){
      if(this.index + 4 < this.dates.length){
        this.index += 1;
        this.updateVisibleDates();
      }
    },
    /**
     * Actualiza las fechas visibles en el slider
     */
    updateVisibleDates(){
      this.visibleDates = []
      // Se obtienen las 4 fechas a mostrar
      const wantedDates = this.dates.slice(this.index, this.index + 4)
      // Se formatean las fechas segun el formato deseado
      wantedDates.forEach(date => {
        let dateString ;
        let dateParts = date.split("/")
        let formattedDate = new Date(dateParts[2], dateParts[1]-1, dateParts[0])
        let today = new Date()
        let tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));

        // Se formatea la fecha según el formato deseado
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
    /**
     * Muestra las horas de la fecha seleccionada
     * @param {string} date - Fecha seleccionada
     */
    showHours(date){
      this.moviesList = this.sinceToday.filter(
          session => session.date === date
      )
    },
    /**
     * Cambia la fecha seleccionada
     * @param {string} date - Fecha seleccionada
     */
    toggleClass(date){
      this.selectedDate = date;
    },
    /**
     * Redirige a la página de la película seleccionada
     * @param {number} movieID - ID de la película seleccionada
     */
    seeMovieDetails(movieID){
      this.$router.push(`pelicula/${movieID}`)
    }
  },
  // Cuando se monta el componente se hace la llamada a la api, se ordenan las fechas y se muestran
  // las horas de la primera fecha
  async mounted() {
    this.isLoading = true
    await this.getSinceTodaySessions()
    this.sortDates()
    this.updateVisibleDates()
    this.selectedDate = this.dates[0]
  }
}
</script>
