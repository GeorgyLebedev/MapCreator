<template>
    <div id="brushOptions" class="toolsOptions">
      <div class="flexRow justifyBetween alignCenter">
        <b> Кисть </b>
        <img src="@/assets/images/arrow-left.png" @click="$emit('closePanel')" class="cursorPointer" height="20" alt="">
      </div>
      <hr>
      <table class="styleTable">
        <tr>
          <td>
            <div class="flexRow">Цвет кисти:</div>
          </td>
          <td>
            <input type="color" v-model="color" @input="this.$store.commit('colorsStore/updateLastColor', color)">
          </td>
        </tr>
      </table>
      <recentColors :source="'brushColor'" @setBrushColor="color=>this.color=color"/>
      <colors-palette :color="color" :source="'brushColor'" @setBrushColor="color=>this.color=color"/>
      <hr>
      <div title="Размер кисти">
        <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
        <input type="range" step="5" min="1" max="200" v-model="size">
        <input type="number" step="1" min="1" max="200" class="input-number-style" v-model="size">
      </div>
      <hr>
      <div title="Непрозрачность кисти">
        <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
        <input type="range" step="0.01" min="0" max="1" v-model="opacity">
        <input type="number" step="0.01" min="0" max="1" v-model="opacity" class="input-number-style">
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

<style scoped>
</style>
