<template>
  <div class="parentDiv">
    <ErrorComponent
    :error=this.error
    @clearError="()=>{this.error=''}"/>
    <div class="login">
      <div class="tabs">
        <section class="tabButton" :class="{'selected':tab=='logIn'}" @click="tab='logIn'">
          Вход
        </section>
        <section class="tabButton" :class="{'selected':tab=='signIn'}" @click="tab='signIn'">
          Регистрация
        </section>
      </div>
      <Transition name="smooth" mode="out-in">
        <form class="loginForm" id="logIn" v-if="tab=='logIn'">
          <div>
            Email: <br>
            <input type="email" required  ref="enterEmail" v-model="userData.username"
                   placeholder="Ваш email ">
          </div>
          <div>
            Пароль:<br>
            <input type="password" required v-model="userData.password"
                   placeholder="*********">
            <div id="forgotPassword" class="">
              <span href="" @click="tab='forgotPassword'">Забыли пароль?</span>
            </div>
          </div>
          <button type="button" class="buttonDark" :disabled="!flags.login"
                  @click="enter(this.userData.username, this.userData.password)">Войти
          </button>
        </form>
        <form class="loginForm" id="signIn" v-else-if="tab=='signIn'">
          <div>
            Введите E-mail: <br>
            <input type="email" class="loginPageInput" required ref="regEmail" v-model="regData.email"
                   placeholder="Ваш E-mail">
          </div>
          <div>
            Задайте пароль: <br>
            <small>(Минимум 8 символов)</small><br>
            <input type="password" required class="loginPageInput" v-model="regData.regPassword"
                   placeholder="*********">
          </div>
          <div>
            Повторите пароль:<br>
            <input type="password" required class="loginPageInput" v-model="regData.passwordRepeat"
                   placeholder="*********">
          </div>
          <button type="button" class="buttonDark" :disabled="!flags.signin" @click="register(regData)">
            Зарегистрироваться
          </button>
        </form>
        <div v-else-if="tab=='confirm'" class="confirmForm">
          <div>
            Введите код, отправленный на вашу электронную почту:<br>
            <input type="text" class="loginPageInput" style="width:120px; text-align: center"
                   v-model="enteredCode">
          </div>
          <div>
            <button type="button" class="buttonLight" @click="tab='signIn'">
              Отмена
            </button>
            <button type="button" class="buttonDark"
                    :disabled="!(Number(enteredCode) && (enteredCode.length==4))"
                    @click="()=>{
                      if(confirmType=='register' && checkCode()){
                        regData.verified=true
                        this.register(regData)
                      }
                      if(confirmType=='resetPas' && checkCode())
                         this.tab='newPassword'
                    }">
              Подтвердить
            </button>
          </div>
        </div>
        <div v-else-if="tab=='forgotPassword'" class="forgotPasswordForm">
          Введите E-mail, указанный при регистрации: <br>
          <input type="email" class="loginPageInput" ref="resetEmail" v-model="userData.emailToPasReset"
                 placeholder="Ваш E-mail">
          <div>
            <button type="button" class="buttonLight" @click="tab='logIn'">
              Отмена
            </button>
            <button type="button" class="buttonDark"
                    :disabled="!flags.passwordReset" @click="resetPassword(userData.emailToPasReset)">
              Далее
            </button>
          </div>
        </div>
        <div v-else-if="tab=='newPassword'" class="forgotPasswordForm" >
          <div>
          Введите новый пароль:<br>
          <small>(Минимум 8 символов)</small><br>
          <input type="password" required class="loginPageInput" v-model="userData.newPassword"
                 placeholder="*********">
          </div>
          <div>
            Повторите пароль:<br>
            <input type="password" required class="loginPageInput" v-model="userData.newPasswordRepeat"
                   placeholder="*********">
          </div>
          <div>
          <button type="button" class="buttonLight" @click="tab='logIn'">
            Отмена
          </button>
          <button type="button" class="buttonDark"
                  :disabled="!(userData.newPassword.length>=8 && userData.newPasswordRepeat==userData.newPassword)" @click="updatePassword(userData)">
            Завершить
          </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
  <button class="buttonLight manualButton"><a href="/mcmanual.pdf" download>Справка</a></button>
</template>
<script>
import AxiosRequest from "@/modules/services/axiosRequest";
import ErrorComponent from '@/components/Error.vue'
export default {
  name: 'LoginPage',
  components:{
    ErrorComponent
  },
  data() {
    return {
      tab: "logIn",
      code: 0,
      enteredCode: "",
      confirmType: "",
      userData: {
        id: null,
        username: "",
        password: "",
        emailToPasReset: "",
        newPassword: "",
        newPasswordRepeat: ""
      },
      regData: {
        email: "",
        regPassword: "",
        passwordRepeat: "",
        verified: false
      },
      flags: {
        signin: false,
        login: false,
        passwordReset: false,
      },
      error: "",
    }
  },
  created() {
    if(localStorage.getItem('TOKEN')){
      this.$router.push('/Main')
    }
  },
  methods: {
    async confirmEmail(email, src) {
      let request, response
      try {
        request = await new AxiosRequest("user/confirm/","post",{email: email.toLowerCase(),src: src})
        response=await request.sendRequest()
      } catch (e) {
        console.log("Ошибка сервера: " + e)
        return
      }
      return response
    },
    async register(data) {
      if (!data.verified) {
        let res = await this.confirmEmail(data.email, 'register')
        if (res && res.msg) {
          this.error = res.msg
          return
        }
        if (res && res.code) {
          this.tab = 'confirm'
          this.confirmType = 'register'
          this.code = Number(res.code)
        }
      } else {
        await this.sendNewUserData(data)
        await this.enter(data.email, data.regPassword)
        await this.createUserOptions()
      }
    },
    async createUserOptions(){
      let request, response
      try {
        request = await new AxiosRequest('store/', "post", )
        response= await request.sendRequest()
        if(response.msg)
          this.error = "Ошибка сервера: " + response.msg
      }
      catch (e) {
        this.error = "Ошибка сервера: " + e
        return
      }
    },
    async resetPassword(email) {
      let res = await this.confirmEmail(email, 'pasReset')
      if (res.msg) {
        this.error = res.msg
        return
      }
      else {
        this.tab = 'confirm'
        this.confirmType = 'resetPas'
        this.code = Number(res.code)
        this.userData.id=res.id
      }
    },
    async updatePassword(data){
      let request, response
      try {
        request = await new AxiosRequest(`user/${data.id}`, "put", {password:data.newPassword})
        response= await request.sendRequest()
      } catch (e) {
        this.error = "Ошибка сервера: " + e
        return
      }
      try {
        if(response)
        await this.enter(data.emailToPasReset, data.newPassword)
      }
      catch (e) {
        this.error = "Ошибка сервера: " + e
        return
      }
    },
    async sendNewUserData(data) {
      let request,response
      try {
        request = await new AxiosRequest("user/", "post",
            {
          email: data.email.toLowerCase(),
          password: data.regPassword,
          regDate: new Date(),
          verified: data.verified })
        response=await request.sendRequest()
        if(response.msg)
          this.error = "Ошибка сервера: " + response.msg
        else console.log(response)
      } catch (e) {
        this.error = "Ошибка сервера: " + e
        return
      }
      return response
    },
    checkCode() {
      if (this.enteredCode == this.code) {
        this.error = ""
        return true
      } else {
        this.error = "Введённый код неверен!"
        return false
      }
    },
    async enter(login, password) {
      let request,response
      request = await new AxiosRequest("auth/login", "post",{
        email: login.toLowerCase(),
        password: password
      })
      response = await request.sendRequest()
      if(!response) {
        this.error="Сервер недоступен"
        return
      }
      if( response.msg)
        this.error = response.msg
      else if(response.token)
        {
          localStorage.setItem('TOKEN', response.token)
          this.error = ""
          this.$router.push({path: "/Main"})
        }
    },
    validateSignin(data) {
      if (
          data.regPassword &&
          data.regPassword.length >= 8 &&
          data.regPassword == data.passwordRepeat &&
          this.$refs.regEmail.validity.valid
      ) this.flags.signin = true
      else this.flags.signin = false
    },
    validateLogin(data) {
      if (
          data.password &&
          data.password.length >= 8 &&
          this.$refs.enterEmail.validity.valid
      ) this.flags.login = true
      else this.flags.login = false
    },
  },
  watch: {
    regData: {
      handler(val) {
        this.validateSignin(val)
      }, deep: true
    },
    userData: {
      handler(val) {
        this.validateLogin(val)
        if(this.userData.emailToPasReset)
          this.flags.passwordReset = this.$refs.resetEmail.validity.valid

      }, deep: true
    },
    error: {
      handler(val) {
        let tmp = val
        this.error = ""
        this.error = tmp
        setTimeout(() => {
          this.error = ""
        }, 10000)
      }
    }
  }
}
</script>
<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 1s all;
  background-color: white;
  border: 1px solid #3d4551;
  border-radius: 5px;
  width: 400px;
  min-width: 30%;
  font-size: larger;
  -webkit-box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
  -moz-box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
  box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
}
.tabs{
  margin-block: 10px;
  width: min-content;
  display: flex;
  flex-direction: row;
  border:1px solid #3d4551;
  border-radius: 10px;
  font-size: larger;
}
.tabButton{
  cursor: pointer;
  padding-inline: 20px;
  padding-block: 10px;
}
input[type='email'],input[type='password'],input[type='text']{
  width: 300px;
  font-size: 16pt;
  padding: 5px;
  margin-block: 10px;
}
#forgotPassword{
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

.confirmForm {
  display: flex;
  flex-direction: column;
  font-size: smaller;
  padding: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.forgotPasswordForm {
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
}


.loginForm {
  text-align: center;
  margin-block: 10px
}
.buttonDark, .buttonLight{
  font-size: larger;
}
.manualButton{
  position: fixed;
  bottom:5%;
  right:10%;
  width: 200px;
  height: 50px;
}
.manualButton:hover a{
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
