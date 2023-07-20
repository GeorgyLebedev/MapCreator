<template>
    <form class="login-form">
	<section class="login-section">
	    <p>Введите новый пароль:<br>
		<small class="text-medium-colored">(Минимум 8 символов)</small></p>
	    <input v-model="newPassword" class="input-medium login-input" placeholder="*********" required
		   type="password">
	</section>
	<section class="login-section">
	    <p>Повторите пароль:</p>
	    <input v-model="newPasswordRepeat" class="input-medium login-input" placeholder="*********" required
		   type="password">
	</section>
	<section class="login-section flex-row">
	    <button class="button-light button-large" type="button"
		    @click="this.$store.commit('userState/setTab','logIn')">
		Отмена
	    </button>
	    <button :disabled="!(newPassword.length>=8 && newPasswordRepeat===newPassword)" class="button-dark button-large"
		    type="button"
		    @click="this.$store.dispatch('userState/updatePassword')">
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
    computed: {
        newPassword: {
            get(): string {
                return store.getters['userState/getLoginDataNewPassword']
            },
            set(value: string) {
                store.commit('userState/setLoginDataNewPassword', value)
            }
        },
        newPasswordRepeat: {
            get(): string {
                return store.getters['userState/getLoginDataNewPasswordRepeat']
            },
            set(value: string) {
                store.commit('userState/setLoginDataNewPasswordRepeat', value)
            }
        }
    }
})
</script>

<style scoped>

</style>
