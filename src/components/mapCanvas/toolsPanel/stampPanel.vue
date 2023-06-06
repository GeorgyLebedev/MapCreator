<template>
    <div class="toolsOptions"
         v-if="true || (selectedObject && selectedObject.data.type=='stamp')">
      <div class="flexRow justifyBetween alignCenter">
        <b> Штамп </b>
        <img src="@/assets/images/arrow-left.png" @click="$emit('closePanel')" class="cursorPointer" height="20" alt="">
      </div>
      <hr>
      <section v-if="!selectedObject" class="flexColumn ">
        <div class="stampsContainer flexRow">
          <div class="bigStampContainer flexColumn">
            <div class="bigStamp">
              <img :src="stampOptions.currentStamp" alt="">
            </div>
            <div class="flexRow justifyBetween alignCenter">
              <img src="@/assets/images/leftArrow.png" class="cursorPointer" height="20" @click="stampNumber--">
              {{ stampNumber + 1 }}/{{ currentKitLength }}
              <img src="@/assets/images/rightArrow.png" class="cursorPointer" height="20" @click="stampNumber++">
            </div>
          </div>
          <div class="stampsTable">
            <div class="smallStamp cursorPointer"
                 v-for="(key) in visibleStamps"
                 :class="{currentStamp:stamps[stampOptions.currentKit][key]==stampOptions.currentStamp}"
                 :key="key"
                 @click="setCurrentStampByKey(key)">
              <img :src="stamps[stampOptions.currentKit][key]" alt="">
            </div>
          </div>
        </div>
        <button class="buttonLight" @click="modalFlags.showStampsWin=true">Открыть каталог</button>
        <hr>
      </section>
      <div class="flexRow alignCenter" title="Размер иконок">
        <img src="@/assets/images/Tools/Options/size.png" alt="" height="20">
        <input type="range" step="10" min="10" max="500" v-model="stampOptions.size">
        <input type="number" step="1" min="10" max="500" class="input-number-style" v-model="stampOptions.size">
      </div>
      <hr>
      <div class="flexRow alignCenter" title="Непрозрачность иконок">
        <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
        <input type="range" step="0.1" min="0" max="1" v-model="stampOptions.opacity">
        <input type="number" step="0.1" min="0" max="1" class="input-number-style" v-model="stampOptions.opacity">
      </div>
      <hr>
      <div class="flexRow alignCenter" title="Поворот иконок">
        <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
        <input type="range" step="1" min="-180" max="180" v-model="stampOptions.rotation">
        <input type="number" step="1" min="-180" max="180" v-model="stampOptions.rotation"
               class="input-number-style">
      </div>
    </div>
</template>

<script>
import {stampOptions} from "@/modules/options/stampOptions";
import {flags} from "@/modules/logic/flags";
export default {
  name: "stampPanel",
  props:{
    stampsProp: Object,
    selectedObject: Object
  },
  data(){
    return{
      stampNumber: 0,
      stamps: {},
      modalFlags:flags,
      stampOptions:stampOptions,
    }
  },
  methods:{
    setCurrentStampByKey(key) {
      this.stampOptions.currentStamp = this.currentKitObj[key]
      this.stampNumber = Object.keys(this.currentKitObj).indexOf(key)
    },
  },
  computed: {
    currentKitLength() {
      if(this.stamps[this.stampOptions.currentKit])
      return Object.keys(this.stamps[this.stampOptions.currentKit]).length
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
      if(this.stamps[this.stampOptions.currentKit])
      return this.stamps[this.stampOptions.currentKit]
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
        return Object.keys(this.stamps[this.stampOptions.currentKit])
    },
  },
  mounted(){
    if(this.stampsProp)
      this.stamps=this.stampsProp
    this.stampOptions.currentKit = Object.keys(this.stamps)[0]
    this.stampOptions.currentStamp = this.currentKitObj[Object.keys(this.currentKitObj)[this.stampNumber]]
  },
  watch:{
    stampNumber(val) {
      if (val < 0)
        this.stampNumber = Object.keys(this.currentKitObj).length - 1
      if (val > Object.keys(this.currentKitObj).length - 1)
        this.stampNumber = 0
      this.stampOptions.currentStamp = this.currentKitObj[Object.keys(this.currentKitObj)[val]]
    },
  }
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
