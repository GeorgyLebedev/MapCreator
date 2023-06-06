<template>
  <ErrorComponent
      :error=this.error
      @clearError="()=>{this.error=''}"/>
  <NewMapWindow v-if="modalFlags.showNewMapWin"
                @closeWindow="()=>{modalFlags.showNewMapWin = false}"
                @newMap="addNewMap"/>
  <MapEditWindow
      v-if="modalFlags.showEditMapWin"
      :map-name="this.selectedMap.title"
      :map-desc="this.selectedMap.description"
      @closeWindow="()=>{modalFlags.showEditMapWin = false}"
      @updateName="(val)=>{this.selectedMap.title=val}"
      @updateDesc="(val)=>{this.selectedMap.description=val}"
      @updateMapMetadata="updateMapMetadata(this.selectedMap)"
  />
  <MapDeleteWindow
      v-if="modalFlags.showDelMapWin"
      :map-name="this.selectedMap.title"
      @closeWindow="()=>{modalFlags.showDelMapWin = false}"
      @deleteMap="deleteMap(this.selectedMap)"
  />
  <Header/>
  <div class="flexRow">
    <MapCard v-for="map in this.mapList" :key="map._id"
             :map="map"
             @showEditMapWin="()=>{
               this.selectedMap=map
               modalFlags.showEditMapWin = true}"
             @showDelMapWin="()=>{
               this.selectedMap=map
               modalFlags.showDelMapWin = true}"/>
    <div class="map">
      <div class="newMap" id="newMapCard" @click="modalFlags.showNewMapWin=true">
        <img src="@/assets/images/new.png" :width="70">
        <p style="color: #909090">Создать новую карту </p>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/main/Header.vue'
import MapCard from "@/components/main/MapCard";
import NewMapWindow from "@/components/main/NewMapWindow";
import MapEditWindow from "@/components/MapEditWindow";
import MapDeleteWindow from "@/components/main/MapDeleteWindow";
import ErrorComponent from "@/components/Error"
import AxiosRequest from "@/modules/services/axiosRequest";
import {flags} from "@/modules/logic/flags";
export default {
  name: 'MainPage',
  components: {
    Header,
    MapCard,
    NewMapWindow,
    MapEditWindow,
    MapDeleteWindow,
    ErrorComponent
  },
  data() {
    return {
      modalFlags: flags,
      selectedMap: {},
      error: "",
      mapList: [],
    }
  },
  methods: {
    async logOut() {
      localStorage.clear()
      try {
        await new AxiosRequest('auth/logout', 'post').sendRequest()
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
        this.modalFlags.showNewMapWin=false
      } catch (e) {
        this.error = e
      }
    },
    async getMaps() { //получение карт пользователя
      let response, request
      try {//запрос на сервер с использованием AxiosRequest
        request = new AxiosRequest('map/', 'get')
        response = await request.sendRequest() //ожидание ответа
        if (response && response.maps) //если карты получены
          this.mapList = response.maps //передать их в массив
        if(response && response.msg) //если есть сообщение об ошибке - вывести его
          this.error=response.msg
      } catch (e) {
        this.error = e
      }
    },
    async deleteMap(map){
      let request
      try{
        request=new AxiosRequest(`map/${map._id}`, "delete")
        await request.sendRequest()
        map={}
        await this.getMaps()
        this.modalFlags.showDelMapWin=false
      }
      catch (e) {
        this.error = e
      }
    },
    async updateMapMetadata(map){
      let request
      try{
        request=new AxiosRequest(`map/${map._id}`, "put", {title:map.title, description:map.description})
        await request.sendRequest()
        await this.getMaps()
        this.modalFlags.showEditMapWin=false
      }
      catch (e){
        this.error=e
      }
    }
  },
  async created() {
    if (!localStorage.getItem('TOKEN')) await this.logOut()
    await this.getMaps()
  }
}
</script>
<style scoped>
#newMapCard {
  cursor: pointer;
}

.map {
  border: 2px solid #728391;
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
