<template>
  <div id="shapesOpt" class="tools-options">
      <div class="scroll-container">
    <div class="flex-row justify-between align-center">
      <b> Фигуры </b>
    <svg class="close-options-img" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64" @click="$emit('closePanel')">
        <g><path d="  M 17.05 31.58  A 0.46 0.45 46.3 0 0 17.04 32.24  Q 26.02 41.06 34.88 50.04  C 36.05 51.23 36.53 52.34 35.07 53.54  A 1.86 1.86 0.0 0 1 32.58 53.42  Q 22.85 43.77 13.02 33.97  Q 11.05 32.01 13.03 30.04  Q 22.85 20.25 32.67 10.47  Q 34.39 8.75 35.63 10.84  Q 36.35 12.05 35.35 13.11  Q 26.50 22.63 17.05 31.58  Z"/><path d="  M 33.04 31.58  A 0.47 0.46 44.6 0 0 33.05 32.24  Q 42.02 41.07 50.88 50.04  C 52.05 51.23 52.53 52.34 51.07 53.54  A 1.86 1.86 0.0 0 1 48.58 53.42  Q 38.85 43.77 29.02 33.97  Q 27.05 32.01 29.03 30.04  Q 38.74 20.36 48.56 10.81  Q 50.10 9.32 51.51 10.67  A 1.80 1.79 -45.5 0 1 51.53 13.24  L 33.04 31.58  Z"/></g>
    </svg>
    </div>
    <hr>
    <div v-if="!Object.keys(this.selectedObject).length">
      <p> Вид фигуры:</p>
      <div class="flex-row">
        <button class="type-select-button"
                :class="{'selected':shapeType=='rectangle'}"
                @click="shapeType='rectangle'"
                :disabled="isArbitrary"
                title="Прямоугольник">
          <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 54 44">
            <path d="  M 53.74 37.76  A 5.49 5.49 0.0 0 1 48.25 43.25  L 5.75 43.25  A 5.49 5.49 0.0 0 1 0.26 37.76  L 0.26 6.24  A 5.49 5.49 0.0 0 1 5.75 0.75  L 48.25 0.75  A 5.49 5.49 0.0 0 1 53.74 6.24  L 53.74 37.76  Z  M 48.27 6.33  A 0.33 0.33 0.0 0 0 47.94 6.00  L 6.08 6.00  A 0.33 0.33 0.0 0 0 5.75 6.33  L 5.75 37.67  A 0.33 0.33 0.0 0 0 6.08 38.00  L 47.94 38.00  A 0.33 0.33 0.0 0 0 48.27 37.67  L 48.27 6.33  Z"/>
          </svg>
        </button>
        <button class="type-select-button"
                :class="{'selected':shapeType=='triangle'}"
                @click="shapeType='triangle'"
                :disabled="isArbitrary"
                title="Треугольник">
          <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
           <path  d="  M 27.10 4.84  C 29.56 0.15 33.60 -1.71 36.59 4.05  Q 49.28 28.52 61.93 53.01  C 64.28 57.55 64.55 63.27 57.90 63.26  Q 32.30 63.21 6.73 63.29  C 0.12 63.31 -0.75 58.59 1.81 53.60  Q 14.33 29.15 27.10 4.84  Z  M 5.55 57.14  A 0.42 0.42 0.0 0 0 5.93 57.75  L 58.05 57.75  A 0.42 0.42 0.0 0 0 58.43 57.14  L 32.36 6.80  A 0.42 0.42 0.0 0 0 31.62 6.80  L 5.55 57.14  Z"/>
          </svg>
        </button>
        <button class="type-select-button"
                :class="{'selected':shapeType=='circle'}"
                @click="shapeType='circle'"
                :disabled="isArbitrary"
                title="Круг">
          <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
            <path d="  M 62.74 31.99  A 30.74 30.74 0.0 0 1 32.00 62.73  A 30.74 30.74 0.0 0 1 1.26 31.99  A 30.74 30.74 0.0 0 1 32.00 1.25  A 30.74 30.74 0.0 0 1 62.74 31.99  Z  M 55.65 31.99  A 23.64 23.64 0.0 0 0 32.01 8.35  A 23.64 23.64 0.0 0 0 8.37 31.99  A 23.64 23.64 0.0 0 0 32.01 55.63  A 23.64 23.64 0.0 0 0 55.65 31.99  Z"/>
          </svg>
        </button>
        <button class="type-select-button"
                :class="{'selected':shapeType=='polygon'}"
                @click="shapeType='polygon'"
                :disabled="isArbitrary"
                title="Многоугольник">
          <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 60 52">
           <path  d="  M 0.96 25.55  C 5.58 17.37 10.31 9.27 15.07 1.17  A 0.85 0.83 14.7 0 1 15.80 0.75  L 44.20 0.75  A 0.90 0.90 0.0 0 1 44.98 1.20  L 59.03 25.48  A 1.02 1.02 0.0 0 1 59.03 26.52  L 44.97 50.80  A 0.90 0.90 0.0 0 1 44.19 51.25  L 15.83 51.25  A 0.92 0.90 -14.7 0 1 15.04 50.80  L 0.96 26.50  A 0.97 0.95 -45.5 0 1 0.96 25.55  Z  M 17.82 6.42  C 14.28 12.73 10.88 19.15 7.59 25.62  A 0.95 0.94 -46.0 0 0 7.60 26.49  L 17.76 45.53  A 0.87 0.86 -13.5 0 0 18.53 46.00  L 41.50 46.00  A 0.88 0.87 -75.6 0 0 42.27 45.54  L 52.43 26.41  A 0.91 0.89 -45.6 0 0 52.43 25.54  L 42.22 6.46  A 0.88 0.85 -13.5 0 0 41.45 6.00  L 18.54 6.00  A 0.83 0.83 0.0 0 0 17.82 6.42  Z"/>
          </svg>
	      </button>
      </div>
      <div class="arbitrary-shape flex-row">
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
    <table class="style-table">
      <tr>
        <td>
          <div class="flex-row">
            <input type="checkbox" id="shapeFillChbx" checked
                   v-model="isFill" @change="setFill()">
            <label for="shapeFillChbx">Заливка</label>
          </div>
        </td>
	  <div :style="{'background-color': isFill?fillColor:'unset'}" class="color-picker-cell" @click="$refs.fillColor.click()">
	      <input v-if="isFill" type="color" ref="fillColor" v-model="fillColor" @input="this.$store.commit('colorsStore/updateLastColor', fillColor)">
				<img src="@/assets/images/Tools/Options/noColor.png" class="none-color-placeholder" alt=""
						 v-if="!isFill">
	  </div>
      </tr>
    </table>
    <recent-colors :source="'shapeFill'" @setShapeFill="color=>fillColor=color" v-if="isFill"/>
    <colors-palette :color="fillColor" :source="'shapeFill'" @setShapeFill="color=>fillColor=color" v-if="isFill"/>
    <hr>
    <table class="style-table">
      <tr>
        <td>
          <div class="flex-row">
            <input type="checkbox" id="shapeBorderChbx" checked
                   v-model="isBorder" @change="setBorder()">
            <label for="shapeBorderChbx">Контур</label>
          </div>
        </td>
	  <div :style="{'background-color': isBorder?strokeColor:'unset'}" class="color-picker-cell" @click="$refs.strokeColor.click()">
	      <input v-if="isBorder" type="color" ref="strokeColor" v-model="strokeColor" @input="this.$store.commit('colorsStore/updateLastColor', strokeColor)">
	      <img src="@/assets/images/Tools/Options/noColor.png" class="none-color-placeholder" alt=""
		   v-if="!isBorder">
	  </div>
      </tr>
    </table>
    <recent-colors :source="'shapeStroke'" @setShapeStroke="color=>strokeColor=color" v-if="isBorder"/>
    <colors-palette :color="strokeColor" :source="'shapeStroke'" @setShapeStroke="color=>strokeColor=color"
                    v-if="isBorder"/>
    <hr>
    <div class="flex-row align-center" title="Толщина контура">
      <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
      <input type="range" step="1" min="1" max="50" v-model="strokeWidth">
      <input type="number" step="1" min="1" max="50"
             v-model="strokeWidth">
    </div>
    <hr>
    <div class="flex-row align-center" title="Непрозрачность фигуры">
      <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
      <input type="range" step="0.01" min="0" max="1" v-model="opacity">
      <input type="number" step="0.01" min="0" max="1" v-model="opacity">
    </div>
    <hr>
    <div class="flex-row align-center" title="Поворот фигуры">
      <img src="@/assets/images/Tools/Options/rotate.png" alt="" height="20">
      <input type="range" step="1" min="-180" max="180" v-model="rotation">
      <input type="number" step="1" min="-180" max="180" v-model="rotation">
    </div>
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

<style scoped lang="sass">
.arbitrary-shape
  margin-top: 10px
</style>
