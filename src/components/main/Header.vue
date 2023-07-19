<template>
    <header>
	<img src="@/assets/images/logo.png" class="header-logo">
	<button class="button-light button-middle" @click="this.$refs.manualLink.click()">Справка</button>
	<a href="/mcmanual.pdf" download ref="manualLink" :hidden="true"></a>
	<div class="user-panel">
	    <div class="user-avatar-small" @click="modalFlags.showProfile=true">
		<img :src="user.avatar" class="cursor-pointer" alt="" v-if="user">
	    </div>
	    <b class="cursor-pointer " @click="modalFlags.showProfile=true">{{
                user.login ? user.login : user.email
		}}</b>
	</div>
    </header>
    <transition name="slide">
	<div class="invisibleContainer" v-if="modalFlags.showProfile"
	     @mousedown.self="()=>{modalFlags.showProfile=false; createNewLogin=false}">
	    <div class="user-profile" @click.stop>
		<div class="flex-row">
		    <div class="flex-column">
			<section class="avatar-container" @click="this.$refs.avatarInput.click()">
			    <img class="user-avatar cursor-pointer" :src="user.avatar" alt="">
			    <img class="hover-camera-icon cursor-pointer" src="@/assets/images/Service/camera.png"
				 alt="">
			    <input type="file" :hidden="true" ref="avatarInput" accept=".png, .jpg, .jpeg, .svg"
				   @change="loadAvatar">
			</section>
			<button type="button" class="button-light button-middle" @click="logOut()">Выход</button>
		    </div>
		    <div class="user-info">
			<div class="user-field-name" :title="user.email">Email:</div>
			{{ user.email }}
			<hr>
					<div class="user-field-name" :title="user.login?user.login:''">Логин:</div>
			<span  v-if="!createNewLogin"
			      @click="createNewLogin=true">

				<u class="text-medium-colored cursor-pointer">
				    {{ user.login ? user.login : "Логин не выбран" }}
				</u>
			    </span>
			<section class="new-login-form" v-else>
			    <input class="input-small" type="text" placeholder="От 8 до 30 символов" v-model="newLogin">
				<div class="flex-row">
					<svg class="svg-cross-tick" width="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 	@click="createNewLogin=false">
						<path d="M19 5L4.99998 19M5.00001 5L19 19"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					<transition name="scale">
						<svg v-if="!(newLogin.length<8 || newLogin.length>30)" @click="updateUserData({login: newLogin})"  width="30px" class="svg-cross-tick" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.5 12.5L10.167 17L19.5 8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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

<script>
import AxiosRequest from "@/modules/services/axiosRequest";
import {flags} from "@/modules/logic/flags";

export default {
    name: 'HeaderComponent',
    data() {
	return {
	    modalFlags: flags,
	    user: {},
	    registrationDate: "",
	    createNewLogin: false,
	    newLogin: ""
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
	async updateUserData(data) {
	    let request, response
	    request = new AxiosRequest("user/", "put", data)
	    response = await request.sendRequest()
	    if (response) {
		this.$router.go(0)
	    }
	},
	loadAvatar() {
	    let extensions = ['png', 'jpeg', 'jpg', 'svg']
	    const avatar = event.target.files[0];
	    if (extensions.indexOf(avatar.name.split('.').pop().toLowerCase()) == -1) {
		this.$store.commit("setNotification", ["message", "Расширение выбранного файла не поддерживается!"])
		return
	    } else if (avatar.size > 4e5) {
		this.$store.commit("setNotification", ["message", "Размер загружаемого изображения не должен превышать 300 КБ!\""])
	    } else {
		const reader = new FileReader();
		reader.readAsDataURL(avatar);
		reader.onload = () => {
		    try {
			this.updateUserData({avatar: reader.result})
			this.$refs.avatarInput.value = ""
		    } catch (e) {
			this.$store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
		    }
		};
	    }
	},
    },
    async created() {
	let request
	request = new AxiosRequest("user/", "get")
	this.user = (await request.sendRequest()).user
	if (this.user.login) this.newLogin = this.user.login
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
<style scoped lang="sass">
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
