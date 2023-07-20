<template>
  <details>
    <summary class="cursor-pointer"><u>Последние цвета:</u></summary>
    <div class="color-table">
        <div v-for="(color, index) in recentColors" :key="index">
          <template v-if="color !== 'transparent'">
            <div
                class="color-cell cursor-pointer"
                :style="{ backgroundColor: color }"
                @click="setToolColor(color)"
            />
          </template>
          <template v-else>
            <div class="color-cell">
              <img src="@/assets/images/Tools/Options/noColor.png" />
            </div>
          </template>
        </div>
    </div>
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

<style scoped lang="sass">
@use "@/assets/styles/Variables"
details
  user-select: none
  padding-block: 5px

summary
  padding-bottom: 5px

summary:focus
  outline: none

.color-table
  display: flex
  flex-direction: row
  justify-content: space-between
  border: 1px solid Variables.$medium-light-color
  width: 100%
  padding: 3px

.color-cell
  max-height: 30px
  height: 30px
  width: 30px
  min-width: 30px
  border: 1px solid Variables.$medium-light-color

.color-cell img
  width: 100%
  height: 100%
  object-fit: cover
</style>
