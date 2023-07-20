<template>
    <form class="confirm-form">
	<div class="login-section">
	    <p>Введите код, отправленный на вашу электронную почту: </p>
	    <input v-model="enteredCode" class="input-medium code-input"
		   type="text">
	</div>
	<div class="flex-row">
	    <button class="button-light button-large" type="button"
		    @click=" this.$store.commit('userState/setTab', 'logIn')">
		Отмена
	    </button>
	    <button :disabled="!(Number(enteredCode) && (enteredCode.length===4))" class="button-dark button-large"
		    type="button"
		    @click="()=>{
                      if(confirmType==='register' && checkCode())
                        this.$store.dispatch('userState/register')
                      if(confirmType==='resetPas' && checkCode())
                         this.$store.commit('userState/setTab', 'newPassword')
                    }">
		Подтвердить
	    </button>
	</div>
    </form>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import store from "@/modules/store/store";

export default defineComponent({
    name: "ConfirmForm",
    methods: {
        checkCode() {
            if (this.enteredCode === this.confirmCode) {
                return true
            } else {
                store.commit("setNotification", ["error", "Введённый код неверен!"])
                return false
            }
        },
    },
    computed: {
        enteredCode: {
            get(): string {
                return store.getters['userState/getConfirmDataEnteredCode']
            },
            set(value: string) {
                store.commit('userState/setConfirmDataEnteredCode', value)
            }
        },
        confirmCode: {
            get(): string {
                return store.getters['userState/getConfirmDataCode']
            },
            set(value: string) {
                store.commit('userState/setConfirmDataCode', value)
            }
        },
        confirmType: {
            get(): string {
                return store.getters['userState/getConfirmDataType']
            },
            set(value: string) {
                store.commit('userState/setConfirmDataType', value)
            }
        }
    }
})
</script>

<style lang="sass" scoped>
.confirm-form
  display: flex
  flex-direction: column
  padding: 20px
  text-align: center
  justify-content: center
  align-items: center

.code-input
  width: 30%
  text-align: center
</style>
