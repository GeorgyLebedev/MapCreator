<template>
<div class="m-0 p-0 border-top botMenu" id="footer">
<div class="d-flex justify-content-between align-items-center ">
  <div class="d-flex align-items-center">
    <button type="button" id="btnsave" class="radio-icon card bg-white me-2 p-0">
      <img src="@/assets/images/Tools/save.png" alt="" class="card-img-top p-1 icon-mid hoverinv" height="40">
    </button>
    <span class="me-2">
    <u><b>Изменений: 11</b></u></span>
    <span class="text-muted">Не сохранено</span>
  </div>
  <div class="d-flex align-items-center pe-2">
    <button type="button" id="resetscale" class="btn btn-outline-dark py-0 px-1 me-2 " data-bs-toggle="tooltip" data-bs-placement="top" title="Сбросить" v-on:click="scale=1" v-if="scale!=1">
      <img src="@/assets/images/Service/reset.png" alt="" class="hoverinv" :height="25">
    </button>
    <img src="@/assets/images/Tools/zoom.png" :height="20">
    <div class="d-flex mx-2">
      <input class="me-2" type="range" step="0.2" min="0.2"  max="5" v-model="scale">
      <input type="number" min="0.2" max="5" step="0.2" v-model="scale">
    </div>
    <button type="button" id="fitbtn" class="btn btn-sm btn-outline-dark me-2" @click="$emit('resetAlign')">Выровнять</button>
  </div>
</div>
</div>
</template>
<script>
export default {
  name: "BotMenu",
  data (){
    return {
      scale: 1
    }
  },
  props:{
    scaleProp: Number
  },
  watch:{
    scale(val){
      this.$emit('scaleChange', Number(val))
      this.$emit("zoom")
    },
    scaleProp: {
         handler(val){
           this.scale=val
         }
    }
  }
}
</script>
<style>
.botMenu{
  background-color: white;
  grid-area: BotMenu;
  position: fixed;
  bottom:0;
  width:100%;
  z-index: 4;
}
#btnsave{
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-bottom: none;
}
#btnsave:hover{
  background-color: #232323 !important;

}

</style>
