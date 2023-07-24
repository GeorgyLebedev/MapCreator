<template>
  <div class="modal-container">
    <div class="modal-window">
      <div class="modal-header">
        Загрузка изображения
	  <svg class="cursor-pointer modal-close-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="this.$store.commit('modalFlags/setShowImgLoadWin', false)">
	      <path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	  </svg>
      </div>
      <div class="modal-body">
        Размер фонового изображения не соответствует размеру холста.
        Выберите один из вариантов установки изображения:
        <div class="load-option" :class="{selected: loadMode==='stretch'}" @click="loadMode='stretch'">
          <img src="@/assets/images/Service/ImgResize.png" height="70" alt="">
          <p>Установить изображение по размеру холста</p>
        </div>
        <div class="load-option" :class="{selected: loadMode==='integrate'}" @click="loadMode='integrate'">
          <img src="@/assets/images/Service/CanvasResize.png" height="70" alt="">
          <p>Подстроить размер холста под размер изображения</p>
        </div >
        <div class="load-option" :class="{selected: loadMode==='default'}" @click="loadMode='default'">
          <img src="@/assets/images/Service/noResize.png" height="70" alt="">
          <p>Не изменять размер изображения и поместить его по центру холста</p>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="button-light button-middle" @click="this.$store.commit('modalFlags/setShowImgLoadWin', false)">Отмена</button>
        <button type="button" class="button-dark button-middle" @click="this.$emit('setLoadMode', loadMode)">ОК</button>
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
.modal-window
  max-width: 500px

.load-option
  display: flex
  flex-direction: row
  align-items: center
  margin-block: 10px
  padding: 5px
  border: 1px solid Variables.$medium-color
  border-radius: 10px
  cursor: pointer
  & p
    margin: 0 5px
.selected
  background-color: Variables.$medium-color
  color: Variables.$light-color

</style>
