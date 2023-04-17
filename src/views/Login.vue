<template>
  <div id="parentDivId">
    <div class="login position-absolute top-50 start-50 translate-middle">
      <div class="form_radio_group d-flex mt-4 justify-content-center">
        <div class="form_radio_group-item">
          <input id="radioSignIn" type="radio" name="radioLog" value="signIn" v-model="tab" checked>
          <label for="radioSignIn">Вход</label>
        </div>
        <div class="form_radio_group-item">
          <input id="radioSignUp" type="radio" name="radioLog" value="logIn" v-model="tab">
          <label for="radioSignUp">Регистрация</label>
        </div>
      </div>
      <transition name="smooth" mode="out-in">
        <form class="loginForm" id="logIn" v-if="tab=='signIn'">
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
              <a href="">Забыли пароль?</a>
            </div>
            <div class="errorMsg">
              {{ loginError }}
            </div>
          </div>
          <button type="button" class="buttonDark" :disabled="!this.login"
                  @click="enter(this.userData.username, this.userData.password)">Войти
          </button>
        </form>
        <form class="loginForm" id="signIn" v-else-if="tab=='logIn'">
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
            <input type="password" required class="loginPageInput"  v-model="regData.passwordRepeat"
                   placeholder="*********">
          </div>
          <div class="errorMsg">
            {{ regError }}
          </div>
          <button type="button" class="buttonDark" :disabled="!this.signin" @click="registrate()">
            Зарегистрироваться
          </button>
        </form>
        <div v-else-if="tab=='confirm'" class="confirmForm">
          <div>
          Введите код, отправленный на вашу электронную почту:<br>
          <input type="text" class="loginPageInput" style="width:120px; text-align: center" v-model="regData.enteredCode">
          </div>
          <div class="errorMsg">
            {{ codeError }}
          </div>
          <div>
            <button type="button" class="buttonLight" @click="tab='logIn'">
              Отмена
            </button>
            <button type="button" class="buttonDark" :disabled="!(Number(regData.enteredCode) && (regData.enteredCode.length==4))"
            @click="checkCode(regData)">
              Подтвердить
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import axios from "axios";

const bcrypt = require('bcryptjs')
export default {
  name: 'LoginPage',
  data() {
    return {
      tab: "signIn",
      userData: {
        username: "",
        password: "",
      },
      regData: {
        email: "",
        regPassword: "",
        passwordRepeat: "",
        hashPassword: "",
        code: 0,
        enteredCode: "",
        verified: false
      },
      signin: false,
      login: false,
      loginError: "",
      regError: "",
      codeError: "",
      showCodeWin: false
    }
  },
  methods: {
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
      ) {
        this.signin = true
      } else
        this.signin = false
    },
    validateLogin(data) {
      if (
          data.password &&
          data.password.length >= 8 &&
          this.checkEmail(data.username)
      )
        this.login = true
      else
        this.login = false
    },
    checkCode(data){
      if(data.enteredCode==data.code){
        this.codeError=""
        data.verified=true
        this.registrate()
      }
      else this.codeError="Введённый код неверен!"
    },
    async registrate() {
      let now = new Date()
      this.regData.hashPassword = bcrypt.hashSync(this.regData.regPassword, bcrypt.genSaltSync(12))
      let response
      try{
        response = (await axios({
          url: "http://localhost:1111/server/user",
          method: 'post',
          data: {
            email: this.regData.email,
            password: this.regData.hashPassword,
            regDate: new Intl.DateTimeFormat("ru", {dateStyle: "short", timeStyle: "short"}).format(now),
            verified: this.regData.verified
          }
        })).data
      }
      catch (e) {
        console.log("Ошибка в функции: "+ this.constructor.name)
        console.log("Текст ошибки: "+ e)
        return
      }
      if (response.code && Number(response.code)) {
        this.tab = 'confirm'
        this.regData.code=Number(response.code)
      }
      else if(response.msg){
        this.regError=response.msg
      }
      else if (this.regData.verified){
          await this.enter(this.regData.email, this.regData.regPassword)
      }

    },
    async enter(user, password) {
      let query = (await axios({
        url: "http://localhost:1111/server/user",
        method: 'get',
        params: {
          email: user,
        }
      })).data.result
      if (query && query.length > 0 && await bcrypt.compare(password, query[0].password)){
        this.loginError=""
        this.$router.push({path:"/"})
      }
       else this.loginError="Неправильный логин или пароль!"
    }
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
      }, deep: true
    },
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

.errorMsg {
  font-size: smaller;
  font-weight: bolder;
  color: maroon;
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

.login input[type=text], .login input[type=password], .login input[type=email] {
  max-width: 75%;
  font-size: larger;
}

#forgotPassword a {
  font-size: smaller;
  color: gray;
  text-decoration: underline;
}

#forgotPassword a:hover {
  color: silver !important;
}

#parentDivId {
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/images/background.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.confirmForm{
  display: flex;
  flex-direction: column;
  font-size: smaller;
  padding: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.loginPageInput{
  border: 2px solid #dcdcdc;
  padding-inline: 10px;
  padding-block: 5px;
  font-size: 18px;
  border-radius: 10px;
  max-width: 150px;
  margin: 15px;
}
.loginForm{
  text-align: center;
  margin-block:10px
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
