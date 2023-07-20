<template>
  <div class="modal-container">
    <div class="modalWindow">
      <div class="modal-header">
        Загрузка изображения
        <img class="cursor-pointer" src="@/assets/images/Service/close.png" alt="" width="30" height="30"
             @click="this.$emit('closeWindow')">
      </div>
      <hr>
      <div class="modal-body">
        Размер фонового изображения не соответствует размеру холста.
        Выберите один из вариантов установки изображения:
        <div class="loadOption" :class="{selected: loadMode==='stretch'}" @click="loadMode='stretch'">
          <img src="@/assets/images/Service/ImgResize.png" height="70" alt="">
          <p>Установить изображение по размеру холста</p>
        </div>
        <div class="loadOption" :class="{selected: loadMode==='integrate'}" @click="loadMode='integrate'">
          <img src="@/assets/images/Service/CanvasResize.png" height="70" alt="">
          <p>Подстроить размер холста под размер изображения</p>
        </div >
        <div class="loadOption" :class="{selected: loadMode==='default'}" @click="loadMode='default'">
          <img src="@/assets/images/Service/noResize.png" height="70" alt="">
          <p>Не изменять размер изображения и поместить его по центру холста</p>
        </div>
      </div>
      <div class="modalFooter">
        <button type="button" class="button-light" @click="this.$emit('closeWindow')">Отмена</button>
        <button type="button" class="button-dark" @click="this.$emit('setLoadMode', loadMode)">ОК</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  name: "ImageLoadWindow",
  data(){
    return{
      loadMode: "stretch" as string
    }
  },
})
</script>

<style scoped lang="sass">
@use "@/assets/styles/Variables"
.modalWindow
  max-width: 500px

.loadOption
  display: flex
  flex-direction: row
  align-items: center
  margin-block: 10px
  padding: 5px
  border: 1px solid Variables.$light-color
  border-radius: 10px
  cursor: pointer
  & p
    margin: 0 5px
.selected
  background-color: Variables.$medium-color
  color: Variables.$light-color

</style>
