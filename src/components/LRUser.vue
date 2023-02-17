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
                <label for="email">Email {{}}</label>
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
  watch: {
    showForm(){
      this.messageError = "";
    }
  },
  methods:{
    async checkLogin(logEmail,logPass){
      await fetch(`http://localhost:3001/havenV1/users/${logEmail}`)
          .then(response => response.json())
          .then(data => {
            if(data === false){
              this.messageError = "El usuario no existe"
              console.log(this.logError)
            } else if(compararPass(data[0].password, logPass)){
              this.messageError = "Contraseña incorrecta"
              console.log(this.logError)
            } else {
              this.messageError = 'Login correcto'
              console.log(data[0])
              localStorage.setItem('user', JSON.stringify(data[0]))
              if(this.$route.path === "/") this.$router.go()
              else this.$router.push("/");
            }
          })
    },
    validateEmail() {
      this.regexEmailOk = validateEmailRegex(this.emailReg)
    },
    validateUser() {
      this.regexUserOk = validateUserRegex(this.nickReg)
      console.log(this.regexUserOk)
    },
    validatePass() {
      this.regexPassOk = validatePasswordRegex(this.passReg)
    },
    validateRepeatPass(){
      this.repeatPassOk = validateSamePassRegex(this.repPassReg,this.passReg)
    },
    lastCheckReg(){
      if(this.regexEmailOk && this.regexUserOk && this.regexPassOk && this.repeatPassOk)
        if(this.emailReg !== '' && this.nickReg !== '' && this.passReg !== '' && this.repPassReg !== '')
          return true
      return false
    },
    async createNewUser(emailReg, userReg, passReg, repeatPassReg){
      if(this.lastCheckReg()){
        this.messageError = ''
        const newUser = {
          "nick" : userReg,
          "email" : emailReg,
          "password" : encriptarPass(passReg)
        }

        await fetch('http://localhost:3001/havenV1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)})
            .then(response => response.json())
            .then(data => {
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
        console.log("error")
        this.messageError = 'Formulario no completo'
      }
    }
  }
}
</script>