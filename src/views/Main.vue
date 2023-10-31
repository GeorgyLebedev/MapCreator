<template>
    <div class="background-fill"></div>
    <transition name="show-opt">
	<NewMapWindow v-if="showNewMapWin"/>
    </transition>
    <transition name="show-opt">
	<MapEditWindow
		v-if="showEditMapWin"
	/>
    </transition>
    <transition name="show-opt">
	<MapDeleteWindow
		v-if="showDelMapWin"
	/>
    </transition>
    <Header/>
    <section class="main-body">
	<div class="flex-row">
	    <MapCard v-for="map in this.mapList" :key="map._id" :map="map"/>
	    <section class="map">
		<div class="new-map cursor-pointer" @click="this.$store.commit('modalFlags/setShowNewMapWin',true)">
		    <svg class="new-map-img svg-orange" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15 M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke-linecap="round" stroke-width="1.5"/>
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
import {mapGetters} from "vuex";
import iMap from "@/modules/intefaces/map";
import store from "@/modules/store/store";

export default defineComponent({
    name: 'MainPage',
    components: {
        Header,
        MapCard,
        NewMapWindow,
        MapEditWindow,
        MapDeleteWindow,
    },
    computed: {
        ...mapGetters({
            showEditMapWin: 'modalFlags/showEditMapWin',
            showNewMapWin: 'modalFlags/showNewMapWin',
            showDelMapWin: 'modalFlags/showDelMapWin',
            mapList: 'mainState/getMapList',
        }),
        selectedMap: {
            get(): iMap {
                return store.getters['mainState/getSelectedMap']
            },
            set(value:iMap):void {
								store.commit('mainState/setSelectedMap',value)
            }
        }
    },
    async created() {
        if (!localStorage.getItem('TOKEN')) await this.$store.dispatch('logOut')
        await this.$store.dispatch('mainState/getMaps')
    }
})
</script>
<style lang="sass" scoped>
@use '@/assets/styles/pages/Main'
</style>
