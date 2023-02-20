<template>
  <header class="header">
    <RouterLink to="/" class="header__logocontainer" ><img class="header__logocontainer--logo" src="../assets/images/logoHaven.png" alt="Logo Cines Heaven"></RouterLink>
    <div class="header__spacer"></div>
    <img class="header__icon" src="../assets/icons/menu.svg" alt="Menu" @click="handleMenu">
  </header>
  <menu-overlay
      :is-opened="showMenu"
      @close-menu="handleMenu"
      @user-form="openUserForm"
      @open-profile="openProfile">
  </menu-overlay>
  <LRUser
      :is-needed="showForm"
      @close-user-Form="handleUserForm">
  </LRUser>
  <Profile
      :need-profile="showProfile"
      @close-profile="handleProfile">
</Profile>
</template>

<script>
import MenuOverlay from "./MenuOverlay.vue";
import LRUser from "./LRUser.vue";
import Profile from "./Profile.vue";
/**
 * @file Header.vue - Componente que contiene el header de la aplicación
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @property {string} name - Nombre del componente
 * @property {Object} components - Componentes que se utilizan en el header
 * @property {Object} components.MenuOverlay - Componente menú de navegación
 * @property {Object} components.LRUser - Componente formulario de login o registro
 * @property {Object} components.Profile - Componente perfil del usuario
 * @vue-data {boolean} [showMenu = false] - Indica si se muestra el menú de navegación
 * @vue-data {boolean} [showForm = false] - Indica si se muestra el formulario de login o registro
 * @vue-data {boolean} [showProfile = false] - Indica si se muestra el perfil del usuario
 */
export default {
  name: "Header",
  components: {Profile, LRUser, MenuOverlay},
  data(){
    return {
      showMenu: false,
      showForm: false,
      showProfile: false
    }
  },
  methods: {
    /**
     * Función que cambia el valor de showMenu para mostrar o esconder el menú de navegación
     */
    handleMenu(){
      this.showMenu = !this.showMenu
    },
    /**
     * Función que cambia el valor de showForm para mostrar o esconder el formulario de
     * login o registro además de cerrar el menu de navegación
     */
    openUserForm(){
      this.showMenu = !this.showMenu
      this.showForm = !this.showForm
    },
    /**
     * Función que cambia el valor de showForm para mostrar o esconder el formulario de
     * login o registro
     */
    handleUserForm(){
      this.showForm = !this.showForm
    },
    /**
     * Función que cambia el valor de showProfile para mostrar o esconder la pantalla de
     * modificación de usuario además de cerrar el menu de navegación
     */
    openProfile(){
      this.showMenu = !this.showMenu
      this.showProfile = !this.showProfile
    },
    /**
     * Función que cambia el valor de showProfile para mostrar o esconder la pantalla de
     * modificación de usuario
     */
    handleProfile(){
      this.showProfile = !this.showProfile
    }
  }
}
</script>