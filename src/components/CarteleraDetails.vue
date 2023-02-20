<template>
    <article class="loadingScreen" v-if="isLoading">
        <LoadingScreen
            mensaje-carga="Cargando cartelera de los próximos días.."></LoadingScreen>
    </article>
    <section v-else class="sliderSinceToday sliderDetails">
        <button
            class="sliderSinceToday__sliderButton"
            @click="showPreviousDates">
            <img src="src/assets/icons/left.svg" alt="Atras">
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
            <img src="src/assets/icons/right.svg" alt="Siguiente">
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
            sortDates(){
                let uniqueDates = new Set();

                this.sessions.forEach(session => {
                    uniqueDates.add(session["date"])
                })

                this.dates = Array.from(uniqueDates)

                this.dates.sort(function (a, b) {
                    return new Date(a) - new Date(b)
                })
            },
            updateVisibleDates(){
                this.visibleDates = []
                const wantedDates = this.dates.slice(this.index, this.index + 4)
                wantedDates.forEach(date => {
                    let dateString ;
                    let dateParts = date.split("/")
                    let formattedDate = new Date(dateParts[2], dateParts[1]-1, dateParts[0])
                    let today = new Date();
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
                this.hoursList = []
                this.movieSessions.forEach(session => {
                    if(session.date === date.date){
                        session.time.forEach(time => {
                            this.hoursList.push(time)
                        })
                    }
                })
            },
            showNextDates(){
                if(this.index < this.dates.length - 3){
                    this.index++;
                    this.visibleDates = this.dates.slice(this.index, this.index + 3);
                }
            },
            showPreviousDates(){
                if(this.index > 0){
                    this.index--;
                    this.visibleDates = this.dates.slice(this.index, this.index + 3);
                }
            },
            toggleClass(date){
                this.selectedDate = date;
            }
        },
        mounted(){
            this.sortDates();
            this.updateVisibleDates();
            this.selectedDate = this.visibleDates[0];
        }
    }
</script>