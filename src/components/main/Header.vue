<template>
  <header>
    <img src="@/assets/images/logo.png" alt="" :height="50">
    <div class="userPanel">
      <div class="userAvatarSmall" @click="modalFlags.showProfile=true">
        <img :src="user.avatar" class="c-pointer" alt="" v-if="user">
      </div>
      <b class="c-pointer" @click="modalFlags.showProfile=true">{{ user.login ? user.login : user.email }}</b>
    </div>
  </header>
  <transition name="slide">
    <div class="profileContainer" v-if="modalFlags.showProfile" @click.self="modalFlags.showProfile=false">
      <div class="userProfile" @click.stop>
        <div class="avatarContainer" @click="this.$refs.avatarInput.click()">
          <img class="userAvatar c-pointer" :src="user.avatar" alt="">
          <img class="hoverCameraIcon c-pointer" src="@/assets/images/Service/camera.png" alt="">
          <input type="file" :hidden="true" ref="avatarInput" accept=".png, .jpg, .jpeg, .svg" @change="loadAvatar">
        </div>
        <hr>
        <section class="userMailText" :title="user.email">{{ user.email }}</section>
        <hr>
        <section class="userLoginText c-pointer" :title="user.login?user.login:''">
          {{ user.login ? user.login : "Логин не выбран" }}
        </section>
        <hr>
        <section class="regDateText">Дата регистрации: {{ registrationDate }}</section>
        <hr>
        <a href="/Login">
          <button type="button" class="buttonLight" @click="logOut()">Выход</button>
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
import AxiosRequest from "@/modules/services/axiosRequest";
import {flags} from "@/modules/logic/flags";

export default {
  name: 'NavBar',
  data() {
    return {
      modalFlags: flags,
      user: {},
      registrationDate: ""
    }
  },
  methods: {
    async logOut() {
      let request, response
      request = new AxiosRequest("auth/logout", "post")
      response = await request.sendRequest()
      localStorage.clear()
      if (!response) return
    },
    async updateUserAvatar(avatar){
      let request, response
      request = new AxiosRequest("user/", "put", {avatar:avatar})
      response=await request.sendRequest()
      if(!response.msg){
        this.$router.go(0)
      }
      this.$emit('errorAlert',response.msg)
    },
    loadAvatar(){
      let extensions = ['png', 'jpeg', 'jpg', 'svg']
      const avatar = event.target.files[0];
      if (extensions.indexOf(avatar.name.split('.').pop().toLowerCase()) == -1) {
        this.$emit('errorAlert', "Расширение выбранного файла не поддерживается!")
        return
      }
      else if(avatar.size>4e5){
        this.$emit('errorAlert',"Размер загружаемого изображения не должен превышать 300 КБ!")
      }
      else{
        const reader = new FileReader();
        reader.readAsDataURL(avatar);
        reader.onload = () => {
          try {
            this.updateUserAvatar(reader.result)
            this.$refs.avatarInput.value=""
          }
          catch (e){
            this.$emit('errorAlert',e.message)
          }
        };
    }
  }},
  async created() {
    let request
    request = new AxiosRequest("user/", "get")
    this.user = (await request.sendRequest()).user
    let day, month, year
    day = '' + new Date(this.user.regDate).getDate()
    if (day.length < 2) day = '0' + day
    month = '' + (new Date(this.user.regDate).getMonth() + 1)
    if (month.length < 2) month = '0' + month
    year = '' + new Date(this.user.regDate).getFullYear()
    this.registrationDate = day + '.' + month + '.' + year
  }
}
</script>
<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #dcdcdc;
  padding-block: 10px;
  padding-inline: 15px;
  margin-bottom: 20px;
}

.userPanel {
  display: flex;
  align-items: center;
}

.userAvatarSmall {
  margin-inline: 10px;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
}

.userAvatarSmall img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profileContainer {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 4;
}
.userProfile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  z-index: 5;
  right: 10px;
  padding: 10px;
  top: 60px;
  width: 250px;
  background-color: white;
  border: 2px solid gainsboro;
  border-radius: 15px;
}
hr {
  color: gainsboro;
  background-color: gainsboro;
  height: 1px;
  width: 100%;
}
.avatarContainer{
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
}
.userAvatar {
  align-self: center;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.hoverCameraIcon {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 70%);
  width: 40px;
  opacity: 0;
}
.avatarContainer:hover .userAvatar {
  filter: brightness(0.3);
}

.avatarContainer:hover .hoverCameraIcon {
  opacity: 1;
}

.userProfile a {
  align-self: center;
}

.userMailText {
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.userLoginText {
  max-width: 100%;
  font-size: smaller;
  color: #555555;
}

.regDateText {
  max-width: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
