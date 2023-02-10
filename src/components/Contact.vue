<template>
  <Transition name="formBackground">
    <article class="formBG" v-if="needContact" @click.self="$emit('close-contact')">
      <article class="formContainer">
        <section class="formContainer__body">
          <p class="formContainer__body--titulo">Contacto</p>
          <p class="formContainer__body--text">Utiliza este formulario de contacto para hacernos
            llegar cualquier sugerencia, queja o mensaje que desee</p>
          <form class="formContainer__body__form">
            <label for="email">Email</label>
            <input id="email" type="email">
            <label for="asunto">Asunto</label>
            <input id="asunto" type="text">
            <label for="mensajeContacto">Mensaje</label>
            <textarea id="mensajeContacto"></textarea>
            <button>Enviar mensaje 👩</button>
          </form>
        </section>
      </article>
    </article>
  </Transition>
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