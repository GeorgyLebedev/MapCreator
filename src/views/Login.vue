<template>
  <div id="parentDivId">
    <div class="login position-absolute top-50 start-50 translate-middle" style="max-width: 400px">
      <div class="form_radio_group d-flex mt-4 justify-content-center">
        <div class="form_radio_group-item">
          <input id="radioSignIn" type="radio" name="radioLog" value="signIn" v-model="tab" checked>
          <label for="radioSignIn">Вход</label>
        </div>
        <div class="form_radio_group-item">
          <input id="radioSignUp" type="radio" name="radioLog" value="signUp" v-model="tab">
          <label for="radioSignUp">Регистрация</label>
        </div>
      </div>
      <form class="m-4 text-center " id="logIn" v-if="tab=='signIn'">
        <div class="form-group mb-3 ">
          <label for="Uname">Логин:</label>
          <input type="text" class="form-control" required id="Uname" v-model="username" placeholder="Ваш логин">
        </div>
        <div class="form-group mb-3">
          <label for="Password">Пароль:</label>
          <input type="password" required class="form-control" id="Password" v-model="password" placeholder="*********">
          <div id="forgotPassword" class="text-end mt-3">
            <a href="">Забыли пароль?</a>
          </div>
        </div>
        <button type="submit" class="btn btn-dark fs-5" :disabled="!this.login">Войти</button>
      </form>
      <form class="m-4 text-center" id="signIn" v-if="tab=='signUp'">
        <div class="form-group mb-3">
          <label for="InputEmail">Введите E-mail:</label>
          <input type="email" class="form-control" required id="InputEmail" v-model="email"  placeholder="Ваш E-mail">
        </div>
        <div class="form-group mb-3">
          <label for="InputPassword">Задайте пароль:</label>
          <br><small class="text-secondary">(Минимум 8 символов)</small>
          <input type="password" required class="form-control" id="InputPassword" v-model="regPassword"  placeholder="*********">
        </div>
        <div class="form-group mb-3">
          <label for="RepeatPassword">Повторите пароль:</label>
          <input type="password" required class="form-control" id="RepeatPassword" v-model="passwordRepeat" placeholder="*********">
        </div>
        <button type="submit" class="btn btn-dark fs-5" :disabled="!this.signin">Зарегистрироваться</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
  data(){
    return {
      tab: "signIn",
      username: null,
      password: null,
      email: null,
      regPassword: null,
      passwordRepeat: null,
      signin: false,
      login: false
    }
  },
  methods:{
    checkEmail(str){
      let re = /\S+@\S+\.\S+/;
      return re.test(str);
    },
    validateSignin(){
      if(
          this.regPassword &&
          this.regPassword.length>=8 &&
          this.regPassword==this.passwordRepeat &&
          this.checkEmail(this.email)
      )
        this.signin=true
      else
        this.signin=false
    },
    validateLogin(){
      if(
          this.password &&
          this.password.length>=8 &&
          this.checkEmail(this.username)
      )
        this.login=true
      else
        this.login=false
    }
  },
  watch:{
    email(){
      this.validateSignin()
    },
    regPassword(){
      this.validateSignin()
    },
    passwordRepeat(){
      this.validateSignin()
    },
    username(){
      this.validateLogin()
    },
    password(){
      this.validateLogin()
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
  background-color: white;
  border: 1px solid #232323;
  border-radius: 5px;
  min-width: 30%;
  font-size: larger;
  -webkit-box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
  -moz-box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
  box-shadow: 0px 0px 8px 8px rgba(35, 35, 35, 0.2);
}

.login input[type=text], .login input[type=password], .login input[type=email] {
  max-width: 75%;
  font-size: larger;
  margin: 0 auto
}
#forgotPassword a{
  font-size: smaller;
  color: gray;
  text-decoration: underline;
}
#forgotPassword a:hover{
  color:silver!important;
 }
#parentDivId {
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/images/background.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
