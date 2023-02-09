<template>
  <article class="contactBG" v-if="needContact" @click.self="$emit('close-contact')">
    <article class="formContainer">
      <section class="formContainer__selectors">
        <button type="button" @click="showForm = 'login'" :class="{btnActivated: showForm === 'login'}">Inicia sesión</button>
        <button type="button" @click="showForm= 'register'" :class="{btnActivated: showForm === 'register'}">Regístrate</button>
      </section>
      <section class="formContainer__body">
        <p class="formContainer__body--text">Inicia sesión en tu cuenta de cines Haven</p>
        <form class="formContainer__body__form">
          <label for="email">Email</label>
          <input id="email" type="email">
          <label for="password">Contraseña</label>
          <input id="password" type="password">
          <button>Inicia sesión</button>
        </form>
      </section>
    </article>
  </article>
</template>

<script>
export default {
  name: "Contact",
  props: {
    needContact: {
      type: Boolean,
      default: false
    }
  }
}
</script>