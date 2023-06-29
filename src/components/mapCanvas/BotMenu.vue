<template>
  <div class="botMenu" id="footer">
    <div class="flexRow justifyBetween alignCenter">
      <div class="flexRow alignCenter">
        <button type="button" class="saveButton" @click="saveMap">
          <img src="@/assets/images/Tools/save.png" alt="" class="card-img-top p-1 icon-mid hoverInvert" height="40">
        </button>
        <section class="changesContent">
        <u><b>Изменений: {{ changes }}</b></u>
        <span>{{changes>0?'Не сохранено':'Нет изменений'}}</span>
        </section>
      </div>
      <section class="flexRow alignCenter">
      <button type="button" class="resetButton" title="Сбросить" v-on:click="$emit('resetScale')" v-if="scale!=1">
        <img src="@/assets/images/Service/reset.png" alt="" class="hoverInvert">
      </button>
      <div class="flexRow alignCenter justifyBetween controlPanel">
        <img src="@/assets/images/Tools/zoom.png" :height="20">
        <div class="flexRow alignCenter">
          <input type="range" step="0.2" min="0.2" max="5" v-model="scale" @input="doZoom" class="zoomRange">
          <input type="number" min="0.2" max="5" step="0.2" v-model="scale" @input="doZoom">
        </div>
        <button type="button" class="buttonLight buttonSmall" @click="$emit('resetAlign')">Выровнять</button>
      </div>
      </section>
    </div>
  </div>
</template>
<script>

import {mapGetters} from "vuex";

export default {
  name: "BotMenu",
  data() {
    return {
      scale: 1,
    }
  },
  methods: {
    doZoom() {
      this.$emit("zoom", event, Number(this.scale), "=")
    },
    saveMap() {
      this.$emit('saveMap')
    }
  },
  props: {
    scaleProp: Number,
  },
  emits:['resetAlign','zoom','resetScale','saveMap'],
  computed:{
    ...mapGetters({
    changes: "getChangesCount"
    })
  },
  watch: {
    scaleProp(val) {
      this.scale = val
    },
    changesProp(val) {
      this.changes = val
    }
  }
}
</script>
<style scoped>
.botMenu {
  background-color: white;
  grid-area: BotMenu;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #dcdcdc;
  width: 100%;
  z-index: 4;
}

.saveButton {
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-bottom: none;
  background-color: white;
  max-width: 41px;
  max-height: 40px;
  border-right: 1px solid #dcdcdc;
  cursor: pointer;
  padding: 5px;
}
.saveButton img, .resetButton img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.saveButton:hover, .resetButton:hover {
  background-color: #3d4551;
}
.changesContent{
  margin-inline: 10px;
}
.changesContent span{
  color: #3d4551;
  margin-inline: 5px
}
.controlPanel{
  margin-inline: 20px;
  width: 385px;
}
.buttonLight img{
  width: 100%;
  max-height: 25px;
  max-width: 25px;
  height: 100%;
  object-fit: contain;
}
.resetButton{
  max-height: 30px;
  max-width: 30px;
  background-color: white;
  border: 1px solid #3d4551;
  border-radius: 10px;
  cursor: pointer;
}
</style>
