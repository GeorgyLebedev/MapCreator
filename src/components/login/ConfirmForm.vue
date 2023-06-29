<template>
  <div class="confirmForm">
    <div>
      Введите код, отправленный на вашу электронную почту:<br>
      <input type="text"  class="defaultInput"  style="width:120px; text-align: center"
             v-model="enteredCode">
    </div>
    <div>
      <button type="button" class="buttonLight buttonLarge" @click=" this.$store.commit('userState/setTab', 'logIn')">
        Отмена
      </button>
      <button type="button" class="buttonDark buttonLarge"
              :disabled="!(Number(enteredCode) && (enteredCode.length===4))"
              @click="()=>{
                      if(confirmType==='register' && checkCode())
                        this.$store.dispatch('userState/register')
                      if(confirmType==='resetPas' && checkCode())
                         this.$store.commit('userState/setTab', 'newPassword')
                    }">
        Подтвердить
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import store from "@/modules/store/store";
export default defineComponent({
  name: "ConfirmForm",
  methods:{
    checkCode() {
      if (this.enteredCode===this.confirmCode) {
        return true
      } else {
        store.commit("setNotification", ["error", "Введённый код неверен!"])
        return false
      }
    },
  },
  computed:{
    enteredCode:{
      get():string {
        return store.getters['userState/getConfirmDataEnteredCode']
      },
      set(value:string){
        store.commit('userState/setConfirmDataEnteredCode', value)
      }
    },
    confirmCode:{
      get():string {
        return store.getters['userState/getConfirmDataCode']
      },
      set(value:string){
        store.commit('userState/setConfirmDataCode', value)
      }
    },
    confirmType:{
      get():string {
        return store.getters['userState/getConfirmDataType']
      },
      set(value:string){
        store.commit('userState/setConfirmDataType', value)
      }
    }
  }
})
</script>

<style scoped>
.confirmForm {
  display: flex;
  flex-direction: column;
  font-size: smaller;
  padding: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>
