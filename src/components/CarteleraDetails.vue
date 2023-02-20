<template>
    <article class="loadingScreen" v-if="isLoading">
        <LoadingScreen
            mensaje-carga="Cargando cartelera de los próximos días.."></LoadingScreen>
    </article>
    <section v-else class="sliderSinceToday sliderDetails">
        <button
            class="sliderSinceToday__sliderButton"
            @click="showPreviousDates">
            <img src="../assets/icons/left.svg" alt="Atras">
        </button>
        <section
            class="sliderSinceToday__item"
            v-for="date in visibleDates"
            :key="date"
            @click="toggleClass(date)"
            v-bind:class="{'selected': date === selectedDate}"
            >
            {{date.formattedDate}}
        </section>
        <button
            class="sliderSinceToday__sliderButton"
            @click="showNextDates">
            <img src="../assets/icons/right.svg" alt="Siguiente">
        </button>
    </section>
    <section class="carteleraUnica">
        <section class="carteleraUnica__hours">
            <p @click="handleBuy" class="carteleraUnica__hours--item" v-for="hour in hoursList" >{{hour}}</p>
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
     * @file CarteleraDetails.vue - Componente que contiene la cartelera de una película
     * @author José Luis Tocino Rojo
     * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
     */

    /**
     * @property {string} name - Nombre del componente
     * @property {Object} components - Componentes que se utilizan en el componente
     * @property {Object} components.LoadingScreen - Componente pantalla de carga
     * @property {Object} components.BuyConfirmation - Componente confirmación de compra
     * @vue-prop {Object} sessions - Sesiones de la película
     * @vue-data {Array} dates - Fechas de las sesiones
     * @vue-data {Array} movieSessions - Sesiones de la película
     * @vue-data {Array} visibleDates - Fechas visibles en el slider
     * @vue-data {number} [index = 0] - Índice de la fecha seleccionada
     * @vue-data {string} selectedDate - Fecha seleccionada
     * @vue-data {Array} hoursList - Lista de horas de la fecha seleccionada
     * @vue-data {boolean} [isLoading = false] - Indica si se está cargando la cartelera
     * @vue-data {boolean} [showConfirmation = false] - Indica si se muestra la confirmación de compra
     */
    export default {
        name: "CarteleraDetails",
        components: {BuyConfirmation, LoadingScreen},
        props: ["sessions"],
        data(){
            return{
                dates : [],
                movieSessions : this.sessions,
                visibleDates: [],
                index: 0,
                selectedDate: "",
                hoursList: [],
                isLoading: false,
                showConfirmation: false
            }
        },
        // Cuando se actualiza la fecha seleccionada se actualiza la lista de horas de ese dia
        watch:{
            selectedDate: function (val) {
                this.showHours(val)
            }
        },
        methods:{
            /**
             * Muestra la confirmación de compra
             */
            handleBuy(){
                this.showConfirmation = true
            },
            /**
             * Oculta la confirmación de compra
             */
            handleConfirmation(){
                this.showConfirmation = false
            },
            /**
             * Ordena las fechas de las sesiones
             */
            sortDates(){
                let uniqueDates = new Set();

                // Se recogen todas las fechas de las sesiones de manera única
                this.sessions.forEach(session => {
                    uniqueDates.add(session["date"])
                })

                // Se convierte el set en un array y se ordena
                this.dates = Array.from(uniqueDates)

                // Se ordenan las fechas
                this.dates.sort(function (a, b) {
                    return new Date(a) - new Date(b)
                })
            },
            /**
             * Actualiza las fechas visibles en el slider
             */
            updateVisibleDates(){
                this.visibleDates = []
                // Como máximo se muestran 4 fechas en el slider
                const wantedDates = this.dates.slice(this.index, this.index + 4)
                // Recorremos las fechas y las formateamos
                wantedDates.forEach(date => {
                    let dateString ;
                    let dateParts = date.split("/")
                    let formattedDate = new Date(dateParts[2], dateParts[1]-1, dateParts[0])
                    let today = new Date();
                    let tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));

                    // Se formatea la fecha con hoy, mañana o el día de la semana correspondiente
                    if(formattedDate.toDateString() === today.toDateString()){
                        dateString = "Hoy"
                    } else if(formattedDate.toDateString() === tomorrow.toDateString()){
                        dateString = "Mañana"
                    } else {
                        const options = {day: "numeric", month: "2-digit", weekday: "long"};
                        dateString = formattedDate.toLocaleDateString("es-ES",options).replace(",","");
                    }

                    // Se añade la fecha al array de fechas visibles
                    this.visibleDates.push({date:date, formattedDate: dateString})
                })
            },
            /**
             * Muestra las horas de la fecha seleccionada
             * @param {string} date - Fecha seleccionada
             */
            showHours(date){
                this.hoursList = []
                this.movieSessions.forEach(session => {
                    if(session.date === date.date){
                        session.time.forEach(time => {
                            this.hoursList.push(time)
                        })
                    }
                })
            },
            /**
             * Muestra las siguientes 3 fechas
             */
            showNextDates(){
                  if(this.index < this.dates.length - 3){
                      this.index++;
                      this.visibleDates = this.dates.slice(this.index, this.index + 3);
                  }
              },
            /**
             * Muestra las 3 fechas anteriores
             */
            showPreviousDates(){
                  if(this.index > 0){
                      this.index--;
                      this.visibleDates = this.dates.slice(this.index, this.index + 3);
                  }
              },
            /**
             * Cambia la clase de la fecha seleccionada y actualiza la lista de horas
             * @param date
             */
              toggleClass(date){
                  this.selectedDate = date;
              }
        },
        // Al montar el componente se ordenan las fechas y se actualizan las fechas visibles
        mounted(){
            this.sortDates();
            this.updateVisibleDates();
            this.selectedDate = this.visibleDates[0];
        }
    }
</script>