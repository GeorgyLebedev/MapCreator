<template>
  <form class="loginForm" id="logIn">
    <div>
      Email: <br>
      <input type="email" required  ref="enterEmail" v-model="username"
             placeholder="Ваш email ">
    </div>
    <div>
      Пароль:<br>
      <input type="password" required v-model="password"
             placeholder="*********">
      <div id="forgotPassword" class="">
        <span href="" @click="$store.commit('userState/setTab','forgotPassword')">Забыли пароль?</span>
      </div>
    </div>
    <button type="button" class="buttonDark" :disabled="!validForm"
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

<style scoped>

.loginForm {
  text-align: center;
  margin-block: 10px
}
#forgotPassword {
  margin-block: 5px;
}

#forgotPassword span {
  cursor: pointer;
  font-size: smaller;
  color: #728391;
  text-decoration: underline;
}

#forgotPassword span:hover {
  color: #3d4551;
}
</style>
