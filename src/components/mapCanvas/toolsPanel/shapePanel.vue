<template>
  <div id="shapesOpt" class="toolsOptions">
    <div class="flexRow justifyBetween alignCenter">
      <b> Фигуры </b>
      <img src="@/assets/images/arrow-left.png" @click="$emit('closePanel')" class="cursorPointer" height="20" alt="">
    </div>
    <hr>
    <div v-if="!Object.keys(this.selectedObject).length">
      <p> Вид фигуры:</p>
      <div class="flexRow">
        <button class="typeSelectButton"
                :class="{'selected':shapeType=='rectangle'}"
                @click="shapeType='rectangle'"
                :disabled="isArbitrary"
                title="Прямоугольник">
          <img class="imageFit" src="@/assets/images/Tools/Options/rectangle.png" alt="">
        </button>
        <button class="typeSelectButton"
                :class="{'selected':shapeType=='triangle'}"
                @click="shapeType='triangle'"
                :disabled="isArbitrary"
                title="Треугольник">
          <img class="imageFit" src="@/assets/images/Tools/Options/triangle.png" alt="">
        </button>
        <button class="typeSelectButton"
                :class="{'selected':shapeType=='circle'}"
                @click="shapeType='circle'"
                :disabled="isArbitrary"
                title="Круг">
          <img class="imageFit" src="@/assets/images/Tools/Options/circle.png" alt="">
        </button>
        <button class="typeSelectButton"
                :class="{'selected':shapeType=='polygon'}"
                @click="shapeType='polygon'"
                :disabled="isArbitrary"
                title="Многоугольник">
          <img class="imageFit" src="@/assets/images/Tools/Options/polygon.png" alt="">
        </button>
      </div>
      <div class="arbitraryShape flexRow">
        <input type="checkbox" id="arbitraryShapeChbx"
               v-model="isArbitrary" @change="setArbitraryShape()">
        <label for="arbitraryShapeChbx">Произвольная</label>
      </div>
      <div v-if="shapeType=='polygon'">
        <hr>
        Число сторон: <br>
        <input type="range" step="1" min="5" max="20" v-model="sides">
        <input type="number" step="1" min="5" max="20" v-model="sides">
      </div>
      <hr>
    </div>
    Цвета:
    <table class="styleTable">
      <tr>
        <td>
          <div class="flexRow">
            <input type="checkbox" id="shapeFillChbx" checked
                   v-model="isFill" @change="setFill()">
            <label for="shapeFillChbx">Заливка</label>
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
    <recent-colors :source="'shapeFill'" @setShapeFill="color=>fillColor=color" v-if="isFill"/>
    <colors-palette :color="fillColor" :source="'shapeFill'" @setShapeFill="color=>fillColor=color" v-if="isFill"/>
    <hr>
    <table class="styleTable">
      <tr>
        <td>
          <div class="flexRow">
            <input type="checkbox" id="shapeBorderChbx" checked
                   v-model="isBorder" @change="setBorder()">
            <label for="shapeBorderChbx">Контур</label>
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
    <recent-colors :source="'shapeStroke'" @setShapeStroke="color=>strokeColor=color" v-if="isBorder"/>
    <colors-palette :color="strokeColor" :source="'shapeStroke'" @setShapeStroke="color=>strokeColor=color"
                    v-if="isBorder"/>
    <hr>
    <div class="flexRow alignCenter" title="Толщина контура">
      <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
      <input type="range" step="1" min="1" max="50" v-model="strokeWidth">
      <input type="number" step="1" min="1" max="50"
             v-model="strokeWidth">
    </div>
    <hr>
    <div class="flexRow alignCenter" title="Непрозрачность фигуры">
      <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
      <input type="range" step="0.01" min="0" max="1" v-model="opacity">
      <input type="number" step="0.01" min="0" max="1" v-model="opacity">
    </div>
    <hr>
    <div class="flexRow alignCenter" title="Поворот фигуры">
      <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
      <input type="range" step="1" min="-180" max="180" v-model="rotation">
      <input type="number" step="1" min="-180" max="180" v-model="rotation">
    </div>
  </div>
</template>

<script>
import ColorsPalette from "@/components/mapCanvas/toolsPanel/palette";
import RecentColors from "@/components/mapCanvas/toolsPanel/recentColors";
import {mapGetters} from "vuex";

export default {
  name: "shapePanel",
  components: {
    RecentColors,
    ColorsPalette
  },
  computed: {
    ...mapGetters({
      selectedObject:'selection/getSelectedObject'
    }),
    shapeType: {
      get() {
        return this.$store.state.shapeOptions.shapeType
      },
      set(value) {
        this.$store.commit('shapeOptions/updateShapeOptions', {shapeType: value})
      }
    },
    strokeWidth: {
      get() {
        return this.$store.state.shapeOptions.strokeWidth
      },
      set(value) {
        this.$store.commit('shapeOptions/updateShapeOptions', {strokeWidth: value})
      }
    },
    strokeColor: {
      get() {
        return this.$store.state.shapeOptions.strokeColor
      },
      set(value) {
        this.$store.commit('shapeOptions/updateShapeOptions', {strokeColor: value})
      }
    },
    fillColor: {
      get() {
        return this.$store.state.shapeOptions.fillColor
      },
      set(value) {
        this.$store.commit('shapeOptions/updateShapeOptions', {fillColor: value})
      }
    },
    borderRadius: {
      get() {
        return this.$store.state.shapeOptions.borderRadius
      },
      set(value) {
        this.$store.commit('shapeOptions/updateShapeOptions', {borderRadius: value})
      }
    },
    opacity: {
      get() {
        return this.$store.state.shapeOptions.opacity
      },
      set(value) {
        this.$store.commit('shapeOptions/updateShapeOptions', {opacity: value})
      }
    },
    rotation: {
      get() {
        return this.$store.state.shapeOptions.rotation
      },
      set(value) {
        this.$store.commit('shapeOptions/updateShapeOptions', {rotation: value})
      }
    },
    sides: {
      get() {
        return this.$store.state.shapeOptions.sides
      },
      set(value) {
        this.$store.commit('shapeOptions/updateShapeOptions', {sides: value})
      }
    },
    isArbitrary: {
      get() {
        return this.$store.state.shapeOptions.isArbitrary
      },
      set(value) {
        this.$store.commit('shapeOptions/updateShapeOptions', {isArbitrary: value})
      }
    },
    isFill: {
      get() {
        return this.$store.state.shapeOptions.isFill
      },
      set(value) {
        this.$store.commit('shapeOptions/updateShapeOptions', {isFill: value})
      }
    },
    isBorder: {
      get() {
        return this.$store.state.shapeOptions.isBorder
      },
      set(value) {
        this.$store.commit('shapeOptions/updateShapeOptions', {isBorder: value})
      }
    },
  },
  methods: {
    setArbitraryShape() {
      this.shapeType = this.isArbitrary ? "arbitrary" : "rectangle"
    },
    setFill() {
      this.fillColor = this.isFill ? "#ffffff" : "transparent"
    },
    setBorder() {
      this.strokeColor = this.isBorder ? "#000000" : "transparent"
    },
  }
}
</script>

<style scoped>
.arbitraryShape {
  margin-top: 10px;
}
</style>
