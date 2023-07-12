<template>
  <form class="login-form">
    <section class="login-section">
      Введите новый пароль:<br>
      <small>(Минимум 8 символов)</small>
      <input type="password" required  class="input-medium login-input"  v-model="newPassword"
             placeholder="*********">
    </section>
    <section class="login-section">
      Повторите пароль:<br>
      <input type="password" required  class="input-medium login-input"  v-model="newPasswordRepeat"
             placeholder="*********">
    </section>
    <section class="login-section flex-row">
      <button type="button" class="button-light button-large" @click="this.$store.commit('userState/setTab','logIn')">
        Отмена
      </button>
      <button type="button" class="button-dark button-large"
              :disabled="!(newPassword.length>=8 && newPasswordRepeat===newPassword)" @click="this.$store.dispatch('userState/updatePassword')">
        Завершить
      </button>
    </section>
  </form>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import store from "@/modules/store/store";
export default defineComponent({
  name: "newPassword",
  computed:{
    newPassword:{
      get():string{
       return store.getters['userState/getLoginDataNewPassword']
      },
      set(value:string){
        store.commit('userState/setLoginDataNewPassword', value)
      }
    },
    newPasswordRepeat:{
      get():string{
        return store.getters['userState/getLoginDataNewPasswordRepeat']
      },
      set(value:string){
        store.commit('userState/setLoginDataNewPasswordRepeat', value)
      }
    }
  }
})
</script>

<style scoped>

</style>
