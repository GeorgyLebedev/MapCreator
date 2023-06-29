<template>
  <div class="forgotPasswordForm">
    Введите E-mail, указанный при регистрации: <br>
    <input type="email" class="defaultInput"  ref="resetEmail" v-model="emailToPasReset"
           placeholder="Ваш E-mail">
    <div>
      <button type="button" class="buttonLight buttonLarge"  @click="this.$store.commit('userState/setTab','logIn')">
        Отмена
      </button>
      <button type="button" class="buttonDark buttonLarge"
              :disabled="!isValidEmail(emailToPasReset)" @click="this.$store.dispatch('userState/resetPassword')">
        Далее
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import store from "@/modules/store/store";
export default defineComponent({
  name: "ForgotPassword",
  computed:{
    emailToPasReset:{
      get():string{
        return store.getters['userState/getLoginDataEmailToPasReset']
      },
      set(value:string){
        store.commit('userState/setLoginDataEmailToPasReset', value)
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
.forgotPasswordForm {
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>
