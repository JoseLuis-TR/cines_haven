<template>
  <Transition name="menuBackground">
    <article class="menuContainer" v-if="isOpened" @click.self="$emit('close-menu')">
      <Transition name="menuModal" appear>
        <nav class="menuContainer__overlay">
          <header class="menuContainer__overlay__header" @click="handleUser">
            <img class="menuContainer__overlay__header--fondo" src="src/assets/images/spacejam.jpg">
            <p class="menuContainer__overlay__header--texto">Registrese<br>o<br>Inicie sesión</p>
          </header>
          <router-link to="/" class="menuContainer__overlay__enlace">
            <ion-icon class="menuContainer__overlay__enlace--icono" name="home-outline"></ion-icon>
            <p class="menuContainer__overlay__enlace--texto">Inicio</p>
          </router-link>
          <router-link to="" class="menuContainer__overlay__enlace">
            <ion-icon class="menuContainer__overlay__enlace--icono" name="film-outline"></ion-icon>
            <p class="menuContainer__overlay__enlace--texto">Cartelera</p>
          </router-link>
          <a class="menuContainer__overlay__enlace" @click="handleContact">
            <ion-icon class="menuContainer__overlay__enlace--icono" name="mail-open-outline"></ion-icon>
            <p class="menuContainer__overlay__enlace--texto">Contacto</p>
          </a>
        </nav>
      </Transition>
    </article>
  </Transition>
</template>

<script>
export default {
  name: "MenuOverlay",
  emits: ['close-menu'],
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
    handleContact(){
      this.$emit('contactForm')
    }
  }
}
</script>