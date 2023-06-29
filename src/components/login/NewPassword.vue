<template>
  <div class="forgotPasswordForm" >
    <div>
      Введите новый пароль:<br>
      <small>(Минимум 8 символов)</small><br>
      <input type="password" required class="loginPageInput" v-model="newPassword"
             placeholder="*********">
    </div>
    <div>
      Повторите пароль:<br>
      <input type="password" required class="loginPageInput" v-model="newPasswordRepeat"
             placeholder="*********">
    </div>
    <div>
      <button type="button" class="buttonLight" @click="$store.commit('userState/setTab','logIn')">
        Отмена
      </button>
      <button type="button" class="buttonDark"
              :disabled="!(newPassword.length>=8 && newPasswordRepeat===newPassword)" @click="$store.dispatch('userState/updatePassword')">
        Завершить
      </button>
    </div>
  </div>
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
