<template>
<div class="modalContainer">
<div class="modalWindow">
  <div class="modalHeader">
    Удаление карты
    <img class="c-pointer" src="@/assets/images/Service/close.png" alt="" width="30" height="30"
         @click="this.$emit('closeWindow')">
  </div>
  <hr>
  <div class="modalBody">
    Для удаления карты введите её название в поле ниже: <br>
    <small>{{mapName}}</small>
    <input type="text" class="mapNameInput" v-model="inputMapName">
  </div>
  <div class="modalFooter">
    <button type="button" class="buttonLight" @click="this.$emit('closeWindow')">Отмена</button>
    <button type="button" class="buttonDark" @click="this.$emit('deleteMap')" :disabled="mapName!=inputMapName">Удалить</button>
  </div>
</div>
</div>
</template>
<script>
export default {
  name: "MapDeleteWindow",
  data(){
    return{
      inputMapName: ""
    }
  },
  props:{
    mapName:{
      type:String,
    }
  }
}
</script>
<style scoped>
.modalWindow{
  max-width: 400px;
}
small{
  color: #8a8a8a;
}
</style>
