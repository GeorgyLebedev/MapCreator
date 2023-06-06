<template>
  <div class="modalContainer">
    <div class="modalWindow">
      <div class="modalHeader">
        Загрузка изображения
        <img class="cursorPointer" src="@/assets/images/Service/close.png" alt="" width="30" height="30"
             @click="this.$emit('closeWindow')">
      </div>
      <hr>
      <div class="modalBody">
        Размер фонового изображения не соответствует размеру холста.
        Выберите один из вариантов установки изображения:
        <div class="loadOption" :class="{selected: loadMode=='stretch'}" @click="loadMode='stretch'">
          <img src="@/assets/images/Service/ImgResize.png" height="70" alt="">
          <p>Установить изображение по размеру холста</p>
        </div>
        <div class="loadOption" :class="{selected: loadMode=='integrate'}" @click="loadMode='integrate'">
          <img src="@/assets/images/Service/CanvasResize.png" height="70" alt="">
          <p>Подстроить размер холста под размер изображения</p>
        </div >
        <div class="loadOption" :class="{selected: loadMode=='default'}" @click="loadMode='default'">
          <img src="@/assets/images/Service/noResize.png" height="70" alt="">
          <p>Не изменять размер изображения и поместить его по центру холста</p>
        </div>
      </div>
      <div class="modalFooter">
        <button type="button" class="buttonLight" @click="this.$emit('closeWindow')">Отмена</button>
        <button type="button" class="buttonDark" @click="this.$emit('setLoadMode', loadMode)">ОК</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageLoadWindow",
  data(){
    return{
      loadMode: "stretch"
    }
  },
}
</script>

<style scoped>
  .modalWindow{
    max-width: 500px;
  }
  .loadOption{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-block: 10px;
    padding:5px;
    border: 1px solid gainsboro;
    border-radius: 10px;
    cursor: pointer;
  }
  .selected{
    background-color: #3d4551;
    color:#dcdcdc
  }
  .loadOption p{
    margin:0 5px;
  }
</style>
