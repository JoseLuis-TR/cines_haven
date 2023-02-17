<template>
  <Transition name="formBackground">
    <article class="formBG" v-if="needProfile" @click.self="$emit('close-profile')">
      <article class="formContainer">
        <section class="formContainer__body">
          <section class="formContainer__body__imageHandler">
            <img class="formContainer__body__imageHandler--image" :src="imageUrl">
            <input class="formContainer__body__imageHandler--input" type="file" accept="image/*" @change="handleFileInput" :multiple="false">
            <p v-if="errorMessage">{{ errorMessage }}</p>
          </section>
        </section>
      </article>
    </article>
  </Transition>
</template>

<script>
export default {
  name: "Contact",
  props: {
    needProfile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imageUrl: null,
      errorMessage: null,
    }
  },
  methods: {
    handleFileInput(event) {
      if (event.target.files.length === 1 && event.target.files[0].type.startsWith('image/')) {
        const selectedFile = event.target.files[0];
        const objectUrl = URL.createObjectURL(selectedFile);
        this.imageUrl = objectUrl;
        this.errorMessage = null;
      } else {
        this.errorMessage = "Por favor, seleccione solo un archivo de imagen";
      }
    },
  },
}
</script>