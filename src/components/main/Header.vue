<template>
  <header class="">
      <img src="@/assets/images/logo.png" alt="" :height="50">
    <div class="userPanel">
      <div class="userAvatar">
      <img src="@/assets/images/defaultAvatar.png" class="c-pointer" alt="" v-if="user">
      </div>
    <b>{{user}}</b>
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
  data(){
    return {
      avatar: "",
      user:""
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
  },
  created() {
    this.avatar="@/assets/images/"
    this.user=localStorage.getItem('USER')?localStorage.getItem('USER'):""
  }
}
</script>

<style scoped>
header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #dcdcdc;
  padding-block: 10px;
  padding-inline: 15px;
  margin-bottom: 20px;
}
.userPanel{
  display: flex;
  align-items: center;
}
.userAvatar{
  margin-inline:10px;
  width: 40px;
  height: 40px;
}
.userAvatar img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
