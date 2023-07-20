<template>
    <header>
	<img class="header-logo" src="@/assets/images/logo.png">
	<button class="button-light button-middle" @click="this.$refs.manualLink.click()">Справка</button>
	<a ref="manualLink" :hidden="true" download href="/mcmanual.pdf"></a>
	<div class="user-panel">
	    <div class="user-avatar-small" @click="modalFlags.showProfile=true">
		<img v-if="user" :src="user.avatar" alt="" class="cursor-pointer">
	    </div>
	    <b class="cursor-pointer " @click="modalFlags.showProfile=true">{{
                user.login ? user.login : user.email
		}}</b>
	</div>
    </header>
    <transition name="slide">
	<div v-if="modalFlags.showProfile" class="invisibleContainer"
	     @mousedown.self="()=>{modalFlags.showProfile=false; createNewLogin=false}">
	    <div class="user-profile" @click.stop>
		<div class="flex-row">
		    <div class="flex-column">
			<section class="avatar-container" @click="this.$refs.avatarInput.click()">
			    <img :src="user.avatar" alt="" class="user-avatar cursor-pointer">
			    <img alt="" class="hover-camera-icon cursor-pointer"
				 src="@/assets/images/Service/camera.png">
			    <input ref="avatarInput" :hidden="true" accept=".png, .jpg, .jpeg, .svg" type="file"
				   @change="loadAvatar($event)">
			</section>
			<button class="button-light button-middle" type="button" @click="logOut()">Выход</button>
		    </div>
		    <div class="user-info">
			<div :title="user.email" class="user-field-name">Email:</div>
			{{ user.email }}
			<hr>
			<div :title="user.login?user.login:''" class="user-field-name">Логин:</div>
			<span v-if="!createNewLogin"
			      @click="createNewLogin=true">

				<u class="text-medium-colored cursor-pointer">
				    {{ user.login ? user.login : "Логин не выбран" }}
				</u>
			    </span>
			<section v-else class="new-login-form">
			    <input v-model="newLogin" class="input-small" placeholder="От 8 до 30 символов" type="text">
			    <div class="flex-row">
				<svg class="svg-cross-tick" viewBox="0 0 24 24" width="30px"
				     xmlns="http://www.w3.org/2000/svg" @click="createNewLogin=false">
				    <path d="M19 5L4.99998 19M5.00001 5L19 19" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
				</svg>
				<transition name="scale">
				    <svg v-if="!(newLogin.length<8 || newLogin.length>30)"
					 class="svg-cross-tick" fill="none" viewBox="0 -0.5 25 25"
					 width="30px" xmlns="http://www.w3.org/2000/svg" @click="updateUserData({login: newLogin})">
					<path d="M5.5 12.5L10.167 17L19.5 8" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
				    </svg>
				</transition>
			    </div>
			</section>
			<hr>
			<div class="user-field-name">Дата регистрации:</div>
			{{ registrationDate }}
		    </div>
		</div>

	    </div>
	</div>
    </transition>
</template>

<script lang="ts">
import AxiosRequest from "@/modules/services/axiosRequest";
import {flags} from "@/modules/logic/flags";
import {defineComponent} from "vue";
import iUser from "@/modules/intefaces/user";
import store from "@/modules/store/store";
export default defineComponent({
    name: 'HeaderComponent',
    data() {
        return {
            modalFlags: flags,
            user: {} as iUser,
            registrationDate: "" as string,
            createNewLogin: false as boolean,
            newLogin: "" as string
        }
    },
    methods: {
        async logOut():Promise<void> {
            const request:AxiosRequest  = new AxiosRequest("auth/logout", "post")
            const response = await request.sendRequest()
            localStorage.clear()
            if (!response) return
        },
        async updateUserData(data:any):Promise<void> {
            const request:AxiosRequest = new AxiosRequest("user/", "put", data)
            const response = await request.sendRequest()
            if (response) {
                this.$router.go(0)
            }
        },
        loadAvatar(event:Event):void {
            const extensions:string [] = ['png', 'jpeg', 'jpg', 'svg']
						const target=event.target as HTMLInputElement
						let avatar:any
						if(target && target.files?.[0]) avatar = target.files?.[0]
						else{
							store.commit("setNotification", ["error", "Ошибка загрузки файла! Попробуйте позже."])
							return
						}
            if (extensions.indexOf(avatar.name.split('.').pop().toLowerCase()) == -1) {
                store.commit("setNotification", ["message", "Расширение выбранного файла не поддерживается!"])
                return
            } else if (avatar.size > 4e5) {
                store.commit("setNotification", ["message", "Размер загружаемого изображения не должен превышать 300 КБ!"])
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(avatar);
                reader.onload = () => {
                    try {
                        this.updateUserData({avatar: reader.result})
												let input=this.$refs.avatarInput as HTMLInputElement
                        input.value = ""
                    } catch (e:any) {
                        store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
                    }
                };
            }
        },
    },
    async created():Promise<void> {
        let request
        request = new AxiosRequest("user/", "get")
        this.user = (await request.sendRequest()).user
        if (this.user.login) this.newLogin = this.user.login
				const date:string=this.user.registrationDate?? ""
        let day:string, month:string, year:string
        day = '' + new Date(date).getDate()
        if (day.length < 2) day = '0' + day
        month = '' + (new Date(date).getMonth() + 1)
        if (month.length < 2) month = '0' + month
        year = '' + new Date(date).getFullYear()
        this.registrationDate = day + '.' + month + '.' + year
    }
})
</script>
<style lang="sass" scoped>
@use '/src/assets/styles/Variables'
header
  position: relative
  display: flex
  flex-direction: row

  align-items: center
  border-bottom: 1px solid Variables.$medium-color
  padding-block: 10px
  padding-left: 15px
  z-index: 2
  background-color: Variables.$medium-light-color

.user-panel
  position: absolute
  right: 0
  display: flex
  align-items: center
  background-color: Variables.$light-color
  color: Variables.$orange-color
  padding: 5px
  border-radius: 25px 0 0 25px
  transition: all 0.3s ease-in

  &:hover
    padding: 5px 25px 5px 5px

.user-avatar-small
  margin-inline: 10px
  width: 40px
  height: 40px
  overflow: hidden
  border-radius: 50%

  & img
    width: 100%
    height: 100%
    object-fit: cover

.user-profile
  position: absolute
  z-index: 5
  padding: 10px
  top: 0
  right: 0
  max-width: 350px
  max-height: 170px
  background-color: Variables.$light-color
  border: 1px solid Variables.$medium-color
  border-radius: 15px 0 0 15px

.avatar-container
  position: relative
  overflow: hidden
  border-radius: 50%
  width: 110px
  height: 110px

.user-avatar
  align-self: center
  width: 100%
  height: 100%
  object-fit: cover

.hover-camera-icon
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  width: 40px
  opacity: 0

.avatar-container:hover
  .user-avatar
    filter: brightness(0.3)

  .hover-camera-icon
    opacity: 1

.user-info
  display: flex
  flex-direction: column
  width: 250px
  max-width: 250px
  margin-left: 10px

.new-login-form
  display: flex
  flex-direction: row
  align-items: center
  width: 100%
  height: 25px

  input
    width: 100%
    margin-block: 5px

  img
    width: 30px
    height: 30px

.user-field-name
  margin-bottom: 5px
  font-weight: bold
  color: Variables.$dark-color

.header-logo
  height: 50px
  margin-right: 25px
</style>
