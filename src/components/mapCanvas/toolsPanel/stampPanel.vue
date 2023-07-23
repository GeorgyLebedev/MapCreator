<template>
    <transition name="show-opt">
    <stampsWindow
        v-if="modalFlags.showStampsWin"
        :stamps-prop="stamps"
        :selected-kit-prop="currentKit"
        :selected-stamp-prop="currentStamp"
        @closeWindow="modalFlags.showStampsWin=false"
    />
    </transition>
    <div class="tools-options">
        <div class="scroll-container">
      <div class="flex-row justify-between align-center">
        <b> Штамп </b>
      <svg class="close-options-img" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64" @click="$emit('closePanel')">
          <g><path d="  M 17.05 31.58  A 0.46 0.45 46.3 0 0 17.04 32.24  Q 26.02 41.06 34.88 50.04  C 36.05 51.23 36.53 52.34 35.07 53.54  A 1.86 1.86 0.0 0 1 32.58 53.42  Q 22.85 43.77 13.02 33.97  Q 11.05 32.01 13.03 30.04  Q 22.85 20.25 32.67 10.47  Q 34.39 8.75 35.63 10.84  Q 36.35 12.05 35.35 13.11  Q 26.50 22.63 17.05 31.58  Z"/><path d="  M 33.04 31.58  A 0.47 0.46 44.6 0 0 33.05 32.24  Q 42.02 41.07 50.88 50.04  C 52.05 51.23 52.53 52.34 51.07 53.54  A 1.86 1.86 0.0 0 1 48.58 53.42  Q 38.85 43.77 29.02 33.97  Q 27.05 32.01 29.03 30.04  Q 38.74 20.36 48.56 10.81  Q 50.10 9.32 51.51 10.67  A 1.80 1.79 -45.5 0 1 51.53 13.24  L 33.04 31.58  Z"/></g>
      </svg>
      </div>
      <hr>
      <section class="flex-column " v-if="!Object.keys(this.selectedObject).length">
        <div class="stamps-container flex-row" v-if="currentKitLength>0">
          <div class="big-stamp-container flex-column">
            <div class="big-stamp">
              <img :src="currentStamp" alt="">
            </div>
            <div class="flex-row justify-between align-center">
              <img src="@/assets/images/leftArrow.png" class="cursor-pointer" height="20" @click="getSwitchStamp(true)">
              {{ stampNumber + 1 }}/{{ currentKitLength }}
              <img src="@/assets/images/rightArrow.png" class="cursor-pointer" height="20" @click="getSwitchStamp(false)">
            </div>
          </div>
          <div class="stamps-table">
            <div class="small-stamp cursor-pointer"
                 v-for="(key) in visibleStamps"
                 :class="{'current-stamp':stamps[currentKit][key]===currentStamp}"
                 :key="key"
                 @click="this.currentStamp = this.currentKitObj[key]">
              <img :src="stamps[currentKit][key]" alt="">
            </div>
          </div>
        </div>
        <button class="button-light button-small" @click="modalFlags.showStampsWin=true">Открыть каталог</button>
        <hr>
      </section>
      <div class="flex-row align-center" title="Размер иконок">
        <img src="@/assets/images/Tools/Options/size.png" alt="" height="20">
        <input type="range" step="10" min="10" max="500" v-model="size">
        <input type="number" step="1" min="10" max="500" class="input-number-style" v-model="size">
      </div>
      <hr>
      <div class="flex-row align-center" title="Непрозрачность иконок">
        <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
        <input type="range" step="0.1" min="0" max="1" v-model="opacity">
        <input type="number" step="0.1" min="0" max="1" class="input-number-style" v-model="opacity">
      </div>
      <hr>
      <div class="flex-row align-center" title="Поворот иконок">
        <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
        <input type="range" step="1" min="-180" max="180" v-model="rotation">
        <input type="number" step="1" min="-180" max="180" v-model="rotation"
               class="input-number-style">
      </div>
	</div>
    </div>
</template>

<script lang="ts">
import {flags} from "@/modules/logic/flags";
import stampsWindow from "@/components/mapCanvas/StampsWindow.vue";
import {mapGetters} from "vuex";
import {defineComponent} from "vue";

export default defineComponent({
  name: "stampPanel",
  components:{
    stampsWindow
  },
  props:{
    stampsProp: Object,
  },
  emits:['closePanel'],
  data(){
    return{
      stamps: {} as { [key: string]: any },
      modalFlags:flags,
    }
  },
  methods:{
    getSwitchStamp(flag:boolean) {
      const keys = Object.keys(this.currentKitObj);
      const key = flag
          ? (this.stampNumber - 1 < 0 ? keys[keys.length - 1] : keys[this.stampNumber - 1])
          : (this.stampNumber + 1 > keys.length - 1 ? keys[0] : keys[this.stampNumber + 1]);
      this.currentStamp = this.currentKitObj[key];
    }
  },
  computed: {
    ...mapGetters({
      selectedObject:'selection/getSelectedObject'
    }),
    size:{
      get():number{
        return this.$store.state.stampOptions.size
      },
      set(value:number):void{
        this.$store.commit('stampOptions/updateStampOptions', {size:value})
      }
    },
    opacity:{
      get():number{
        return this.$store.state.stampOptions.opacity
      },
      set(value:number):void{
        this.$store.commit('stampOptions/updateStampOptions', {opacity:value})
      }
    },
    rotation: {
      get():number{
        return this.$store.state.stampOptions.rotation
      },
      set(value:number):void{
        this.$store.commit('stampOptions/updateStampOptions', {rotation:value})
      }
    },
    currentKit: {
      get(){
        return this.$store.state.stampOptions.currentKit
      },
      set(value:string):void{
        this.$store.commit('stampOptions/updateStampOptions', {currentKit:value})
      }
    },
    currentStamp: {
      get():string{
        return this.$store.state.stampOptions.currentStamp
      },
      set(value:string):void{
        this.$store.commit('stampOptions/updateStampOptions', {currentStamp:value})
      }
    },
    stampNumber():number{
      return Object.values(this.currentKitObj).indexOf(this.currentStamp)
    },
    currentKitLength():number {
      if(this.stamps[this.currentKit])
      return Object.keys(this.stamps[this.currentKit]).length
      else return 0
    },
    findRowEnd():number {
      if (this.stampNumber % 3 < 0) {
        return this.stampNumber + (3 - this.stampNumber % 3);
      } else {
        return this.stampNumber - this.stampNumber % 3;
      }
    },
    currentKitObj() {
      if(this.stamps[this.currentKit])
      return this.stamps[this.currentKit]
      else return 0
    },
    visibleStamps():string[]|undefined {
      if(!this.currentKitObj) return
      if (Object.keys(this.currentKitObj).length > 9) {
        if (this.stampNumber % 3 == 0)
          return Object.keys(this.currentKitObj).slice(this.stampNumber, this.stampNumber + 9)
        else
          return Object.keys(this.currentKitObj).slice(this.findRowEnd, this.findRowEnd + 9)
      } else
        return Object.keys(this.stamps[this.currentKit])
    },
  },
  mounted():void{
    if(this.stampsProp)
      this.stamps=this.stampsProp
    this.currentKit = Object.keys(this.stamps)[0]
    this.currentStamp = this.currentKitObj[Object.keys(this.currentKitObj)[0]]
  },
})
</script>

<style scoped lang="sass">
@use "@/assets/styles/Variables"
.stamps-container
  max-width: 100%
  max-height: 150px

.big-stamp
  width: 100%
  height: 80%
  border: 1px solid Variables.$medium-color
  border-radius: 5px
  margin-bottom: 5px
  & img
    padding: 5px
    object-fit: contain
    width: 100%
    height: 100%

.big-stamp-container
  width: 115px
  max-width: 115px
  height: 150px

.current-stamp
  border: 1px solid Variables.$medium-color
  background-color: rgba(0, 0, 0, 0.15)

.small-stamp
  width: 45px
  height: 45px
  border-radius: 5px
  margin-left: 5px
  margin-bottom: 5px
  & img
    padding: 1px
    object-fit: contain
    width: 100%
    height: 100%
  &:not(.current-stamp)
    border: 1px solid Variables.$medium-color


.stamps-table
  height: 150px
  width: 150px
  display: flex
  align-content: flex-start
  flex-wrap: wrap

</style>
