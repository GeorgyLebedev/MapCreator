<template>
    <div id="shapesOpt" class="toolsOptions"
         v-if="true || (selectedObject && selectedObject.data.type=='shape')">
      <div class="flexRow justifyBetween alignCenter">
        <b> Фигуры </b>
        <img src="@/assets/images/arrow-left.png" @click="$emit('closePanel')" class="cursorPointer" height="20" alt="">
      </div>
      <hr>
      <div v-if="!(selectedObject && selectedObject.data.type=='shape')">
        <p> Вид фигуры:</p>
        <div class="flexRow">
          <button class="typeSelectButton"
                  :class="{'selected':shapeOptions.shapeType=='rectangle'}"
                  @click="shapeOptions.shapeType='rectangle'"
                  :disabled="shapeOptions.isArbitrary"
                  title="Прямоугольник">
            <img class="imageFit" src="@/assets/images/Tools/Options/rectangle.png" alt="">
          </button>
          <button class="typeSelectButton"
                  :class="{'selected':shapeOptions.shapeType=='triangle'}"
                  @click="shapeOptions.shapeType='triangle'"
                  :disabled="shapeOptions.isArbitrary"
                  title="Треугольник">
            <img class="imageFit" src="@/assets/images/Tools/Options/triangle.png" alt="">
          </button>
          <button class="typeSelectButton"
                  :class="{'selected':shapeOptions.shapeType=='circle'}"
                  @click="shapeOptions.shapeType='circle'"
                  :disabled="shapeOptions.isArbitrary"
                  title="Круг">
            <img class="imageFit" src="@/assets/images/Tools/Options/circle.png" alt="">
          </button>
          <button class="typeSelectButton"
                  :class="{'selected':shapeOptions.shapeType=='polygon'}"
                  @click="shapeOptions.shapeType='polygon'"
                  :disabled="shapeOptions.isArbitrary"
                  title="Многоугольник">
            <img class="imageFit" src="@/assets/images/Tools/Options/polygon.png" alt="">
          </button>
        </div>
        <div class="arbitraryShape flexRow">
          <input type="checkbox" id="arbitraryShapeChbx"
                 v-model="shapeOptions.isArbitrary" @change="setArbitraryShape(shapeOptions.isArbitrary)">
          <label for="arbitraryShapeChbx">Произвольная</label>
        </div>
        <div v-if="shapeOptions.shapeType=='polygon'">
          <hr>
          Число сторон: <br>
          <input type="range" step="1" min="5" max="20" v-model="shapeOptions.sides">
          <input type="number" step="1" min="5" max="20" v-model="shapeOptions.sides">
        </div>
        <hr>
      </div>
      Цвета:
      <table class="styleTable">
        <tr>
          <td>
            <div class="flexRow">
            <input type="checkbox" id="shapeFillChbx" checked
                     v-model="shapeOptions.isFill" @change="setFill(shapeOptions)">
            <label for="shapeFillChbx">Заливка</label>
            </div>
          </td>
          <td>
            <input type="color" v-model="shapeOptions.fillColor" v-if="shapeOptions.isFill"
                   @input="colorUpdate(shapeOptions.fillColor)">
            <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
                 v-if="!shapeOptions.isFill">
          </td>
        </tr>
        <tr>
          <td>
            <div class="flexRow">
            <input type="checkbox" id="shapeBorderChbx" checked
                   v-model="shapeOptions.isBorder" @change="setBorder(shapeOptions)">
            <label for="shapeBorderChbx">Контур</label>
            </div>
          </td>
          <td>
            <input type="color" v-model="shapeOptions.strokeColor" v-if="shapeOptions.isBorder"
                   @input="colorUpdate(shapeOptions.strokeColor)">
            <img src="@/assets/images/Tools/Options/noColor.png" class="colorPlaceholder" alt="" height="30"
                 v-if="!shapeOptions.isBorder">
          </td>
        </tr>
      </table>
      <hr>
      <div class="flexRow alignCenter" title="Толщина контура">
        <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
        <input type="range" step="1" min="1" max="50" v-model="shapeOptions.strokeWidth">
        <input type="number" step="1" min="1" max="50"
               v-model="shapeOptions.strokeWidth">
      </div>
      <hr>
      <div class="flexRow alignCenter" title="Непрозрачность фигуры">
        <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
        <input type="range" step="0.01" min="0" max="1" v-model="shapeOptions.opacity">
        <input type="number" step="0.01" min="0" max="1" v-model="shapeOptions.opacity">
      </div>
      <hr>
      <div class="flexRow alignCenter" title="Поворот фигуры">
        <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
        <input type="range" step="1" min="-180" max="180" v-model="shapeOptions.rotation">
        <input type="number" step="1" min="-180" max="180" v-model="shapeOptions.rotation">
      </div>
    </div>
</template>

<script>
import {shapeOptions} from "@/modules/options/shapeOptions";
export default {
  name: "shapePanel",
  props:{
    selectedObject:Object,
  },
  data(){
    return {
      shapeOptions: shapeOptions,
    }
  },
  methods:{
    setArbitraryShape(isArbitrary) {
      this.shapeOptions.shapeType = isArbitrary ? "arbitrary" : "rectangle"
    },
    setFill(opt) {
      opt.fillColor = opt.isFill ? "#ffffff" : "transparent"
      if (opt.isShadow && !opt.isFill) opt.isShadow = false
    },
    setBorder(opt) {
      opt.strokeColor = opt.isBorder ? "#000000" : "transparent"
    },
  }
}
</script>

<style scoped>
.arbitraryShape{
  margin-top: 10px;
}
</style>
