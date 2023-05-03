<template>
  <ErrorComponent
      :error=this.error
      @clearError="()=>{this.error=''}"/>
  <NewMapWindow :showWindow="showNewMapWin"
                @closeWindow="()=>{this.showNewMapWin = false}"
                @newMap="addNewMap"/>
  <MapEditWindow
      :show-window="showEditMapWin"
      @closeWindow="()=>{this.showEditMapWin = false}"
  />
  <Header :user="this.currentUser.login"/>
  <div class="d-flex flex-wrap">
    <MapCard v-for="map in this.mapList" :key="map._id"
             :change-date="map.changeDate"
             :creation-date="map.creationDate"
             :map-name="map.title"
             @showWindow="()=>{this.showEditMapWin = true}"/>
    <div class="map">
      <div class="newMap" id="newMapCard" @click="this.showNewMapWin=true">
        <img src="@/assets/images/new.png" :width="70">
        <p class="fs-5" style="color: #909090">Создать новую карту </p>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import MapCard from "@/components/MapCard";
import NewMapWindow from "@/components/NewMapWindow";
import MapEditWindow from "@/components/MapEditWindow";
import ErrorComponent from "@/components/Error"
import AxiosRequest from "@/components/Logic/axiosController";
/*const Map=require("../models/map")*/
export default {
  name: 'MainPage',
  data() {
    return {
      currentUser: {
        login: ""
      },
      showNewMapWin: false,
      showEditMapWin: false,
      error: "",
      mapList: [],
    }
  },
  methods: {
    async logOut() {
      localStorage.clear()
      try {
        await new AxiosRequest('/auth/logout', 'post').sendRequest()
        this.currentUser = null
        this.$router.push('/Login')
      } catch (e) {
        this.error = e
      }
    },
    async addNewMap(title, resolution) {
      let map, request
      try {
        map = {
          author: this.currentUser.id,
          title: title,
          creationDate: new Date(),
          changeDate: new Date(),
          description: "",
          resolution: resolution,
          objects: {},
        }
        request = new AxiosRequest('map/', 'post', map)
        await request.sendRequest()
        await this.getMaps()
      } catch (e) {
        this.error = e
      }
    },
    async getUser() {
      let response, request
      try {
        request = new AxiosRequest('user/', 'get')
        response = await request.sendRequest()
        if (response.user) this.currentUser = response.user
        if (response.msg) {
          this.error = response.msg
          setTimeout(this.logOut, 5000)
        }
      } catch (e) {
        this.error = e
      }
    },
    async getMaps() {
      let response, request
      try {
        request = new AxiosRequest('map/', 'get')
        response = await request.sendRequest()
        if (response.maps)
          this.mapList = response.maps
      } catch (e) {
        this.error = e
      }
    }
  },
  components: {
    Header,
    MapCard,
    NewMapWindow,
    MapEditWindow,
    ErrorComponent
  },
  async created() {
    if (!localStorage.getItem('TOKEN')) await this.logOut()
    await this.getUser()
    await this.getMaps()
  }
}
</script>
<style scoped>
#newMapCard {
  cursor: pointer;
}

.map {
  border: 2px solid #dcdcdc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
  margin-left: 20px;
}

.newMap {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
</style>
