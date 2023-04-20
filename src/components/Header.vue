<template>
  <header class="d-flex  py-2 mb-4 border-bottom justify-content-between align-items-center">
    <a href="/">
      <img src="@/assets/images/logo.png" alt="" :height="50" class="ms-3">
    </a>
    <ul class="nav">
      <li><a href="" class="nav-link px-2 link-dark">Справка</a></li>
      <li><a href="" class="nav-link px-2 link-dark">Тема</a></li>
    </ul>
    <div>
    <b>{{user?user.split('@',1).toString():""}}</b>
    <a href="/Login">
      <button type="button" class="buttonLight" @click="logOut()">Выход</button>
    </a>
    </div>
  </header>
</template>

<script>
import axios from "axios";
export default {
  name: 'NavBar',
  props:{
    user: {
      type: String,
      default:""
    }
  },
  methods:{
    async logOut(){
      localStorage.clear()
      let response = (await axios({
        url: "http://localhost:1111/auth/logout",
        method: 'post',
      })).data
      if(!response) {
        return
      }
    }
  }
}
</script>

<style scoped>
.nav-link:after {
  display: block; /*превращаем его в блочный элемент*/
  content: ""; /*контента в данном блоке не будет поэтому в кавычках ничего не ставим*/
  height: 2px; /*задаём высоту линии*/
  width: 0%; /*задаём начальную ширину элемента (линии)*/
  background-color: #232323; /*цвет фона элемента*/
  transition: width 0.4s ease-in-out; /*данное свойство отвечает за плавное изменение ширины. Здесь можно задать время анимации в секундах (в данном случае задано 0.4 секунды)*/
}
.nav-link:hover:after, .nav-link:focus:after {
  width: 100%;
}
</style>
