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
              :class="{'selected':pathType=='line'}"
              @click="pathType='line'"
              title="Прямая">
        <img class="imageFit" src="@/assets/images/Tools/Options/line.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':pathType=='poly'}"
              @click="pathType='poly'"
              title="Ломаная">
        <img class="imageFit" src="@/assets/images/Tools/Options/polyLine.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':pathType=='curve'}"
              @click="pathType='curve'"
              title="Кривая">
        <img class="imageFit" src="@/assets/images/Tools/Options/curve.png" alt="">
      </button>
    </div>
    <hr>
    <p>Стиль линии:</p>
    <div class="flexRow">
      <button class="typeSelectButton"
              :class="{'selected':style=='default'}"
              @click="style='default'"
              title="Прямая">
        <img class="imageFit" src="@/assets/images/Tools/Options/line.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':style=='dashed'}"
              @click="style='dashed'"
              title="Ломаная">
        <img class="imageFit" src="@/assets/images/Tools/Options/dashed.png" alt="">
      </button>
      <button class="typeSelectButton"
              :class="{'selected':style=='dotted'}"
              @click="style='dotted'"
              title="Кривая">
        <img class="imageFit" src="@/assets/images/Tools/Options/dotted.png" alt="">
      </button>
    </div>
    <Transition name="stretch" mode="out-in">
      <div v-if=" style=='dotted'">
        <hr>
        <div class="flexRow alignCenter" title="Расстояние между точками">
          <img src="@/assets/images/Tools/Options/gapDot.png" alt="" height="20">
          <input type="range" step="1" min="5" max="50" v-model="dotArray[1]">
          <input type="number" step="1" min="5" max="50"
                 v-model="dotArray[1]">
        </div>
      </div>
    </Transition>
    <Transition name="stretch" mode="out-in">
      <div v-if="style=='dashed'">
        <hr>
        <div class="flexRow alignCenter" title="Расстояние между штрихами">
          <img src="@/assets/images/Tools/Options/gapDash.png" alt="" height="20">
          <input type="range" step="1" min="5" max="50" v-model="dashArray[1]">
          <input type="number" step="1" min="5" max="50"
                 v-model="dashArray[1]">
        </div>
        <hr>
        <div class="flexRow alignCenter" title="Длина штриха">
          <img src="@/assets/images/Tools/Options/dash.png" alt="" height="20">
          <input type="range" step="1" min="10" max="50" v-model="dashArray[0]">
          <input type="number" step="1" min="10" max="50"
                 v-model="dashArray[0]">
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
          <input type="color" v-model="color" @input="this.$store.commit('colorsStore/updateLastColor', color)">
        </td>
      </tr>
    </table>
    <recent-colors :source="'lineColor'" @setLineColor="color=>this.color=color"/>
    <colors-palette :color="color" :source="'lineColor'" @setLineColor="color=>this.color=color"/>
    <hr>
    <div class="flexRow">
      <input type="checkbox" id="roundCapChbxId" v-model="roundCap" checked>
      <label for="roundCapChbxId">
        Скругления на концах
      </label>
    </div>
    <hr>
    <div class="flexRow alignCenter" title="Толщина линии">
      <img src="@/assets/images/Tools/Options/thicknss.png" alt="" height="20">
      <input type="range" step="1" min="1" max="50" v-model="size">
      <input type="number" step="1" min="1" max="50" v-model="size">
    </div>
    <hr>
    <div class="flexRow alignCenter" title="Непрозрачность линии">
      <img src="@/assets/images/Tools/Options/opacity.png" alt="" height="20">
      <input type="range" step="0.01" min="0" max="1" v-model="opacity">
      <input type="number" step="0.01" min="0" max="1" v-model="opacity">
    </div>
  </div>
</template>

<script>
import recentColors from "@/components/mapCanvas/toolsPanel/recentColors";
import ColorsPalette from "@/components/mapCanvas/toolsPanel/palette";

export default {
  name: "pathPanel",
  components: {
    ColorsPalette,
    recentColors,
  },
  computed: {
    size: {
      get() {
        return this.$store.state.pathOptions.size
      },
      set(value) {
        this.$store.commit('pathOptions/updatePathOptions', {size: value})
      }
    },
    opacity: {
      get() {
        return this.$store.state.pathOptions.opacity
      },
      set(value) {
        this.$store.commit('pathOptions/updatePathOptions', {opacity: value})
      }
    },
    color: {
      get() {
        return this.$store.state.pathOptions.color
      },
      set(value) {
        this.$store.commit('pathOptions/updatePathOptions', {color: value})
      }
    },
    pathType: {
      get() {
        return this.$store.state.pathOptions.pathType
      },
      set(value) {
        this.$store.commit('pathOptions/updatePathOptions', {pathType: value})
      }
    },
    roundCap: {
      get() {
        return this.$store.state.pathOptions.roundCap
      },
      set(value) {
        this.$store.commit('pathOptions/updatePathOptions', {roundCap: value})
      }
    },
    style: {
      get() {
        return this.$store.state.pathOptions.style
      },
      set(value) {
        this.$store.commit('pathOptions/updatePathOptions', {style: value})
      }
    },
    dashArray: {
      get() {
        return this.$store.state.pathOptions.dashArray
      },
      set(value) {
        this.$store.commit('pathOptions/updatePathOptions', {dashArray: value})
      }
    },
    dotArray: {
      get() {
        return this.$store.state.pathOptions.dotArray
      },
      set(value) {
        this.$store.commit('pathOptions/updatePathOptions', {dotArray: value})
      }
    },
  }

}
</script>

<style scoped>

</style>
