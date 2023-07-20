<template>
    <div id="brushOptions" class="tools-options">
        <div class="scroll-container">
      <div class="flex-row justify-between align-center">
        <b> Кисть </b>
      <svg class="close-options-img" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64" @click="$emit('closePanel')">
          <g><path d="  M 17.05 31.58  A 0.46 0.45 46.3 0 0 17.04 32.24  Q 26.02 41.06 34.88 50.04  C 36.05 51.23 36.53 52.34 35.07 53.54  A 1.86 1.86 0.0 0 1 32.58 53.42  Q 22.85 43.77 13.02 33.97  Q 11.05 32.01 13.03 30.04  Q 22.85 20.25 32.67 10.47  Q 34.39 8.75 35.63 10.84  Q 36.35 12.05 35.35 13.11  Q 26.50 22.63 17.05 31.58  Z"/><path d="  M 33.04 31.58  A 0.47 0.46 44.6 0 0 33.05 32.24  Q 42.02 41.07 50.88 50.04  C 52.05 51.23 52.53 52.34 51.07 53.54  A 1.86 1.86 0.0 0 1 48.58 53.42  Q 38.85 43.77 29.02 33.97  Q 27.05 32.01 29.03 30.04  Q 38.74 20.36 48.56 10.81  Q 50.10 9.32 51.51 10.67  A 1.80 1.79 -45.5 0 1 51.53 13.24  L 33.04 31.58  Z"/></g>
      </svg>
      </div>
      <hr>
      <table class="style-table">
        <tr>
          <td>
            <div class="flex-row align-center">Цвет кисти:</div>
          </td>
          <div :style="{'background-color': color}" class="color-picker-cell" @click="$refs.brushColor.click()">
            <input type="color" ref="brushColor" hidden v-model="color" @input="this.$store.commit('colorsStore/updateLastColor', color)">
          </div>
        </tr>
      </table>
      <recentColors :source="'brushColor'" @setBrushColor="color=>this.color=color"/>
      <colors-palette :color="color" :source="'brushColor'" @setBrushColor="color=>this.color=color"/>
      <hr>
      <div title="Размер кисти" class="flex-row align-center">
        <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
        <input type="range" step="5" min="1" max="200" v-model="size">
        <input type="number" step="1" min="1" max="200" class="input-number-style" v-model="size">
      </div>
      <hr>
      <div title="Непрозрачность кисти" class="flex-row align-center">
        <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
        <input type="range" step="0.01" min="0" max="1" v-model="opacity">
        <input type="number" step="0.01" min="0" max="1" v-model="opacity" class="input-number-style">
      </div>
        </div>
    </div>
</template>

<script>
import recentColors from "@/components/mapCanvas/toolsPanel/recentColors";
import ColorsPalette from "@/components/mapCanvas/toolsPanel/palette";
export default {
  name: "brushPanel",
  components:{
    ColorsPalette,
    recentColors
  },
  computed:{
    size:{
      get(){
        return this.$store.state.brushOptions.size
      },
      set(value){
        this.$store.commit('brushOptions/updateBrushOptions', {size:value})
      }
    },
    color:{
      get(){
        return this.$store.state.brushOptions.color
      },
      set(value){
        this.$store.commit('brushOptions/updateBrushOptions', {color:value})
      }
    },
    opacity:{
      get(){
        return this.$store.state.brushOptions.opacity
      },
      set(value){
        this.$store.commit('brushOptions/updateBrushOptions', {opacity:value})
      }
    }
  }
}
</script>
