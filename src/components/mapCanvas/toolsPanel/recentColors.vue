<template>
  <details>
    <summary class="cursorPointer"><u>Последние цвета:</u></summary>
    <table class="colorTable">
      <tr>
        <td v-for="(color, index) in recentColors" :key="index">
          <template v-if="color !== 'transparent'">
            <div
                class="colorCell cursorPointer"
                :style="{ backgroundColor: color }"
                @click="setToolColor(color)"
            />
          </template>
          <template v-else>
            <div class="colorCell">
              <img src="@/assets/images/Tools/Options/noColor.png" />
            </div>
          </template>
        </td>
      </tr>
    </table>
  </details>
</template>

<script>
export default {
  name: "recentColors",
  props: {
    source: {
      type: String,
    }
  },
  emits: ['setBrushColor'],
  methods: {
    setToolColor(color) {
      switch (this.source) {
        case "brushColor":
          this.$emit('setBrushColor', color)
          break
        case "shapeFill":
          this.$emit('setShapeFill', color)
          break
        case "shapeStroke":
          this.$emit('setShapeStroke', color)
          break
        case "lineColor":
          this.$emit('setLineColor', color)
          break
        case "textFill":
          this.$emit('setTextFill', color)
          break
        case "textStroke":
          this.$emit('setTextStroke', color)
          break
        case "textShadow":
          this.$emit('setTextShadow', color)
          break
      }
    }
  },
  computed: {
    recentColors() {
      return this.$store.state.colorsStore.recentColors
    }
  }
}
</script>

<style scoped>
details{
  user-select: none;
  padding-block: 5px;
}
summary{
  padding-bottom: 5px;
}
summary:focus{
  outline: none;
}
.colorTable {
  border-collapse: initial;
  border: 1px solid gainsboro;
}


.colorCell {
  max-height: 30px;
  height: 30px;
  width: 30px;
  min-width: 30px;
  border: 1px solid gainsboro;
}

.colorCell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
