<template>
  <div id="textOptions" class="toolsOptions"
       v-if="true||(selectedObject && selectedObject.data.type=='text')">
    <div class="flexRow justifyBetween alignCenter">
      <b> Надпись </b>
      <img src="@/assets/images/arrow-left.png" @click="$emit('closePanel')" class="cursorPointer" height="20" alt="">
    </div>
    <hr>
    <textarea v-model="content"
              :style="{'font-family':fontFamily}"></textarea>
    <hr>
    <div class="invisibleContainer" @click="showFontsList=false" v-if="showFontsList"></div>
    <div class="flexRow alignCenter justifyBetween">
      Шрифт
      <button class="buttonLight" @click="openFontsList">
        <div class="flexRow alignCenter">
          <svg fill="#3d4551" class="dropdownFlag" :class="{'openedFlag':showFontsList}" width="800px" height="800px"
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21,21H3L12,3Z"/>
          </svg>
          {{ fontFamily }}
        </div>
      </button>
    </div>
    <Transition name="popup-anim">
      <div class="dropdownText" v-if="showFontsList">
        <div class="font"
             v-for="font in fontsCollection" :key="font"
             @click="fontFamily=font; showFontsList=false"
             :style="{'font-family':font}">{{ font }}
        </div>
      </div>
    </Transition>
    <hr>
    <table class="styleTable">
      <tr>
        <td>
          <div class="flexRow">
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
    <div class="flexRow justifyBetween alignCenter" title="Размер шрифта">
      <img src="@/assets/images/Tools/Options/font-size.png" height="20" alt="">
      <input type="range" step="5" min="5" max="500" v-model="fontSize">
      <input type="number" step="1" min="5" max="500" v-model="fontSize">
    </div>
    <hr>
    <div class="flexRow justifyBetween alignCenter" title="Непрозрачность текста">
      <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
      <input type="range" step="0.1" min="0" max="1" v-model="opacity">
      <input type="number" step="0.1" min="0" max="1" v-model="opacity">
    </div>
    <hr>
    <div class="flexRow justifyBetween alignCenter" title="Поворот текста">
      <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
      <input type="range" step="1" min="-180" max="180" v-model="rotation">
      <input type="number" step="1" min="-180" max="180" v-model="rotation">
    </div>
    <hr>
    <p>Положение текста:</p>
    <div class="flexRow">
      <button class="typeSelectButton"
              :class="{'selected':justification=='left'}"
              @click="justification='left'"
              title="Слева">
        <img class="imageFit" src="@/assets/images/Tools/Options/textLeft.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':justification=='center'}"
              @click="justification='center'"
              title="По центру">
        <img class="imageFit" src="@/assets/images/Tools/Options/textCenter.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':justification=='right'}"
              @click="justification='right'"
              title="По центру">
        <img class="imageFit" src="@/assets/images/Tools/Options/textRight.png" alt="">
      </button>
    </div>
    <hr>
    <table class="styleTable">
      <tr>
        <td>
          <div class="flexRow">
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
        <div class="flexRow justifyBetween alignCenter" title="Толщина обводки">
          <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
          <input type="range" step="1" min="1" max="10" v-model="strokeWidth">
          <input type="number" step="1" min="1" max="10" v-model="strokeWidth">
        </div>
      </div>
    </Transition>
    <hr>
    <table class="styleTable">
      <tr>
        <td>
          <div class="flexRow ">
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
        <div class="flexRow justifyBetween alignCenter" title="Смещение тени по Х">
          <img src="@/assets/images/Tools/Options/shOffsetX.png" alt="" width="20">
          <input type="range" step="1" min="-10" max="10" v-model="shOffsetX">
          <input type="number" step="1" min="-10" max="10" v-model="shOffsetX">
        </div>
        <hr>
        <div class="flexRow justifyBetween alignCenter" title="Смещение тени по Y">
          <img src="@/assets/images/Tools/Options/shOffsetY.png" alt="" width="20">
          <input type="range" step="1" min="-10" max="10" v-model="shOffsetY">
          <input type="number" step="1" min="-10" max="10" v-model="shOffsetY">
        </div>
        <hr>
        <div title="Размытие тени" class="flexRow justifyBetween alignCenter">
          <img src="@/assets/images/Tools/Options/shBlur.png" alt="" height="20">
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

<style scoped>
textarea {
  width: 100%;
  height: 100px;
  resize: none;
  font-size: 14pt;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  border-color: #3d4551;
}

.dropdownText {
  position: absolute;
  background-color: white;
  max-width: 300px;
  right: 12px;
  z-index: 4;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding-block: 10px
}

.font {
  padding: 5px;
  cursor: pointer;
  font-size: 12pt;
}

.font:hover {
  color: white;
  background-color: #3d4551;
}

</style>
