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
                <form class="formContainer__body__form" v-on:submit.prevent="checkLogin(userLog,passLog)">
                  <label for="nick">Usuario</label>
                  <input v-model="userLog" id="nick" type="text">
                  <label for="password">Contraseña</label>
                  <input v-model="passLog" id="password" type="password">
                  <Transition name="errorMessage">
                    <section v-show="messageError !== ''" class="formContainer__body__form--error">
                      <ul>
                        <li>{{this.messageError}}</li>
                      </ul>
                    </section>
                  </Transition>
                  <button>Inicia sesión</button>
                </form>
            </section>
          </template>
          <template v-else-if="showForm === 'register'">
            <section class="formContainer__body">
              <p class="formContainer__body--text">Únete para poder disfrutar de todas las opciones que ofrece Cines Haven</p>
              <form class="formContainer__body__form" v-on:submit.prevent="createNewUser(emailReg,nickReg,passReg,repPassReg)">
                <label for="email">Email</label>
                <input v-model="emailReg" v-on:blur="validateEmail" :class="{'input_error' : !regexEmailOk}" id="email" type="email">
                <label for="username">Usuario</label>
                <input v-model="nickReg" v-on:blur="validateUser" :class="{'input_error' : !regexUserOk}" id="username" type="text">
                <label for="password">Contraseña</label>
                <input v-model="passReg" v-on:blur="validatePass" :class="{'input_error' : !regexPassOk}" id="password" type="password">
                <label for="repPassword">Repetir contraseña</label>
                <input v-model="repPassReg" v-on:blur="validateRepeatPass" :class="{'input_error' : !repeatPassOk}" id="repPassword" type="password">
                <Transition name="errorMessage">
                  <section v-show="!regexEmailOk || !regexPassOk || !regexUserOk || !repeatPassOk || messageError !== ''" class="formContainer__body__form--error">
                    <ul>
                      <li v-if="!regexEmailOk">Email no válido</li>
                      <li v-if="!regexUserOk">Usuario no válido [5 a 20 caracteres, sólo letras y números]</li>
                      <li v-if="!regexPassOk">Contraseña no válida [8 a 32 caracteres, mayúscula, minúscula, carácter especial y número]</li>
                      <li v-if="!repeatPassOk">Las contraseñas no coinciden</li>
                      <li v-if="messageError !== ''">{{messageError}}</li>
                    </ul>
                  </section>
                </Transition>
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
import {
  validateEmailRegex,
  validatePasswordRegex,
  validateSamePassRegex,
  validateUserRegex
} from "../functions/formValidations.js";
import { 
  encriptarPass,
  compararPass } from "../functions/hashpass.js";
/**
 * @file LRUser.vue - Componente que contiene el formulario de login y registro
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @property {Object} name - Nombre del componente
 * @vue-prop {Boolean} [isNeeded = false] - Indica si el componente debe mostrarse o no
 * @property {Object} emits - Eventos que emite el componente
 * @property {Object} emits.close-userForm - Evento que emite el componente para cerrarse
 * @vue-data {String} [showForm = login] - Indica si se muestra el formulario de login o registro
 * @vue-data {String} userLog - Almacena el valor del input de usuario del formulario de login
 * @vue-data {String} passLog - Almacena el valor del input de contraseña del formulario de login
 * @vue-data {String} messageError - Almacena el mensaje de error que se muestra en el formulario
 * @vue-data {String} emailReg - Almacena el valor del input de email del formulario de registro
 * @vue-data {String} nickReg - Almacena el valor del input de usuario del formulario de registro
 * @vue-data {String} passReg - Almacena el valor del input de contraseña del formulario de registro
 * @vue-data {String} repPassReg - Almacena el valor del input de repetir contraseña del formulario de registro
 * @vue-data {Boolean} [regexEmailOk = true] - Indica si el email introducido es válido
 * @vue-data {Boolean} [regexUserOk = true] - Indica si el usuario introducido es válido
 * @vue-data {Boolean} [regexPassOk = true] - Indica si la contraseña introducida es válida
 * @vue-data {Boolean} [repeatPassOk = true] - Indica si las contraseñas introducidas coinciden
 */
export default {
  name: "LRUser",
  props: {
    isNeeded: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close-userForm'],
  data(){
    return {
      showForm: 'login',
      userLog: '',
      passLog: '',
      messageError: '',
      emailReg: '',
      nickReg: '',
      passReg: '',
      repPassReg: '',
      regexEmailOk: true,
      regexUserOk: true,
      regexPassOk: true,
      repeatPassOk: true
    }
  },
  // Se detecta cambios en el formulario que debe enseñarse y se resetea el mensaje de error
  watch: {
    showForm(){
      this.messageError = "";
    }
  },
  methods:{
    /**
     * Revisa el login del usuario
     * @param {String} logUser - Nombre de usuario
     * @param {String} logPass - Contraseña
     */
    async checkLogin(logUser,logPass){
      // Se llama a la api usando el nombre de usuario
      await fetch(`https://backcines-haven.onrender.com/havenV1/users/${logUser}`)
          .then(response => response.json())
          .then(data => {
            // Se comprueba si el usuario existe y si la contraseña es correcta
            if(data === false){
              this.messageError = "El usuario no existe"
            } else if(!compararPass(logPass,data[0].password)){
              this.messageError = "Contraseña incorrecta"
            } else {
              this.messageError = 'Login correcto'
              localStorage.setItem('user', JSON.stringify(data[0]))
              if(this.$route.path === "/") this.$router.go()
              else this.$router.push("/");
            }
          })
    },
    /**
     * Valida el email introducido
     */
    validateEmail() {
      this.regexEmailOk = validateEmailRegex(this.emailReg)
    },
    /**
     * Valida el usuario introducido
     */
    validateUser() {
      this.regexUserOk = validateUserRegex(this.nickReg)
    },
    /**
     * Valida la contraseña introducida
     */
    validatePass() {
      this.regexPassOk = validatePasswordRegex(this.passReg)
    },
    /**
     * Valida que las contraseñas introducidas coinciden
     */
    validateRepeatPass(){
      this.repeatPassOk = validateSamePassRegex(this.repPassReg,this.passReg)
    },
    /**
     * Revisa que todos los campos del formulario de registro estén rellenos y sean válidos
     * @returns {Boolean} - Indica si todos los campos son válidos
     */
    lastCheckReg(){
      if(this.regexEmailOk && this.regexUserOk && this.regexPassOk && this.repeatPassOk)
        if(this.emailReg !== '' && this.nickReg !== '' && this.passReg !== '' && this.repPassReg !== '')
          return true
      return false
    },
    /**
     * Crea un nuevo usuario llamando a la api
     * @param {String} emailReg - Email del usuario
     * @param {String} userReg - Nombre de usuario
     * @param {String} passReg - Contraseña
     */
    async createNewUser(emailReg, userReg, passReg){
      // Se comprueba que todos los campos sean válidos
      if(this.lastCheckReg()){
        this.messageError = ''
        // Se crea el objeto con los datos del usuario
        const newUser = {
          "nick" : userReg,
          "email" : emailReg,
          "password" : encriptarPass(passReg)
        }

        // Se llama a la api para crear el usuario
        await fetch('https://backcines-haven.onrender.com/havenV1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)})
            .then(response => response.json())
            .then(data => {
                  // Se comprueba si el usuario se ha creado correctamente
                  if(Object.keys(data).length > 1){
                    this.messageError = "Registro Completado"
                    if(this.$route.path === "/") this.$router.go()
                    else this.$router.push("/");
                  } else {
                    this.messageError = data.message
                  }
            }
            )

      } else {
        // Se muestra un mensaje de error si no se han rellenado todos los campos
        this.messageError = 'Formulario no completo'
      }
    }
  }
}
</script>