<template>
  <form class="loginForm" id="signIn">
    <div>
      Введите E-mail: <br>
      <input type="email"  class="defaultInput"  required ref="regEmail" v-model="email"
             placeholder="Ваш E-mail">
    </div>
    <div>
      Задайте пароль: <br>
      <small>(Минимум 8 символов)</small><br>
      <input type="password" required  class="defaultInput"  v-model="password"
             placeholder="*********">
    </div>
    <div>
      Повторите пароль:<br>
      <input type="password" required  class="defaultInput"  v-model="passwordRepeat"
             placeholder="*********">
    </div>
    <button type="button" class="buttonDark buttonLarge" :disabled="!validForm" @click="this.$store.dispatch('userState/confirmNewUser')">
      Зарегистрироваться
    </button>
  </form>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import store from "@/modules/store/store";
export default defineComponent({
  name: "SignIn",
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

<style scoped>

</style>
