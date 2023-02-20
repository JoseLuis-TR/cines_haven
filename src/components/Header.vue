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
    openProfile(){
      this.showMenu = !this.showMenu
      this.showProfile = !this.showProfile
    },
    handleProfile(){
      this.showProfile = !this.showProfile
    }
  }
}
</script>

<style scoped>

</style>