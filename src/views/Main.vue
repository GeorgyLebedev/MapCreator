<template>
  <NewMapWindow v-if="showNewMapWin"
                @closeWindow="$store.commit('modalFlags/setShowNewMapWin',false)"
                @newMap="addNewMap"/>
  <MapEditWindow
      v-if="showEditMapWin"
      :map-name="this.selectedMap.title"
      :map-desc="this.selectedMap.description"
      @closeWindow="$store.commit('modalFlags/setShowEditMapWin',false)"
      @updateName="(val)=>{this.selectedMap.title=val}"
      @updateDesc="(val)=>{this.selectedMap.description=val}"
      @updateMapMetadata="updateMapMetadata(this.selectedMap)"
  />
  <MapDeleteWindow
      v-if="showDelMapWin"
      :map-name="this.selectedMap.title"
      @closeWindow="$store.commit('modalFlags/setShowDelMapWin',false)"
      @deleteMap="deleteMap(this.selectedMap)"
  />
  <Header/>
  <div class="flexRow">
    <MapCard v-for="map in this.mapList" :key="map._id"
             :map="map"
             @showEditMapWin="()=>{
               this.selectedMap=map
               $store.commit('modalFlags/setShowEditMapWin',true)}"
             @showDelMapWin="()=>{
               this.selectedMap=map
               $store.commit('modalFlags/setShowDelMapWin',true)}"/>
    <div class="map">
      <div class="newMap" id="newMapCard" @click="$store.commit('modalFlags/setShowNewMapWin',true)">
        <img src="@/assets/images/new.png" :width="70">
        <p style="color: #909090">Создать новую карту </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Header from '@/components/main/Header.vue'
import MapCard from "@/components/main/MapCard";
import NewMapWindow from "@/components/main/NewMapWindow";
import MapEditWindow from "@/components/MapEditWindow";
import MapDeleteWindow from "@/components/main/MapDeleteWindow";
import {defineComponent} from "vue";
import {logOut, addNewMap, updateMapMetadata, getMaps, deleteMap} from "@/modules/services/mainPageUtils";
import {mapGetters} from "vuex";
export default defineComponent({
  name: 'MainPage',
  components: {
    Header,
    MapCard,
    NewMapWindow,
    MapEditWindow,
    MapDeleteWindow,
  },
  data() {
    return {
      selectedMap: {},
      mapList: [] as object[]|undefined,
    }
  },
  methods: {
    logOut: logOut,
    addNewMap:addNewMap,
    updateMapMetadata:updateMapMetadata,
    getMaps:getMaps,
    deleteMap:deleteMap
  },
  computed: {
    ...mapGetters({
      showEditMapWin: 'modalFlags/showEditMapWin',
      showNewMapWin: 'modalFlags/showNewMapWin',
      showDelMapWin: 'modalFlags/showDelMapWin',
      showProfile: 'modalFlags/showProfile',
    }),
  },
  async created() {
    if (!localStorage.getItem('TOKEN')) await this.logOut()
    this.mapList=await this.getMaps()
  }
})
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
