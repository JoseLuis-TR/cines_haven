<template>
  <header class="header">
    <RouterLink to="/" class="header__logocontainer" ><img class="header__logocontainer--logo" src="src/assets/images/logoHaven.png" alt="Logo Cines Heaven"></RouterLink>
    <div class="header__spacer"></div>
    <ion-icon class="header__icon" name="menu-outline" @click="handleMenu"></ion-icon>
  </header>
  <menu-overlay
      :is-opened="showMenu"
      @close-menu="handleMenu"
      @user-form="openUserForm"
      @contact-form="openContactMenu">
  </menu-overlay>
  <LRUser
      :is-needed="showForm"
      @close-user-Form="handleUserForm">
  </LRUser>
  <Contact
      :need-contact="showContact"
      @close-contact="handleContact">
  </Contact>
</template>

<script>
import {ref} from "vue";
import MenuOverlay from "./MenuOverlay.vue";
import LRUser from "./LRUser.vue";
import Contact from "./Contact.vue";

export default {
  name: "Header",
  components: {Contact, LRUser, MenuOverlay},
  data(){
    return {
      showMenu: false,
      showForm: false,
      showContact: false
    }
  },
  methods: {
    handleMenu(){
      this.showMenu = !this.showMenu
    },
    openUserForm(){
      this.showMenu = !this.showMenu
      this.showForm = !this.showForm
    },
    handleUserForm(){
      this.showForm = !this.showForm
    },
    openContactMenu(){
      this.showMenu = !this.showMenu
      this.showContact = !this.showContact
    },
    handleContact(){
      this.showContact = !this.showContact
    }
  }
}
</script>

<style scoped>

</style>