<template>
    <section class="root">
	<div class="background-container"></div>
	<aside class="aside-container">
	    <section class="logo-container">
		<img class="logo-image" src="@/assets/images/logo.png" alt="">
	    </section>
	    <section class="login">
		<div class="tabs" v-if="tab=='logIn' || tab==='signUp'">
		    <section class="tab-button tab-first" :class="{'current':tab=='logIn'}" @click="tab='logIn'">
			Вход
		    </section>
		    <section class="tab-button tab-second" :class="{'current':tab=='signUp'}" @click="tab='signUp'">
			Регистрация
		    </section>
		</div>
		<Transition name="smooth" mode="out-in">
		    <log-in v-if="tab=='logIn'"/>
		    <sign-up v-else-if="tab=='signUp'"/>
		    <confirm-form v-else-if="tab==='confirm'"/>
		    <new-password v-else-if="tab==='newPassword'"/>
		    <forgot-password v-else-if="tab==='forgotPassword'"/>
		</Transition>
	    </section>
	    <p class="text-medium-colored">
		<b>
		    &copy; Georgy Lebedev, 2022-2023
		</b>
	    </p>
	</aside>
    </section>

    <button class="button-light button-large manual-button" @click="this.$refs.manualLink.click()">Справка</button>
    <a href="/mcmanual.pdf" download ref="manualLink" :hidden="true"></a>
</template>
<script lang="ts">
import LogIn from "@/components/login/LogIn.vue"
import SignUp from "@/components/login/SignUp.vue"
import ForgotPassword from "@/components/login/ForgotPassword.vue";
import ConfirmForm from "@/components/login/ConfirmForm.vue";
import NewPassword from "@/components/login/NewPassword.vue";
import {defineComponent} from "vue";
import store from "@/modules/store/store";

export default defineComponent({
    name: 'LoginPage',
    components: {
        NewPassword,
        ConfirmForm,
        ForgotPassword,
        LogIn,
        SignUp,
    },
    created() {
        if (localStorage.getItem('TOKEN')) {
            this.$router.push('/Main')
        }
    },
    computed: {
        tab: {
            get(): string {
                return store.getters['userState/getTab']
            },
            set(value: string) {
                store.commit('userState/setTab', value)
            }
        }
    },
})
</script>
<style lang="sass">
@use "@/assets/styles/pages/Login"
</style>
