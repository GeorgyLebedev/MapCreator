<template>
  <div id="textOptions" class="toolsOptions"
       v-if="true||(selectedObject && selectedObject.data.type=='text')">
    <div class="flexRow justifyBetween alignCenter">
      <b> Надпись </b>
      <img src="@/assets/images/arrow-left.png" @click="$emit('closePanel')" class="cursorPointer" height="20" alt=""
           v-on:click="closePanel">
    </div>
    <hr>
    <textarea v-model="textOptions.content"
              :style="{'font-family':textOptions.fontFamily}"></textarea>
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
          {{ textOptions.fontFamily }}
        </div>
      </button>
    </div>
    <Transition name="popup-anim">
      <div class="dropdownText" v-if="showFontsList">
        <div class="font"
             v-for="font in fontsCollection" :key="font"
             @click="textOptions.fontFamily=font; showFontsList=false"
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
                   v-model="textOptions.isFill" @change="setFill(textOptions)">
            <label for="textFillChbx">Цвет текста</label>
          </div>
        </td>
        <td>
          <input type="color" v-model="textOptions.fillColor" v-if="textOptions.isFill"
                 @input="colorUpdate(textOptions.fillColor)">
          <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
               v-if="!textOptions.isFill">
        </td>
      </tr>
    </table>
    <hr>
    <div class="flexRow justifyBetween alignCenter" title="Размер шрифта">
      <img src="@/assets/images/Tools/Options/font-size.png" height="20" alt="">
      <input type="range" step="5" min="5" max="500" v-model="textOptions.fontSize">
      <input type="number" step="1" min="5" max="500" v-model="textOptions.fontSize">
    </div>
    <hr>
    <div class="flexRow justifyBetween alignCenter" title="Непрозрачность текста">
      <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
      <input type="range" step="0.1" min="0" max="1" v-model="textOptions.opacity">
      <input type="number" step="0.1" min="0" max="1" v-model="textOptions.opacity">
    </div>
    <hr>
    <div class="flexRow justifyBetween alignCenter" title="Поворот текста">
      <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
      <input type="range" step="1" min="-180" max="180" v-model="textOptions.rotation">
      <input type="number" step="1" min="-180" max="180" v-model="textOptions.rotation">
    </div>
    <hr>
    <p>Положение текста:</p>
    <div class="flexRow">
      <button class="typeSelectButton"
              :class="{'selected':textOptions.justification=='left'}"
              @click="textOptions.justification='left'"
              title="Слева">
        <img class="imageFit" src="@/assets/images/Tools/Options/textLeft.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':textOptions.justification=='center'}"
              @click="textOptions.justification='center'"
              title="По центру">
        <img class="imageFit" src="@/assets/images/Tools/Options/textCenter.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':textOptions.justification=='right'}"
              @click="textOptions.justification='right'"
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
                   v-model="textOptions.isBorder" @change="setBorder(textOptions)">
            <label for="textBorderChbx">Обводка</label>
          </div>
        </td>
        <td>
          <input type="color" v-model="textOptions.strokeColor" v-if="textOptions.isBorder"
                 @input="colorUpdate(textOptions.strokeColor)">
          <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
               v-if="!textOptions.isBorder">
        </td>
      </tr>
    </table>
    <Transition name="stretch" mode="out-in">
      <div v-if="textOptions.isBorder">
        <hr>
        <div class="flexRow justifyBetween alignCenter" title="Толщина обводки">
          <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
          <input type="range" step="1" min="1" max="10" v-model="textOptions.strokeWidth">
          <input type="number" step="1" min="1" max="10" v-model="textOptions.strokeWidth">
        </div>
      </div>
    </Transition>
    <hr>
    <table class="styleTable">
      <tr>
        <td>
          <div class="flexRow ">
            <input type="checkbox" id="textShadowChbx" v-model="textOptions.isShadow"
                   @change="setShadow(textOptions)" :disabled="!textOptions.isFill">
            <label for="textShadowChbx">Тень</label>
          </div>
        </td>
        <td>
          <input type="color" v-model="textOptions.shadowColor" v-if="textOptions.isShadow"
                 @input="colorUpdate(textOptions.shadowColor)">
          <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
               v-if="!textOptions.isShadow">
        </td>
      </tr>
    </table>
    <Transition name="stretch" mode="out-in">
      <div v-if="textOptions.isShadow">
        <hr>
        <div class="flexRow justifyBetween alignCenter" title="Смещение тени по Х">
          <img src="@/assets/images/Tools/Options/shOffsetX.png" alt="" width="20">
          <input type="range" step="1" min="-10" max="10" v-model="textOptions.shOffsetX">
          <input type="number" step="1" min="-10" max="10" v-model="textOptions.shOffsetX">
        </div>
        <hr>
        <div class="flexRow justifyBetween alignCenter" title="Смещение тени по Y">
          <img src="@/assets/images/Tools/Options/shOffsetY.png" alt="" width="20">
          <input type="range" step="1" min="-10" max="10" v-model="textOptions.shOffsetY">
          <input type="number" step="1" min="-10" max="10" v-model="textOptions.shOffsetY">
        </div>
        <hr>
        <div title="Размытие тени" class="flexRow justifyBetween alignCenter">
          <img src="@/assets/images/Tools/Options/shBlur.png" alt="" height="20">
          <input type="range" step="1" min="1" max="10" v-model="textOptions.shadowBlur">
          <input type="number" step="1" min="1" max="10" v-model="textOptions.shadowBlur">
        </div>
      </div>
    </Transition>
  </div>
</template>
<script>
import {textOptions} from "@/modules/options/textOptions";

export default {
  name: "textPanel",
  props: {
    selectedObject: Object,
  },
  data() {
    return {
      fontsCollection: ["Cambria", "Roboto", "Neucha", "Comic Sans MS", "Consolas", "Mason Chronicles", "Linux Biolinum", "Aniron"],
      textOptions: textOptions,
      showFontsList:false,
    }
  },
  methods:{
    openFontsList(){
      this.showFontsList=!this.showFontsList
    }
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
