<template>
  <div id="textOptions" class="tools-options"
       v-if="true||(selectedObject && selectedObject.data.type=='text')">
    <div class="flex-row justify-between align-center">
      <b> Надпись </b>
    <svg class="close-options-img" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64" @click="$emit('closePanel')">
        <g><path d="  M 17.05 31.58  A 0.46 0.45 46.3 0 0 17.04 32.24  Q 26.02 41.06 34.88 50.04  C 36.05 51.23 36.53 52.34 35.07 53.54  A 1.86 1.86 0.0 0 1 32.58 53.42  Q 22.85 43.77 13.02 33.97  Q 11.05 32.01 13.03 30.04  Q 22.85 20.25 32.67 10.47  Q 34.39 8.75 35.63 10.84  Q 36.35 12.05 35.35 13.11  Q 26.50 22.63 17.05 31.58  Z"/><path d="  M 33.04 31.58  A 0.47 0.46 44.6 0 0 33.05 32.24  Q 42.02 41.07 50.88 50.04  C 52.05 51.23 52.53 52.34 51.07 53.54  A 1.86 1.86 0.0 0 1 48.58 53.42  Q 38.85 43.77 29.02 33.97  Q 27.05 32.01 29.03 30.04  Q 38.74 20.36 48.56 10.81  Q 50.10 9.32 51.51 10.67  A 1.80 1.79 -45.5 0 1 51.53 13.24  L 33.04 31.58  Z"/></g>
    </svg>
    </div>
    <hr>
    <textarea v-model="content"
              :style="{'font-family':fontFamily}"></textarea>
    <hr>
    <div class="invisibleContainer" @click="showFontsList=false" v-if="showFontsList"></div>
    <div class="flex-row align-center justify-between">
      Шрифт
      <button class="button-light button-small" @click="openFontsList">
        <div class="flex-row align-center">
          <svg class="dropdown-flag svg-light-fill" :class="{'opened':showFontsList}" width="800px" height="800px"
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21,21H3L12,3Z"/>
          </svg>
          {{ fontFamily }}
        </div>
      </button>
    </div>
    <Transition name="popup-anim">
      <div class="dropdown-text" v-if="showFontsList">
        <div class="font"
             v-for="font in fontsCollection" :key="font"
             @click="fontFamily=font; showFontsList=false"
             :style="{'font-family':font}">{{ font }}
        </div>
      </div>
    </Transition>
    <hr>
    <table class="style-table">
      <tr>
        <td>
          <div class="flex-row">
            <input type="checkbox" id="textFillChbx" checked
                   v-model="isFill" @change="setFill()">
            <label for="textFillChbx">Цвет текста</label>
          </div>
        </td>
        <td>
          <input type="color" v-model="fillColor" v-if="isFill"
                 @input="this.$store.commit('colorsStore/updateLastColor', fillColor)">
          <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
               v-if="!isFill">
        </td>
      </tr>
    </table>
    <recent-colors :source="'textFill'" @setTextFill="color=>fillColor=color" v-if="isFill"/>
    <colors-palette :color="fillColor" :source="'textFill'" @setTextFill="color=>fillColor=color" v-if="isFill"/>
    <hr>
    <div class="flex-row justify-between align-center" title="Размер шрифта">
      <img src="@/assets/images/Tools/Options/font-size.png" height="20" alt="">
      <input type="range" step="5" min="5" max="500" v-model="fontSize">
      <input type="number" step="1" min="5" max="500" v-model="fontSize">
    </div>
    <hr>
    <div class="flex-row justify-between align-center" title="Непрозрачность текста">
      <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
      <input type="range" step="0.1" min="0" max="1" v-model="opacity">
      <input type="number" step="0.1" min="0" max="1" v-model="opacity">
    </div>
    <hr>
    <div class="flex-row justify-between align-center" title="Поворот текста">
      <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
      <input type="range" step="1" min="-180" max="180" v-model="rotation">
      <input type="number" step="1" min="-180" max="180" v-model="rotation">
    </div>
    <hr>
    <p>Положение текста:</p>
    <div class="flex-row">
      <button class="type-select-button"
              :class="{'selected':justification=='left'}"
              @click="justification='left'"
              title="Слева">
        <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
            <g><rect x="0.24" y="6.01" width="63.52" height="3.98" rx="1.96"/><rect x="0.22" y="22.01" width="45.76" height="3.74" rx="1.84"/><rect x="0.22" y="38.25" width="63.54" height="3.74" rx="1.78"/><rect x="0.24" y="54.01" width="30.50" height="3.98" rx="1.94"/></g>
        </svg>
      </button>
      <button class="type-select-button"
              :class="{'selected':justification=='center'}"
              @click="justification='center'"
              title="По центру">
        <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
            <g><rect x="0.24" y="6.01" width="63.52" height="3.98" rx="1.96"/><rect x="0.23" y="22.01" width="63.52" height="3.74" rx="1.80"/><rect x="0.22" y="38.25" width="63.54" height="3.74" rx="1.78"/><rect x="20.33" y="54.02" width="23.42" height="3.96" rx="1.93"/></g>
        </svg>
      </button>
      <button class="type-select-button"
              :class="{'selected':justification=='right'}"
              @click="justification='right'"
              title="По центру">
        <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
            <g><rect x="0.24" y="6.01" width="63.52" height="3.98" rx="1.96"/><rect x="18.02" y="22.01" width="45.74" height="3.74" rx="1.84"/><rect x="0.22" y="38.25" width="63.54" height="3.74" rx="1.78"/><rect x="33.26" y="54.01" width="30.48" height="3.98" rx="1.94"/></g>
        </svg>
      </button>
    </div>
    <hr>
    <table class="style-table">
      <tr>
        <td>
          <div class="flex-row">
            <input type="checkbox" id="textBorderChbx"
                   v-model="isBorder" @change="setBorder()">
            <label for="textBorderChbx">Обводка</label>
          </div>
        </td>
        <td>
          <input type="color" v-model="strokeColor" v-if="isBorder"
                 @input="this.$store.commit('colorsStore/updateLastColor', strokeColor)">
          <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
               v-if="!isBorder">
        </td>
      </tr>
    </table>
    <Transition name="stretch" mode="out-in">
      <div v-if="isBorder">
        <recent-colors :source="'textStroke'" @setTextStroke="color=>strokeColor=color"/>
        <colors-palette :color="strokeColor" :source="'textStroke'" @setTextStroke="color=>strokeColor=color"/>
        <hr>
        <div class="flex-row justify-between align-center" title="Толщина обводки">
          <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
          <input type="range" step="1" min="1" max="10" v-model="strokeWidth">
          <input type="number" step="1" min="1" max="10" v-model="strokeWidth">
        </div>
      </div>
    </Transition>
    <hr>
    <table class="style-table">
      <tr>
        <td>
          <div class="flex-row ">
            <input type="checkbox" id="textShadowChbx" v-model="isShadow"
                   @change="setShadow()" :disabled="!isFill">
            <label for="textShadowChbx">Тень</label>
          </div>
        </td>
        <td>
          <input type="color" v-model="shadowColor" v-if="isShadow"
                 @input="this.$store.commit('colorsStore/updateLastColor', shadowColor)">
          <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
               v-if="!isShadow">
        </td>
      </tr>
    </table>
    <Transition name="stretch" mode="out-in">
      <div v-if="isShadow">
        <recent-colors :source="'textShadow'" @setTextShadow="color=>shadowColor=color"/>
        <colors-palette :color="shadowColor" :source="'textShadow'" @setTextShadow="color=>shadowColor=color"/>
        <hr>
        <div class="flex-row justify-between align-center" title="Смещение тени по Х">
          <img src="@/assets/images/Tools/Options/shOffsetX.png" alt="" width="20">
          <input type="range" step="1" min="-10" max="10" v-model="shOffsetX">
          <input type="number" step="1" min="-10" max="10" v-model="shOffsetX">
        </div>
        <hr>
        <div class="flex-row justify-between align-center" title="Смещение тени по Y">
          <img src="@/assets/images/Tools/Options/shOffsetY.png" alt="" width="20">
          <input type="range" step="1" min="-10" max="10" v-model="shOffsetY">
          <input type="number" step="1" min="-10" max="10" v-model="shOffsetY">
        </div>
        <hr>
        <div title="Размытие тени" class="flex-row justify-between align-center">
        <svg class="svg-dark-fill font-blurred-img" fill="white" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" ><g id="Dribbble-Light-Preview" transform="translate(-60.000000, -2759.000000)" >            <g id="icons" transform="translate(56.000000, 160.000000)">                <path d="M24,2599 L24,2605 L22,2605 C22,2602.791 20.209,2601 18,2601 L16.586,2601 C15.71,2601 15,2601.71 15,2602.586 L15,2616 C15,2616.552 15.448,2617 16,2617 L18,2617 L18,2619 L10,2619 L10,2617 L12,2617 C12.552,2617 13,2616.552 13,2616 L13,2602.586 C13,2601.71 12.29,2601 11.414,2601 L10,2601 C7.791,2601 6,2602.791 6,2605 L4,2605 L4,2599 L24,2599 Z" id="text_style-[#1212]"/>            </g>        </g>    </g>
        </svg>
          <input type="range" step="1" min="1" max="10" v-model="shadowBlur">
          <input type="number" step="1" min="1" max="10" v-model="shadowBlur">
        </div>
      </div>
    </Transition>
  </div>
</template>
<script>
import ColorsPalette from "@/components/mapCanvas/toolsPanel/palette";
import RecentColors from "@/components/mapCanvas/toolsPanel/recentColors";
export default {
  name: "textPanel",
  components: {
    RecentColors,
  ColorsPalette
  },
  props: {
    selectedObject: Object,
  },
  data() {
    return {
      fontsCollection: ["Cambria", "Roboto", "Neucha", "Comic Sans MS", "Consolas", "Mason Chronicles", "Linux Biolinum", "Aniron"],
      showFontsList:false,
    }
  },
  methods:{
    openFontsList(){
      this.showFontsList=!this.showFontsList
    },
    setShadow() {
      this.shadowColor = this.isShadow ? "#000000" : "transparent"
    },
    setFill() {
      this.fillColor = this.isFill ? "#ffffff" : "transparent"
    },
    setBorder() {
      this.strokeColor = this.isBorder ? "#000000" : "transparent"
    },
  },
  computed:{
    content:{
      get(){
        return this.$store.state.textOptions.content
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {content:value})
      }
    },
    fontFamily:{
      get(){
        return this.$store.state.textOptions.fontFamily
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {fontFamily:value})
      }
    },
    fontSize:{
      get(){
        return this.$store.state.textOptions.fontSize
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {fontSize:value})
      }
    },
    justification:{
      get(){
        return this.$store.state.textOptions.justification
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {justification:value})
      }
    },
    fillColor:{
      get(){
        return this.$store.state.textOptions.fillColor
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {fillColor:value})
      }
    },
    strokeColor:{
      get(){
        return this.$store.state.textOptions.strokeColor
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {strokeColor:value})
      }
    },
    strokeWidth:{
      get(){
        return this.$store.state.textOptions.strokeWidth
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {strokeWidth:value})
      }
    },
    shadowColor:{
      get(){
        return this.$store.state.textOptions.shadowColor
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {shadowColor:value})
      }
    },
    shadowBlur:{
      get(){
        return this.$store.state.textOptions.shadowBlur
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {shadowBlur:value})
      }
    },
    shOffsetX: {
      get(){
        return this.$store.state.textOptions.shadowOffset[0]
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {shadowOffset:[value, this.$store.state.textOptions.shadowOffset[1]]})
      }
    },
    shOffsetY: {
      get(){
        return this.$store.state.textOptions.shadowOffset[1]
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {shadowOffset:[this.$store.state.textOptions.shadowOffset[0],value]})
      }
    },
    opacity: {
      get(){
        return this.$store.state.textOptions.opacity
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {opacity:value})
      }
    },
    rotation: {
      get(){
        return this.$store.state.textOptions.rotation
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {rotation:value})
      }
    },
    isBorder:{
      get(){
        return this.$store.state.textOptions.isBorder
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {isBorder:value})
      }
    },
    isFill: {
      get(){
        return this.$store.state.textOptions.isFill
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {isFill:value})
      }
    },
    isShadow:{
      get(){
        return this.$store.state.textOptions.isShadow
      },
      set(value){
        this.$store.commit('textOptions/updateTextOptions', {isShadow:value})
      }
    },
  }
}
</script>

<style scoped lang="sass">
textarea
  width: 100%
  height: 100px
  font-size: 14pt
  padding: 5px
  border-radius: 5px

.dropdown-text
  position: absolute
  background-color: white
  max-width: 300px
  right: 12px
  z-index: 4
  border: 1px solid #dcdcdc
  border-radius: 10px
  padding-block: 10px

.font
  padding: 5px
  cursor: pointer
  font-size: 12pt

.font:hover
  color: white
  background-color: #3d4551

.font-blurred-img
  width: 20px
  height: 20px
  filter: blur(1px)
</style>
