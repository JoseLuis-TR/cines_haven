<template>
  <Transition name="menuBackground">
    <article class="menuContainer" v-if="isOpened" @click.self="$emit('close-menu')">
      <Transition name="menuModal" appear>
        <nav class="menuContainer__overlay">
          <header v-if="isUserLogged()" @click="openProfile" class="menuContainer__overlay__header">
            <img class="menuContainer__overlay__header--fondo" src="../assets/images/spacejam.jpg" alt="Fondo Web">
            <img class="menuContainer__overlay__header--fotoPerfil" :src="getProfilePic()" alt="Fondo Web">
            <p class="menuContainer__overlay__header--texto">{{getNick()}}</p>
          </header>
          <header v-else class="menuContainer__overlay__header" @click="handleUser">
            <img class="menuContainer__overlay__header--fondo" src="../assets/images/spacejam.jpg" alt="Fondo Web">
            <p class="menuContainer__overlay__header--texto">Inicie sesión<br>o<br>Registrese</p>
          </header>
          <router-link to="/" class="menuContainer__overlay__enlace">
            <img src="../assets/icons/home.svg" alt="Inicio">
            <p class="menuContainer__overlay__enlace--texto">Inicio</p>
          </router-link>
          <section 
              v-if="isUserLogged()"
              @click="logOut"
              class="menuContainer__overlay__enlace logout">
            <img src="../assets/icons/log-out.svg" alt="Cierre de sesión">
            <p class="menuContainer__overlay__enlace--texto">Cerrar sesión</p>
          </section>
        </nav>
      </Transition>
    </article>
  </Transition>
</template>

<script>
/**
 * @file MenuOverlay.vue - Componente que contiene el menú de navegación de la aplicación
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @property {string} name - Nombre del componente
 * @property {Object} emits - Eventos que emite el componente
 * @property {Object} emits.close-menu - Evento que emite el componente para cerrar el menú
 * @property {Object} emits.user-form - Evento que emite el componente para abrir el formulario de login o registro
 * @property {Object} emits.open-profile - Evento que emite el componente para abrir el perfil del usuario
 * @vue-prop {boolean} [isOpened = false] - Indica si se muestra el menú de navegación
 */
export default {
  name: "MenuOverlay",
  emits: ['userForm', 'openProfile', 'close-menu'],
  props: {
    isOpened: {
    type: Boolean,
    default: false
    }
  },
  methods: {
    /**
     * Función que emite el evento user-form para abrir el formulario de login o registro
     */
    handleUser(){
      this.$emit('userForm')
    },
    /**
     * Función que emite el evento open-profile para abrir la pagina de modificación de perfil
     */
    openProfile(){
      this.$emit('openProfile')
    },
    /**
     * Función que comprueba si el usuario está logueado
     * @returns {boolean} - Devuelve true si el usuario está logueado
     */
    isUserLogged(){
      return localStorage.getItem('user') !== null
    },
    /**
     * Función que devuelve el nick del usuario logueado
     * @returns {string} - Nick del usuario logueado
     */
    getNick(){
      return JSON.parse(localStorage.getItem('user')).nick
    },
    /**
     * Función que devuelve la url de la foto de perfil del usuario logueado
     * @returns {string} - Url de la foto de perfil del usuario logueado
     */
    getProfilePic(){
      const userPic = JSON.parse(localStorage.getItem('user'))
      console.log(userPic.profilePicture)
      // Si existe una imagen de perfil, se devuelve la url de la imagen
      if (userPic.profilePicture !== "") {
        return `https://backcines-haven.onrender.com/${userPic.profilePicture}`
      } else {
        // Si no existe una imagen de perfil, se devuelve la imagen por defecto
        return `src/assets/images/default.svg`
      }
    },
    /**
     * Función que elimina el usuario logueado del localStorage y redirige a la página de inicio
     */
    logOut(){
      localStorage.removeItem('user')
      if(this.$route.path === "/") this.$router.go()
      else this.$router.push("/");
    }
  }
}
</script>