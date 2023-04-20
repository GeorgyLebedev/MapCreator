<template>
  <div id="parentDivId">
    <transition name="error-anim">
      <div class="errorNotice" v-if="this.error">
        <div class="errorHeader">
          <b>Ошибка</b>
          <img class="c-pointer" src="@/assets/images/Service/close.png" alt="" width="20" height="20"
               @click="this.error=''">
        </div>
        <div class="errorContent">
          {{ this.error }}
        </div>
      </div>
    </transition>
    <div class="login position-absolute top-50 start-50 translate-middle">
      <div class="form_radio_group d-flex mt-4 justify-content-center">
        <div class="form_radio_group-item">
          <input id="radioSignIn" type="radio" name="radioLog" value="logIn" v-model="tab" checked>
          <label for="radioSignIn">Вход</label>
        </div>
        <div class="form_radio_group-item">
          <input id="radioSignUp" type="radio" name="radioLog" value="signIn" v-model="tab">
          <label for="radioSignUp">Регистрация</label>
        </div>
      </div>
      <transition name="smooth" mode="out-in">
        <form class="loginForm" id="logIn" v-if="tab=='logIn'">
          <div>
            Логин: <br>
            <input type="text" class="loginPageInput" required id="Uname" v-model="userData.username"
                   placeholder="Ваш логин">
          </div>
          <div>
            Пароль:<br>
            <input type="password" required class="loginPageInput" id="Password" v-model="userData.password"
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
            <input type="email" class="loginPageInput" required id="InputEmail" v-model="regData.email"
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
          <input type="email" class="loginPageInput" v-model="userData.emailToPasReset"
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
                  :disabled="!(userData.newPassword.length>=8 && userData.newPasswordRepeat==userData.newPassword)" @click="updateData(userData)">
            Завершить
          </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.withCredentials=true
export default {
  name: 'LoginPage',
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
  methods: {
    async confirmEmail(email, src) {
      let response
      try {
        response = (await axios({
          url: "http://localhost:1111/user/confirm",
          method: 'post',
          data: {
            email: email.toLowerCase(),
            src: src
          }
        })).data
      } catch (e) {
        console.log("Ошибка сервера: " + e)
        return
      }
      return response
    },
    async register(data) {
      if (!data.verified) {
        let res = await this.confirmEmail(data.email, 'register')
        if (res.msg) {
          this.error = res.msg
          return
        }
        if (res.code) {
          this.tab = 'confirm'
          this.confirmType = 'register'
          this.code = Number(res.code)
        }
      } else {
        await this.sendData(data)
        await this.enter(data.email, data.regPassword)
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
    async updateData(data){
      let response
      try {
        response = (await axios({
          url: `http://localhost:1111/user/${data.id}`,
          method: 'put',
          data: {
            password: data.newPassword,
          }
        })).data
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
    async sendData(data) {
      let response
      let now = new Date()
      try {
        response = (await axios({
          url: "http://localhost:1111/user",
          method: 'post',
          data: {
            email: data.email.toLowerCase(),
            password: data.regPassword,
            regDate: new Intl.DateTimeFormat("ru", {dateStyle: "short", timeStyle: "short"}).format(now),
            verified: data.verified
          }
        })).data
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
      let response = (await axios({
        url: "http://localhost:1111/auth/login",
        method: 'post',
        data: {
          email: login.toLowerCase(),
          password: password
        }
      })).data
      if(!response) {
        this.error="Сервер недоступен"
        return
      }
      if( response.msg)
        this.error = response.msg
      else if(response.token)
        {
          localStorage.setItem('TOKEN', response.token)
          localStorage.setItem("USER", response.user)
          localStorage.setItem("USERID", response.id)
          this.error = ""
          this.$router.push({path: "/Main"})
        }
    },
    checkEmail(str) {
      let re = /\S+@\S+\.\S+/;
      return re.test(str);
    },
    validateSignin(data) {
      if (
          data.regPassword &&
          data.regPassword.length >= 8 &&
          data.regPassword == data.passwordRepeat &&
          this.checkEmail(data.email)
      ) this.flags.signin = true
      else this.flags.signin = false
    },
    validateLogin(data) {
      if (
          data.password &&
          data.password.length >= 8 &&
          this.checkEmail(data.username)
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
        this.flags.passwordReset = this.checkEmail(val.emailToPasReset)
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
<style>
.form_radio_group-item {
  display: inline-block;
  float: left;
}

.form_radio_group input[type=radio] {
  display: none;
}

.form_radio_group label {
  display: inline-block;
  cursor: pointer;
  padding: 0px 15px;
  line-height: 45px;
  border: 1px solid #232323;
  border-right: none;
  user-select: none;
}

.form_radio_group .form_radio_group-item:first-child label {
  border-radius: 6px 0 0 6px;
}

.form_radio_group .form_radio_group-item:last-child label {
  border-radius: 0 6px 6px 0;
  border-right: 1px solid #232323;
}

.form_radio_group input[type=radio]:checked + label {
  background: #232323;
  color: white;
}

.login {
  transition: 1s all;
  background-color: white;
  border: 1px solid #232323;
  border-radius: 5px;
  width: 400px;
  min-width: 30%;
  font-size: larger;
  -webkit-box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
  -moz-box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
  box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
}

#forgotPassword span {
  cursor: pointer;
  font-size: smaller;
  color: gray;
  text-decoration: underline;
}

#forgotPassword span:hover {
  color: silver !important;
}

#parentDivId {
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

.loginPageInput {
  border: 2px solid #dcdcdc;
  padding-inline: 10px;
  padding-block: 5px;
  font-size: 18pt;
  border-radius: 10px;
  margin: 15px;
}

.loginForm {
  text-align: center;
  margin-block: 10px
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
