<template>
  <ModalBox :showWindow="this.showNewMapWin"
  @closeWindow="this.closeWindow"/>
  <Header :user="this.USER"/>
  <div class="d-flex flex-wrap">
  <MapCard/>
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
import ModalBox from "@/components/ModalBox";
import axios from "axios";
export default {
  name: 'MainPage',
  data(){
    return{
      USER: null,
      showNewMapWin: false
    }
  },
  methods:{
    closeWindow(){
      this.showNewMapWin=false
    },
    async getMaps(){
      if(await axios({
        url: "http://localhost:1111/user/confirm",
        method: 'get',
        data: {
          userid: 1,
        }})){
      alert()
      }
    }
  },
  components: {
    Header,
    MapCard,
    ModalBox
  },
  mounted() {
      if(localStorage.getItem('USER')){
        this.USER=localStorage.getItem('USER')
      } else {
        this.USER=null
        this.$router.push('/Login')
      }
  }
}
</script>
<style scoped>
#newMapCard{
  cursor: pointer;
}
.map{
  border:2px solid #dcdcdc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width:300px;
  height: 300px;
  margin-bottom: 20px;
  margin-left: 20px;
}
.newMap{
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
</style>
