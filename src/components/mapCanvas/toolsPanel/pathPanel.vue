<template>
  <div id="pathOptions" class="toolsOptions">
    <div class="flexRow justifyBetween alignCenter">
      <b> Пути/кривые </b>
      <img src="@/assets/images/arrow-left.png" @click="$emit('closePanel')" class="cursorPointer" height="20" alt="">
    </div>
    <hr>
    <p>Тип линии:</p>
    <div class="flexRow">
      <button class="typeSelectButton"
              :class="{'selected':pathOptions.pathType=='line'}"
              @click="pathOptions.pathType='line'"
              title="Прямая">
        <img class="imageFit" src="@/assets/images/Tools/Options/line.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':pathOptions.pathType=='poly'}"
              @click="pathOptions.pathType='poly'"
              title="Ломаная">
        <img class="imageFit" src="@/assets/images/Tools/Options/polyLine.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':pathOptions.pathType=='curve'}"
              @click="pathOptions.pathType='curve'"
              title="Кривая">
        <img class="imageFit" src="@/assets/images/Tools/Options/curve.png" alt="">
      </button>
    </div>
    <hr>
    <p>Стиль линии:</p>
    <div class="flexRow">
      <button class="typeSelectButton"
              :class="{'selected':pathOptions.style=='default'}"
              @click="pathOptions.style='default'"
              title="Прямая">
        <img class="imageFit" src="@/assets/images/Tools/Options/line.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':pathOptions.style=='dashed'}"
              @click="pathOptions.style='dashed'"
              title="Ломаная">
        <img class="imageFit" src="@/assets/images/Tools/Options/dashed.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':pathOptions.style=='dotted'}"
              @click="pathOptions.style='dotted'"
              title="Кривая">
        <img class="imageFit" src="@/assets/images/Tools/Options/dotted.png" alt="">
      </button>
    </div>
    <Transition name="stretch" mode="out-in">
      <div v-if=" pathOptions.style=='dotted'">
        <hr>
        <div class="flexRow alignCenter" title="Расстояние между точками">
          <img src="@/assets/images/Tools/Options/gapDot.png" alt="" height="20">
          <input type="range" step="1" min="5" max="50" v-model="pathOptions.dotArray[1]">
          <input type="number" step="1" min="5" max="50"
                 v-model="pathOptions.dotArray[1]">
        </div>
      </div>
    </Transition>
    <Transition name="stretch" mode="out-in">
      <div v-if="pathOptions.style=='dashed'">
        <hr>
        <div class="flexRow alignCenter" title="Расстояние между штрихами">
          <img src="@/assets/images/Tools/Options/gapDash.png" alt="" height="20">
          <input type="range" step="1" min="5" max="50" v-model="pathOptions.dashArray[1]">
          <input type="number" step="1" min="5" max="50"
                 v-model="pathOptions.dashArray[1]">
        </div>
        <hr>
        <div class="flexRow alignCenter" title="Длина штриха">
          <img src="@/assets/images/Tools/Options/dash.png" alt="" height="20">
          <input type="range" step="1" min="10" max="50" v-model="pathOptions.dashArray[0]">
          <input type="number" step="1" min="10" max="50"
                 v-model="pathOptions.dashArray[0]">
        </div>
      </div>
    </Transition>
    <hr>
    <table class="styleTable">
      <tr>
        <td>
          <div class="flexRow">
          Цвет линии:
          </div>
        </td>
        <td>
          <input type="color" v-model="pathOptions.color" @input="colorUpdate(pathOptions.color)">
        </td>
      </tr>
    </table>
    <hr>
    <div class="flexRow">
      <input type="checkbox" id="roundCapChbxId" v-model="pathOptions.roundCap" checked>
      <label for="roundCapChbxId">
        Скругления на концах
      </label>
    </div>
    <hr>
    <div class="flexRow alignCenter" title="Толщина линии">
      <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
      <input type="range" step="1" min="1" max="50" v-model="pathOptions.size">
      <input type="number" step="1" min="1" max="50" v-model="pathOptions.size">
    </div>
    <hr>
    <div class="flexRow alignCenter" title="Непрозрачность линии">
      <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
      <input type="range" step="0.01" min="0" max="1" v-model="pathOptions.opacity">
      <input type="number" step="0.01" min="0" max="1" v-model="pathOptions.opacity">
    </div>
  </div>
</template>

<script>
import {pathOptions} from "@/modules/options/pathOptions";

export default {
  name: "pathPanel",
  data() {
    return {
      pathOptions: pathOptions,
    }
  },

}
</script>

<style scoped>

</style>
