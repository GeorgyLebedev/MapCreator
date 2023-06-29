<template>
  <div class="parentDiv">
    <div class="login">
      <div class="tabs">
        <section class="tabButton firstTab" :class="{'current':tab=='logIn'}" @click="tab='logIn'">
          Вход
        </section>
        <section class="tabButton secondTab" :class="{'current':tab=='signIn'}" @click="tab='signIn'">
          Регистрация
        </section>
      </div>
      <Transition name="smooth" mode="out-in">
        <log-in v-if="tab=='logIn'"/>
        <sign-in v-else-if="tab=='signIn'"/>
        <confirm-form v-else-if="tab==='confirm'" />
        <new-password v-else-if="tab==='newPassword'"/>
        <forgot-password v-else-if="tab==='forgotPassword'"/>
      </Transition>
    </div>
  </div>
  <button class="buttonLight manualButton"><a href="/mcmanual.pdf" download>Справка</a></button>
</template>
<script lang="ts">
import LogIn from "@/components/login/LogIn.vue"
import SignIn from "@/components/login/SignIn.vue"
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
    SignIn,
  },
  created() {
    if (localStorage.getItem('TOKEN')) {
      this.$router.push('/Main')
    }
  },
  computed:{
    tab:{
      get():string{
        return store.getters['userState/getTab']
      },
      set(value:string){
        store.commit('userState/setTab', value)
      }
    }
  },
})
</script>
<style>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 10px;
  text-align: center;
  transition: 1s all;
  background-color: white;
  border: 1px solid #3d4551;
  border-radius: 5px;
  width: 400px;
  min-width: 30%;
  font-size: large;
  -webkit-box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
  -moz-box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
  box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
}

.tabs {
  margin-block: 15px;
  width: min-content;
  display: flex;
  flex-direction: row;
  font-size: larger;
}

.tabButton {
  cursor: pointer;
  border: 1px solid #3d4551;
  padding-inline: 20px;
  padding-block: 10px;
}

.firstTab {
  border-radius: 10px 0 0 10px;
}

.secondTab {
  border-radius: 0 10px 10px 0;
}

.tabButton.current {
  background-color: #3d4551;
  color: #ea5c41;
}

input[type='email'], input[type='password'], input[type='text'] {
  width: 300px;
  font-size: 16pt;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 20px;
}


.parentDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/images/background.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.buttonDark, .buttonLight {
  font-size: larger;
}

.manualButton {
  position: fixed;
  bottom: 5%;
  right: 10%;
  width: 200px;
  height: 50px;
}

.manualButton:hover a {
  color: #ea5c41;
}

.smooth-enter-active,
.smooth-leave-active {
  transition: all 0.3s ease-out;
}

.smooth-enter-from,
.smooth-leave-to {
  opacity: 0;
  transform: scale(0)
}
</style>
