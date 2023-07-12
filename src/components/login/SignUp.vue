<template>
  <form class="login-form">
    <section class="login-section">
      Введите E-mail: <br>
      <input type="email"  class="input-medium login-input"  required ref="regEmail" v-model="email"
             placeholder="Ваш E-mail">
    </section>
    <section  class="login-section">
      Задайте пароль: <br>
      <small class="text-medium-colored">(Минимум 8 символов)</small>
      <input type="password" required  class="input-medium login-input"  v-model="password"
             placeholder="*********">
    </section>
    <section  class="login-section">
      Повторите пароль:<br>
      <input type="password" required  class="input-medium login-input"  v-model="passwordRepeat"
             placeholder="*********">
    </section>
    <button type="button" class="button-dark button-large" :disabled="!validForm" @click="this.$store.dispatch('userState/confirmNewUser')">
      Зарегистрироваться
    </button>
  </form>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import store from "@/modules/store/store";
export default defineComponent({
  name: "SignUp",
  computed:{
    validForm():boolean{
      return (this.password.length>7 && this.password===this.passwordRepeat && this.isValidEmail(this.email))
    },
    password:{
      get():string {
        return store.getters['userState/getRegisterDataPassword']
      },
      set(value:string){
        store.commit('userState/setRegisterDataPassword', value)
      }
    },
    passwordRepeat:{
      get():string {
        return store.getters['userState/getRegisterDataPasswordRepeat']
      },
      set(value:string){
        store.commit('userState/setRegisterDataPasswordRepeat', value)
      }
    },
    email:{
      get():string {
        return store.getters['userState/getRegisterDataEmail']
      },
      set(value:string){
        store.commit('userState/setRegisterDataEmail', value)
      }
    }
  },
  methods:{
    isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
      return emailRegex.test(email);
    }
  }
})
</script>

