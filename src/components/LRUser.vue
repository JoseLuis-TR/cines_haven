<template>
  <Transition name="formBackground">
    <article class="formBG" v-if="isNeeded" @click.self="$emit('close-userForm')">
      <Transition name="formModal">
        <article class="formContainer">
          <section class="formContainer__selectors">
            <button type="button" @click="showForm = 'login'" :class="{btnActivated: showForm === 'login'}">Inicia sesión</button>
            <button type="button" @click="showForm= 'register'" :class="{btnActivated: showForm === 'register'}">Regístrate</button>
          </section>
          <template v-if="showForm === 'login'">
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
          </template>
          <template v-else-if="showForm === 'register'">
            <section class="formContainer__body">
              <p class="formContainer__body--text">Únete para poder disfrutar de todas las opciones que ofrece Cines Haven</p>
              <form class="formContainer__body__form">
                <label for="email">Email</label>
                <input id="email" type="email">
                <label for="username">Usuario</label>
                <input id="username" type="text">
                <label for="password">Contraseña</label>
                <input id="password" type="password">
                <label for="repPassword">Repetir contraseña</label>
                <input id="repPassword" type="password">
                <button>Regístrate</button>
              </form>
            </section>
          </template>
        </article>
      </Transition>
    </article>
  </Transition>
</template>

<script>
export default {
  name: "LRUser",
  props: {
    isNeeded: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      showForm: 'login'
    }
  }
}
</script>