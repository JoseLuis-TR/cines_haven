<template>
  <Header></Header>
  <main class="mainDetails" v-if="movieDetails.length > 0">
    <div class="containerBG">
      <img 
        class="containerBG__image"
         :src="movieDetails[0].screenshot"
        alt="Captura de pantalla de pelicula">
    </div>
    <article class="containerInfo">
      <img 
        class="containerInfo__poster"
         :src="movieDetails[0].poster_image"
        alt="Poster de pelicula">
      <p class="containerInfo__titulo">{{movieDetails[0].title}}</p>
      <p class="containerInfo__director">Dirigida por: <b>{{movieDetails[0].director}}</b></p>
      <p class="containerInfo__minutos">{{movieDetails[0].time}}utos</p>
    </article>
    <article class="containerData">
      <p class="containerData__title">Sinopsis</p>
      <span class="containerData__underline"></span>
      <p class="containerData__sinopsis">
        {{movieDetails[0].synopsis}}
      </p>
    </article>
    <article class="containerData">
      <p class="containerData__title">Trailer</p>
      <span class="containerData__underline"></span>
      <iframe class="containerData__trailer" :src="`https://www.youtube.com/embed/` + movieDetails[0].trailer" allowfullscreen></iframe>
    </article>
    <article class="containerData">
      <p class="containerData__title">Sesiones</p>
      <span class="containerData__underline"></span>
      <CarteleraDetails
        :sessions="this.movieDetails[0].sessions">
      </CarteleraDetails>
    </article>
  </main>
  <Footer></Footer>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import CarteleraDetails from "./CarteleraDetails.vue";
/**
 * @file MovieDetails.vue - Componente que muestra los detalles de una pelicula
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */
/**
 * @property {string} name - Nombre del componente
 * @property {object} components - Componentes que se renderizan en el componente
 * @property {Object} components.Header - Componente header de la aplicación
 * @property {Object} components.Footer - Componente footer de la aplicación
 * @property {Object} components.CarteleraDetails - Componente que muestra las sesiones de una pelicula en los siguientes dias
 * @vue-data {Array} movieDetails - Array que contiene los detalles de la pelicula
 * @vue-data {boolean} [isLoading = false] - Indica si se está cargando la información de la pelicula
*/
export default {
  name: "movieDetails",
  components: { Footer, Header, CarteleraDetails },
  data(){
    return{
      movieDetails: [],
      isLoading: false
    }
  },
  methods:{
    /**
     * Obtiene los detalles de una pelicula
     * @param {string} movieID - ID de la pelicula
     * @returns {Promise} - Promise que devuelve los detalles de la pelicula
     */
    async getMovieDetails(movieID){
      this.isLoading = true
      return await fetch(`https://backcines-haven.onrender.com/havenV1/movies/${movieID}`)
          .then(response => response.json())
          .then(data => {
            this.movieDetails = data
            this.isLoading = false
          })
    }
  },
  /**
   * Obtiene los detalles de la pelicula al cargar el componente y cambia el titulo de la pagina
   */
  async mounted(){
    await this.getMovieDetails(this.$route.params.id);
    document.title = `Cines Haven - ${this.movieDetails[0].title}`
  }
}
</script>