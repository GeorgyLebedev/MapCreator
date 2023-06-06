<template>
  <transition name="popup-anim">
    <div class="modalContainer">
      <div class="modalWindow">
        <div class="modalHeader">
          <b>Изменить информацию о карте</b>
          <img class="cursorPointer" src="@/assets/images/Service/close.png" alt="" width="30" height="30"
               @click="this.$emit('closeWindow')"></div>
        <hr>
        <div class="modalBody">
          Название карты:
          <input type="text" class="mapNameInput" placeholder="Минимум 6 символов" v-model="name">
          Описание карты:
          <textarea cols="30" rows="10" class="mapDescription" v-model="description"></textarea>
        </div>
        <div class="modalFooter">
          <button type="button" class="buttonLight" @click="this.$emit('closeWindow')">Отмена</button>
          <button type="button" class="buttonDark" :disabled="!(name.length>=6)" @click="this.$emit('updateMapMetadata')">Завершить</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "MapEditWindow",
  props: {
    mapName: {
      type: String,
      default: ""
    },
    mapDesc: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      name: "",
      description: ""
    }
  },
  watch: {
    name:{
      handler(val){
        this.$emit('updateName',val)
      }
    },
    description:{
      handler(val){
        this.$emit('updateDesc',val)
      }
    }
  },
  mounted() {
    this.name=this.mapName
    this.description=this.mapDesc
  }
}

</script>
<style>
.mapDescription{
  border: 2px solid #728391;
  border-radius: 10px;
  font-size: 14pt;
  width: 100%;
  margin-block: 10px;
  padding-inline: 10px;
  padding-block: 5px;
  outline: none;
  height: 400px;
  resize: none;
}
</style>
