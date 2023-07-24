<template>
    <div class="background-fill"></div>
    <transition name="show-opt">
  <NewMapWindow v-if="showNewMapWin"
                @closeWindow="this.$store.commit('modalFlags/setShowNewMapWin',false)"
                @newMap="addNewMap"/>
    </transition>
    <transition name="show-opt">
  <MapEditWindow
      v-if="showEditMapWin"
      :map-name="this.selectedMap.title"
      :map-desc="this.selectedMap.description"
      @updateName="(val)=>{this.selectedMap.title=val}"
      @updateDesc="(val)=>{this.selectedMap.description=val}"
      @updateMapMetadata="updateMapMetadata(this.selectedMap)"
  />
    </transition>
    <transition name="show-opt">
  <MapDeleteWindow
      v-if="showDelMapWin"
      :map-name="this.selectedMap.title"
      @deleteMap="deleteMap(this.selectedMap)"
  />
    </transition>
  <Header/>
    <section class="main-body">
  <div class="flex-row">
    <MapCard v-for="map in this.mapList" :key="map._id"
             :map="map"
             @showEditMapWin="()=>{
               this.selectedMap=map
               this.$store.commit('modalFlags/setShowEditMapWin',true)}"
             @showDelMapWin="()=>{
               this.selectedMap=map
               this.$store.commit('modalFlags/setShowDelMapWin',true)}"/>
    <section class="map">
      <div class="new-map cursor-pointer" @click="this.$store.commit('modalFlags/setShowNewMapWin',true)">
	  <svg class="new-map-img svg-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	      <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15 M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke-width="1.5" stroke-linecap="round"/>
	  </svg>
        <p class="text-orange-colored">Создать новую карту </p>
      </div>
    </section>
  </div>
    </section>
</template>
<script lang="ts">
import Header from '@/components/main/Header.vue'
import MapCard from "@/components/main/MapCard.vue";
import NewMapWindow from "@/components/main/NewMapWindow.vue";
import MapEditWindow from "@/components/MapEditWindow.vue";
import MapDeleteWindow from "@/components/main/MapDeleteWindow.vue";
import {defineComponent} from "vue";
import {logOut, addNewMap, updateMapMetadata, getMaps, deleteMap} from "@/modules/services/mainPage";
import {mapGetters} from "vuex";
import iMap from "@/modules/intefaces/map";

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
      selectedMap: {} as iMap,
      mapList: [] as iMap[] | undefined,
    }
  },
  methods: {
    logOut: logOut,
    async addNewMap(title: string, resolution: string) {
      await addNewMap(title, resolution)
      this.mapList = await this.getMaps()
    },
    async updateMapMetadata(selectedMap:iMap) {
      await updateMapMetadata(selectedMap)
      this.mapList = await this.getMaps()
    },
    getMaps: getMaps,
    async deleteMap(selectedMap:iMap) {
      await deleteMap(selectedMap)
      this.mapList = await this.getMaps()
    }
  },
  computed: {
    ...mapGetters({
      showEditMapWin: 'modalFlags/showEditMapWin',
      showNewMapWin: 'modalFlags/showNewMapWin',
      showDelMapWin: 'modalFlags/showDelMapWin',
    }),
  },
  async created() {
    if (!localStorage.getItem('TOKEN')) await this.logOut()
    this.mapList = await this.getMaps()
  }
})
</script>
<style scoped lang="sass">
@use '@/assets/styles/pages/Main'
</style>
