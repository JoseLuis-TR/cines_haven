<template>
  <Transition name="menuBackground">
    <article class="menuContainer" v-if="isOpened" @click.self="$emit('close-menu')">
      <Transition name="menuModal" appear>
        <nav class="menuContainer__overlay">
          <header v-if="isUserLogged()" @click="openProfile" class="menuContainer__overlay__header">
            <img class="menuContainer__overlay__header--fondo" src="src/assets/images/spacejam.jpg" alt="Fondo Web">
            <img class="menuContainer__overlay__header--fotoPerfil" :src="getProfilePic()" alt="Fondo Web">
            <p class="menuContainer__overlay__header--texto">{{getNick()}}</p>
          </header>
          <header v-else class="menuContainer__overlay__header" @click="handleUser">
            <img class="menuContainer__overlay__header--fondo" src="src/assets/images/spacejam.jpg" alt="Fondo Web">
            <p class="menuContainer__overlay__header--texto">Inicie sesión<br>o<br>Registrese</p>
          </header>
          <router-link to="/" class="menuContainer__overlay__enlace">
            <img src="src/assets/icons/home.svg" alt="Inicio">
            <p class="menuContainer__overlay__enlace--texto">Inicio</p>
          </router-link>
          <section 
              v-if="isUserLogged()"
              @click="logOut"
              class="menuContainer__overlay__enlace logout">
            <img src="src/assets/icons/log-out.svg" alt="Cierre de sesión">
            <p class="menuContainer__overlay__enlace--texto">Cerrar sesión</p>
          </section>
        </nav>
      </Transition>
    </article>
  </Transition>
</template>

<script>
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
    handleUser(){
      this.$emit('userForm')
    },
    openProfile(){
      this.$emit('openProfile')
    },
    isUserLogged(){
      return localStorage.getItem('user') !== null
    },
    getNick(){
      return JSON.parse(localStorage.getItem('user')).nick
    },
    getProfilePic(){
      const userPic = JSON.parse(localStorage.getItem('user'))
      console.log(userPic.profilePicture)
      if (userPic.profilePicture !== "") {
        return `https://backcines-haven.onrender.com/${userPic.profilePicture}`
      } else {
        return `src/assets/images/default.svg`
      }
    },
    logOut(){
      localStorage.removeItem('user')
      if(this.$route.path === "/") this.$router.go()
      else this.$router.push("/");
    }
  }
}
</script>