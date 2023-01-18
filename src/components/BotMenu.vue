<template>
<div class="m-0 p-0 border-top botMenu">
<div class="d-flex justify-content-between align-items-center ">
  <div class="d-flex align-items-center">
    <button type="button" id="btnsave" class="radio-icon card bg-white me-2 p-0">
      <img src="@/assets/images/Tools/save.png" alt="" class="card-img-top p-1 icon-mid hoverinv" height="40">
    </button>
    &lt;Изменений: 11&gt; Не сохранено
  </div>
  <div class="d-flex align-items-center pe-2">
    <button type="button" id="resetscale" class="btn btn-outline-dark py-0 px-1 me-2 " data-bs-toggle="tooltip" data-bs-placement="top" title="Сбросить" v-on:click="scale=100">
      <img src="@/assets/images/Tools/reset.png" alt="" class="hoverinv" :height="20">
    </button>
    <img src="@/assets/images/Tools/zoom.png" :height="20">
    <div class="d-flex mx-2">
      <input class="me-2" type="range" step="10" min="20"  max="500" v-model="scale">
      <input type="number" min="20" max="500" step="1" v-model="scale">
    </div>
    <button type="button" id="fitbtn" class="btn btn-sm btn-outline-dark me-2">Выровнять</button>
  </div>
</div>
</div>
</template>
<script>
export default {
  name: "BotMenu",
  data (){
    return {
      scale: 100
    }
  },
  watch:{
    scale(val){
      this.$emit('scaleChange', {newScale: val})
    }
  }
}
</script>
<style>
.botMenu{
  background-color: white;
  grid-area: BotMenu;
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
