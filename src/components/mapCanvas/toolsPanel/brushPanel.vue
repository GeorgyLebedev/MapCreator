<template>
    <div id="brushOptions" class="toolsOptions">
      <div class="flexRow justifyBetween alignCenter">
        <b> Кисть </b>
        <img src="@/assets/images/arrow-left.png" @click="$emit('closePanel')" class="closeOpt cursorPointer" height="20" alt="">
      </div>
      <hr>
      <table class="styleTable">
        <tr>
          <td>
            <div class="flexRow">Цвет кисти:</div>
          </td>
          <td>
            <input type="color" v-model="brushOptions.color" @input="colorUpdate(brushOptions.color)">
          </td>
        </tr>
      </table>
      <hr>
      <div title="Размер кисти">
        <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
        <input type="range" step="5" min="1" max="200" v-model="brushOptions.size">
        <input type="number" step="1" min="1" max="200" class="input-number-style" v-model="brushOptions.size">
      </div>
      <hr>
      <div title="Непрозрачность кисти">
        <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
        <input type="range" step="0.01" min="0" max="1" v-model="brushOptions.opacity">
        <input type="number" step="0.01" min="0" max="1" v-model="brushOptions.opacity" class="input-number-style">
      </div>
    </div>
</template>

<script>
import {brushOptions} from "@/modules/options/brushOptions";
export default {
  name: "brushPanel",
  data(){
    return {
      brushOptions: brushOptions,
      optionVisible: true
    }
  },
  methods:{

  }
}
</script>

<style scoped>
</style>
