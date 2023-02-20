<template>
  <Transition name="formBackground">
    <article ref="Perfil" class="formBG" v-if="needProfile" @click.self="$emit('close-profile')" v-intersect>
      <article class="formContainer">
        <form @submit.prevent="enviarInfoUsuario" class="formContainer__body" enctype="multipart/form-data" > 
          <fieldset class="formContainer__body__imageHandler">
            <img class="formContainer__body__imageHandler--image" :src="imageUrl" alt="Imagen de perfil">
            <label for="profilePicture" class="formContainer__body__imageHandler--label">
              Escoge imagen de perfil
            </label>
            <input 
              id="profilePicture"
              class="formContainer__body__imageHandler--input" 
              type="file" 
              accept="image/*" 
              @change="handleFileInput" 
              :multiple="false"
              ref="imageFile">
          </fieldset>
          <fieldset class="formContainer__body__userDataHandler">
            <label for="email">Email</label>
            <input 
                v-model="emailData" 
                v-on:blur="validateEmail" 
                :class="{'input_error' : !modEmailOk}" 
                id="email" 
                type="email">
            <label for="username">Usuario</label>
            <input 
                v-model="nickData" 
                v-on:blur="validateUser" 
                :class="{'input_error' : !modUserOk}" 
                id="username" 
                type="text">
            <label for="password">Contraseña</label>
            <input 
                v-model="passData" 
                v-on:blur="validatePass" 
                :class="{'input_error' : !modPassOk}" 
                id="password" 
                type="password">
          </fieldset>
          <Transition name="errorMessage">
            <section v-show="!modEmailOk || !modPassOk || !modUserOk || errorMessage !== null" class="formContainer__body__form--error">
              <ul>
                <li v-if="!modEmailOk">Email no válido</li>
                <li v-if="!modUserOk">Usuario no válido [5 a 20 caracteres, sólo letras y números]</li>
                <li v-if="!modPassOk">Contraseña no válida [8 a 32 caracteres, mayúscula, minúscula, carácter especial y número]</li>
                <li v-if="errorMessage !== ''">{{errorMessage}}</li>
              </ul>
            </section>
          </Transition>
          <button class="formContainer__body__userDataHandler--submit">Modificar usuario</button>
        </form>
      </article>
    </article>
  </Transition>
</template>

<script>
import {validateEmailRegex, validatePasswordRegex, validateUserRegex} from "../functions/formValidations.js";
import {encriptarPass} from "../functions/hashpass.js";

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
      imageFile: "",
      userData: {},
      emailData: "",
      nickData: "",
      passData: "",
      modEmailOk: true,
      modUserOk: true,
      modPassOk: true
    }
  },
  methods: {
    handleFileInput(event) {
      if (event.target.files.length === 1 && event.target.files[0].type.startsWith('image/')) {
        const selectedFile = event.target.files[0];
        this.imageUrl = URL.createObjectURL(selectedFile);
        this.errorMessage = null;
      } else {
        this.errorMessage = "Por favor, seleccione solo un archivo de imagen";
      }
    },
    enviarInfoUsuario(){
      const formData = new FormData();

      formData.append('id', this.userData.id);
      formData.append('email', this.emailData);
      formData.append('nick', this.nickData);
      formData.append('pass', this.passData === "" ? "" : encriptarPass(this.passData));
      formData.append('profilePicture', this.$refs.imageFile.files[0]);


      fetch("https://backcines-haven.onrender.com/havenv1/users/updateuser", {
        method: "PUT",
        body: formData
      })
      .then(response => response.json())
      .then(data =>{
        if(Object.keys(data).length === 0){
          this.errorMessage = data.message
        } else {
          localStorage.setItem('user', JSON.stringify(data))
          this.errorMessage = "Usuario modificado correctamente"
          this.$router.go(this.$route.path)
        }
      })
      
    },
    validateEmail() {
      this.modEmailOk = validateEmailRegex(this.emailData)
    },
    validateUser() {
      this.modUserOk = validateUserRegex(this.nickData)
    },
    validatePass() {
      if(this.passData === ""){
        this.modPassOk = true
      } else 
      this.modPassOk = validatePasswordRegex(this.passData)
    },
  },
  watch: {
    
  },
  mounted(){
    if(localStorage.getItem('user')){
      this.userData = JSON.parse(localStorage.getItem('user'))
      this.emailData = this.userData.email
      this.nickData = this.userData.nick
      if (this.userData.profilePicture !== "") {
        console.log("vacio")
        this.imageUrl = `https://backcines-haven.onrender.com/${this.userData.profilePicture}`
      } else {
        this.imageUrl = `src/assets/images/default.svg`
      }
    }
  }
}
</script>