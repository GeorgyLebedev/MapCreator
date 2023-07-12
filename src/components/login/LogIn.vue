<template>
  <form class="login-form">
    <section class="login-section">
	E-mail: <br>
      <input class="input-medium login-input" type="email" required  ref="enterEmail" v-model="username"
             placeholder="Введите E-mail ">
    </section>
    <section class="login-section">
      Пароль:<br>
      <input class="input-medium login-input" type="password" required v-model="password"
             placeholder="*********">
      <div class="cursor-pointer forgot-password-link">
        <small @click="this.$store.commit('userState/setTab','forgotPassword')" class="text-medium-colored "><u>Забыли пароль?</u></small>
      </div>
    </section>
    <button type="button" class="button-dark button-large" :disabled="!validForm"
            @click="this.$store.dispatch('userState/enter')">Войти
    </button>
  </form>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import store from "@/modules/store/store";
export default defineComponent({
  name: "LogIn",
  computed:{
    username:{
      get():string{
        return store.getters['userState/getLoginDataUsername']
      },
      set(value:string){
        store.commit('userState/setLoginDataUsername', value)
      }
    },
    password:{
      get():string{
        return store.getters['userState/getLoginDataPassword']
      },
      set(value:string){
        store.commit('userState/setLoginDataPassword', value)
      }
    },
    validForm():boolean{
      return (this.password.length>=8 && this.isValidEmail(this.username))
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

<style scoped lang="sass">
.forgot-password-link
  margin-block: 10px
</style>
