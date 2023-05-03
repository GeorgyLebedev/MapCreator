<template>
  <transition name="popup-anim">
    <div class="modalContainer" v-if="showWindow">
      <div class="modalWindow">
        <div class="modalHeader">
          <b>Изменить информацию о карте</b>
          <img class="c-pointer" src="@/assets/images/Service/close.png" alt="" width="30" height="30"
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
          <button type="button" class="buttonDark">Завершить</button>
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
    },
    showWindow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      name: "",
      description: ""
    }
  },
  watch: {
    mapName: {
      handler(val) {
        this.name = val
      }
    },
    mapDesc: {
      handler(val) {
        this.description = val
      }
    }
  }
}
</script>
<style>
.mapDescription{
  border: 2px solid #dcdcdc;
  border-radius: 10px;
  font-size: 14pt;
  width: 100%;
  margin-block: 10px;
  padding-inline: 10px;
  padding-block: 5px;
  outline: none;
  height: 400px;
}
</style>
