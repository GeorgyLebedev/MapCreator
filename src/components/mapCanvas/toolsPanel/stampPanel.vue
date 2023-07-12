<template>
    <stampsWindow
        v-if="modalFlags.showStampsWin"
        :stamps-prop="stamps"
        :selected-kit-prop="currentKit"
        :selected-stamp-prop="currentStamp"
        @closeWindow="modalFlags.showStampsWin=false"
    />
    <div class="toolsOptions">
      <div class="flexRow justifyBetween alignCenter">
        <b> Штамп </b>
        <img src="@/assets/images/arrow-left.png" @click="$emit('closePanel')" class="cursor-pointer" height="20" alt="">
      </div>
      <hr>
      <section class="flexColumn " v-if="!Object.keys(this.selectedObject).length">
        <div class="stampsContainer flexRow" v-if="currentKitLength>0">
          <div class="bigStampContainer flexColumn">
            <div class="bigStamp">
              <img :src="currentStamp" alt="">
            </div>
            <div class="flexRow justifyBetween alignCenter">
              <img src="@/assets/images/leftArrow.png" class="cursor-pointer" height="20" @click="getSwitchStamp(true)">
              {{ stampNumber + 1 }}/{{ currentKitLength }}
              <img src="@/assets/images/rightArrow.png" class="cursor-pointer" height="20" @click="getSwitchStamp(false)">
            </div>
          </div>
          <div class="stampsTable">
            <div class="smallStamp cursor-pointer"
                 v-for="(key) in visibleStamps"
                 :class="{currentStamp:stamps[currentKit][key]===currentStamp}"
                 :key="key"
                 @click="this.currentStamp = this.currentKitObj[key]">
              <img :src="stamps[currentKit][key]" alt="">
            </div>
          </div>
        </div>
        <button class="buttonLight buttonSmall" @click="modalFlags.showStampsWin=true">Открыть каталог</button>
        <hr>
      </section>
      <div class="flexRow alignCenter" title="Размер иконок">
        <img src="@/assets/images/Tools/Options/size.png" alt="" height="20">
        <input type="range" step="10" min="10" max="500" v-model="size">
        <input type="number" step="1" min="10" max="500" class="input-number-style" v-model="size">
      </div>
      <hr>
      <div class="flexRow alignCenter" title="Непрозрачность иконок">
        <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
        <input type="range" step="0.1" min="0" max="1" v-model="opacity">
        <input type="number" step="0.1" min="0" max="1" class="input-number-style" v-model="opacity">
      </div>
      <hr>
      <div class="flexRow alignCenter" title="Поворот иконок">
        <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
        <input type="range" step="1" min="-180" max="180" v-model="rotation">
        <input type="number" step="1" min="-180" max="180" v-model="rotation"
               class="input-number-style">
      </div>
    </div>
</template>

<script>
import {flags} from "@/modules/logic/flags";
import stampsWindow from "@/components/mapCanvas/StampsWindow";
import {mapGetters} from "vuex";
export default {
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
      stamps: {},
      modalFlags:flags,
    }
  },
  methods:{
    getSwitchStamp(flag) {
      const keys = Object.keys(this.currentKitObj);
      let key = flag
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
      get(){
        return this.$store.state.stampOptions.size
      },
      set(value){
        this.$store.commit('stampOptions/updateStampOptions', {size:value})
      }
    },
    opacity:{
      get(){
        return this.$store.state.stampOptions.opacity
      },
      set(value){
        this.$store.commit('stampOptions/updateStampOptions', {opacity:value})
      }
    },
    rotation: {
      get(){
        return this.$store.state.stampOptions.rotation
      },
      set(value){
        this.$store.commit('stampOptions/updateStampOptions', {rotation:value})
      }
    },
    currentKit: {
      get(){
        return this.$store.state.stampOptions.currentKit
      },
      set(value){
        this.$store.commit('stampOptions/updateStampOptions', {currentKit:value})
      }
    },
    currentStamp: {
      get(){
        return this.$store.state.stampOptions.currentStamp
      },
      set(value){
        this.$store.commit('stampOptions/updateStampOptions', {currentStamp:value})
      }
    },
    stampNumber(){
      return Object.values(this.currentKitObj).indexOf(this.currentStamp)
    },
    currentKitLength() {
      if(this.stamps[this.currentKit])
      return Object.keys(this.stamps[this.currentKit]).length
      else return 0
    },
    findRowEnd() {
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
    visibleStamps() {
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
  mounted(){
    if(this.stampsProp)
      this.stamps=this.stampsProp
    this.currentKit = Object.keys(this.stamps)[0]
    this.currentStamp = this.currentKitObj[Object.keys(this.currentKitObj)[0]]
  },
}
</script>

<style scoped>

.stampsContainer {
  max-width: 100%;
  max-height: 150px;
}

.bigStamp {
  width: 100%;
  height: 80%;
  border: 1px solid gainsboro;
  border-radius: 5px;
  margin-bottom: 5px;
}

.bigStampContainer {
  width: 115px;
  max-width: 115px;
  height:150px;

}

.bigStamp img {
  padding: 5px;
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.currentStamp {
  border: 1px solid #232323;
  background-color: rgba(0, 0, 0, 0.15);
}

.smallStamp {
  width: 45px;
  height: 45px;
  border-radius: 5px;
  margin-left: 5px;
  margin-bottom: 5px;
}

.smallStamp:not(.currentStamp) {
  border: 1px solid gainsboro;
}

.smallStamp img {
  padding: 1px;
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.stampsTable {
  height: 150px;
  width: 150px;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
}

</style>
