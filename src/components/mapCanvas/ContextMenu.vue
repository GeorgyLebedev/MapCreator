<template>
  <Transition name="popup-anim">
  <div class="contextMenu" @contextmenu.prevent v-show="showMenu">
    <div class="contextMenuItem" @click="this.$emit('copyItem')">
      <img src="@/assets/images/Service/copy.png" alt="">
      Копировать
    </div>
    <hr class="contextMenuDivider">
    <div class="contextMenuItem" @click="this.$emit('toFront')">
      <img src="@/assets/images/Service/toFront.png" alt="">
      На передний план
    </div>
    <div class="contextMenuItem" @click="this.$emit('toBack')">
      <img src="@/assets/images/Service/toBack.png" alt="" >
      На задний план
    </div>
    <hr class="contextMenuDivider">
    <div class="contextMenuItem" @click="this.$emit('removeItem')">
      <img src="@/assets/images/Service/delete.png" alt="">
      Удалить
    </div>
  </div>
  </Transition>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ContextMenu",
  props:{
    showMenu:{
      type: Boolean,
      default: false
    }
  }
})
</script>
<style>
  .contextMenu{
    user-select: none;
    z-index: 5;
    padding-block: 7px;
    position: fixed;
    background-color: white;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    width: auto;
    height:auto;
  }
  .contextMenuItem{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    padding-block: 5px;
    padding-inline: 10px;
    color: #3d4551;
    cursor: pointer;
  }
  .contextMenuItem:hover{
    background-color: #3d4551;
    color: white;
  }
  .contextMenuItem img{
    margin-right: 5px;
    object-fit: contain;
    height: 80%;
  }
  .contextMenuDivider{
    margin:0!important;
  }
</style>
