<template>
  <Transition name="show">
    <cursor-panel v-if="tool=='cursor' && optionVisible" @closePanel="optionVisible=false"/>
  </Transition>
  <Transition name="show">
    <brush-panel v-if="tool=='brush' && optionVisible" @closePanel="optionVisible=false"/>
  </Transition>
  <Transition name="show">
    <stamp-panel v-if="((tool=='stamp' && optionVisible) || selectedObjectType=='stamp')" :stamps-prop="this.stamps" @closePanel="optionVisible=false"/>
  </Transition>
  <Transition name="show">
    <shape-panel v-if="((tool=='shape' && optionVisible) || selectedObjectType=='shape')" @closePanel="optionVisible=false"/>
  </Transition>
  <Transition name="show">
    <path-panel v-if="tool=='path' && optionVisible" @closePanel="optionVisible=false"/>
  </Transition>
  <Transition name="show">
    <text-panel v-if="((tool=='text' && optionVisible) || selectedObjectType=='text')" @closePanel="optionVisible=false"/>
  </Transition>
  <div id="tools-panel">
    <section class="tool" :class="{selected:tool=='cursor' }" title="Курсор"
             @click="setSelectedTool('cursor')">
    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
        <path d="  M 26.56 0.00  L 28.06 0.00  C 28.78 0.46 29.50 0.63 30.11 1.24  Q 65.76 36.89 101.41 72.54  C 104.15 75.28 103.33 79.99 99.25 79.99  Q 86.66 80.02 73.24 79.98  A 0.57 0.57 0.0 0 0 72.72 80.77  Q 80.16 97.98 87.70 115.73  C 88.31 117.15 88.70 119.56 87.21 120.22  Q 78.21 124.16 69.19 128.00  L 67.94 128.00  C 67.10 127.52 66.41 127.00 66.00 126.05  Q 57.96 107.31 49.98 88.64  A 0.38 0.37 -32.2 0 0 49.39 88.51  Q 40.06 96.86 30.57 104.90  C 27.30 107.66 23.26 106.86 23.26 102.15  Q 23.24 53.47 23.25 4.79  C 23.25 2.19 24.10 0.71 26.56 0.00  Z"/>
    </svg>
    </section>
    <section class="tool" :class="{selected:tool=='brush' }" title="Кисть"
             @click="setSelectedTool('brush')">
    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
        <g><path d="  M 74.17 84.42  C 55.52 67.60 31.63 44.61 13.58 26.47  Q 9.63 22.50 8.66 20.03  C 5.70 12.56 13.77 5.58 20.96 8.97  Q 22.46 9.68 24.74 11.92  Q 55.64 42.22 84.78 74.25  A 0.42 0.41 -35.8 0 1 84.67 74.89  C 80.02 77.53 78.27 80.28 74.87 84.37  A 0.50 0.49 -48.7 0 1 74.17 84.42  Z"/><path d="  M 108.82 84.93  C 118.96 93.97 123.81 107.08 116.07 119.51  A 0.43 0.43 0.0 0 1 115.43 119.62  C 107.41 113.01 97.76 115.58 89.23 111.13  C 79.91 106.27 76.99 94.56 83.42 86.13  C 89.58 78.03 101.54 78.44 108.82 84.93  Z"/></g>
    </svg>
    </section>
    <section class="tool" :class="{selected:tool=='stamp' }" title="Штамп"
             @click="setSelectedTool('stamp')">
    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
        <g ><path d="  M 62.56 0.00  L 65.56 0.00  Q 80.74 2.31 85.16 15.36  C 87.49 22.28 86.50 32.71 86.46 40.73  A 0.50 0.50 0.0 0 1 85.96 41.23  L 41.94 41.24  A 0.46 0.46 0.0 0 1 41.48 40.78  C 41.59 33.22 40.70 23.57 42.31 17.18  Q 46.01 2.54 62.56 0.00  Z"/><path d="  M 128.00 97.06  L 128.00 109.06  L 0.44 109.19  A 0.37 0.36 -25.1 0 1 0.21 109.11  L 0.00 108.94  L 0.00 96.44  Q 2.02 86.24 12.25 86.24  Q 64.13 86.27 116.00 86.24  Q 126.43 86.23 128.00 97.06  Z"/><path d="  M 120.19 128.00  L 7.44 128.00  L 7.65 117.31  A 0.57 0.57 0.0 0 1 8.22 116.75  L 119.72 116.75  A 0.55 0.54 86.4 0 1 120.26 117.23  Q 120.93 122.67 120.19 128.00  Z"/></g><g><path d="  M 49.26 59.97  C 43.42 59.96 40.48 54.47 41.69 49.22  A 0.62 0.61 6.5 0 1 42.29 48.75  L 85.72 48.75  A 0.58 0.57 -4.7 0 1 86.29 49.23  C 87.71 56.82 83.33 60.03 76.40 60.01  Q 62.81 59.98 49.26 59.97  Z"/><rect x="52.75" y="67.50" width="22.50" height="11.24" rx="0.43"/></g>
    </svg>
    </section>
    <section class="tool" :class="{selected:tool=='shape' }" title="Фигуры"
             @click="setSelectedTool('shape')">
    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
        <ellipse cx="0.00" cy="0.00" transform="translate(28.79,17.13) rotate(11.2)" rx="14.08" ry="13.99"/><path d="  M 27.31 56.82  C 32.27 46.87 38.13 36.95 43.45 27.43  A 1.73 1.73 0.0 0 1 46.47 27.44  L 62.97 57.13  A 1.92 1.92 0.0 0 1 61.29 59.98  L 28.52 59.98  A 1.21 1.18 -21.7 0 1 27.66 59.62  Q 26.51 58.43 27.31 56.82  Z"/><path d="  M 35.62 33.69  A 0.39 0.38 14.5 0 1 35.96 34.26  Q 29.88 45.24 23.76 56.27  Q 23.06 57.52 23.50 59.44  A 0.40 0.39 -6.4 0 1 23.11 59.92  L 4.43 59.98  A 1.66 1.65 89.8 0 1 2.77 58.32  L 2.75 35.41  A 1.66 1.66 0.0 0 1 4.41 33.75  L 35.62 33.69  Z"/>
    </svg>
    </section>
    <section class="tool" :class="{selected:tool=='path' }" title="Пути/кривые"
             @click="setSelectedTool('path')">
    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
        <g ><path d="  M 90.22 64.46  C 80.72 55.50 70.09 41.43 72.46 27.67  C 75.86 7.88 101.22 2.19 114.18 16.58  C 125.46 29.11 118.13 44.87 109.48 55.99  Q 102.86 64.51 98.65 67.47  C 94.88 70.13 92.68 66.78 90.22 64.46  Z  M 96.36 58.45  C 105.43 50.17 117.59 34.36 108.94 22.43  C 100.34 10.57 81.45 15.50 80.08 29.67  C 79.10 39.81 88.16 51.94 95.57 58.46  A 0.59 0.59 0.0 0 0 96.36 58.45  Z"/><path d="  M 65.84 49.35  C 83.20 72.51 59.28 105.61 41.97 119.47  C 40.36 120.76 38.07 119.48 36.58 118.16  C 24.09 107.09 11.07 90.19 8.56 73.88  C 3.35 40.14 45.29 21.95 65.84 49.35  Z  M 40.55 109.78  C 54.47 96.55 73.56 70.87 58.22 52.30  C 44.52 35.72 16.84 45.56 16.10 67.18  C 15.56 82.92 28.98 99.81 39.35 109.78  A 0.87 0.87 0.0 0 0 40.55 109.78  Z"/><path d="  M 92.17 81.70  C 91.34 75.50 99.12 74.62 99.86 79.94  C 100.35 83.43 106.23 89.39 100.19 91.43  C 95.41 93.04 92.60 84.91 92.17 81.70  Z"/><path d="  M 114.18 89.32  C 117.41 89.90 121.45 94.86 122.64 97.97  C 124.27 102.24 118.36 105.39 115.45 100.87  Q 113.47 97.80 110.28 95.86  A 1.67 1.65 -86.9 0 1 109.65 95.15  C 108.19 91.88 110.55 88.65 114.18 89.32  Z"/><path d="  M 113.32 110.27  C 116.20 108.64 119.58 111.04 119.05 114.19  C 118.38 118.14 111.33 119.88 108.06 119.96  C 104.52 120.05 102.76 115.74 105.15 113.36  C 106.85 111.66 110.74 111.72 113.32 110.27  Z"/><rect x="-7.90" y="-3.95" transform="translate(64.00,116.00) rotate(-0.4)" width="15.80" height="7.90" rx="3.75"/><rect x="-7.91" y="-3.96" transform="translate(88.00,116.00) rotate(-0.5)" width="15.82" height="7.92" rx="3.75"/></g><g><circle cx="96.00" cy="32.00" r="5.92"/><path d="  M 51.91 67.99  A 11.91 11.91 0.0 0 1 40.00 79.90  A 11.91 11.91 0.0 0 1 28.09 67.99  A 11.91 11.91 0.0 0 1 40.00 56.08  A 11.91 11.91 0.0 0 1 51.91 67.99  Z  M 43.94 67.99  A 3.94 3.94 0.0 0 0 40.00 64.05  A 3.94 3.94 0.0 0 0 36.06 67.99  A 3.94 3.94 0.0 0 0 40.00 71.93  A 3.94 3.94 0.0 0 0 43.94 67.99  Z"/></g>
    </svg>
    </section>
    <section class="tool" :class="{selected:tool=='text' }" title="Надпись"
             @click="setSelectedTool('text')">
    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
        <g><rect x="109.25" y="1.28" width="3.00" height="125.46" rx="1.48"/><path d="  M 35.03 32.01  A 1.41 1.41 0.0 0 0 33.73 33.44  Q 33.84 41.02 33.66 48.48  C 33.33 61.79 17.53 61.30 17.36 49.30  Q 17.14 33.07 17.29 17.26  A 2.36 2.35 0.4 0 1 19.66 14.93  L 100.87 15.24  A 2.00 2.00 0.0 0 1 102.87 17.19  Q 103.30 33.07 102.74 48.72  Q 102.60 52.72 101.47 54.55  C 98.18 59.91 89.88 59.51 87.44 53.74  C 85.50 49.14 86.47 39.22 86.46 33.73  A 1.96 1.95 89.9 0 0 84.50 31.77  L 69.26 31.78  A 1.00 1.00 0.0 0 0 68.26 32.78  L 68.26 94.27  A 2.19 2.19 0.0 0 0 70.43 96.46  C 76.80 96.49 93.09 94.48 89.95 106.73  C 88.30 113.16 82.51 112.81 76.17 112.92  Q 51.17 113.35 37.49 112.79  C 30.41 112.50 27.07 103.78 31.90 98.89  C 35.27 95.48 44.37 96.52 49.00 96.52  C 51.26 96.53 51.74 95.09 51.74 93.06  Q 51.77 63.31 51.73 33.48  A 1.64 1.63 1.7 0 0 50.19 31.85  Q 42.42 31.42 35.03 32.01  Z"/></g>
    </svg>
    </section>
    <section class="tool" :class="{selected:tool=='zoom' }" title="Масштабирование"
             @click="setSelectedTool('zoom') ">
    <svg class="svg-dark-fill" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128">
        <path d="  M 49.06 0.00  L 53.06 0.00  C 94.97 2.53 116.57 49.70 90.75 82.88  A 0.56 0.55 -48.3 0 0 90.79 83.62  Q 108.61 101.53 126.43 119.30  Q 127.32 120.18 128.00 122.31  L 128.00 123.81  Q 127.00 127.08 123.69 128.00  L 122.19 128.00  Q 120.08 127.22 119.30 126.43  Q 101.56 108.65 83.68 90.84  A 0.58 0.57 48.6 0 0 82.92 90.79  C 49.04 116.70 1.90 94.58 0.00 52.19  L 0.00 49.69  C 1.26 22.17 21.61 1.94 49.06 0.00  Z  M 91.92 50.99  A 40.93 40.93 0.0 0 0 50.99 10.06  A 40.93 40.93 0.0 0 0 10.06 50.99  A 40.93 40.93 0.0 0 0 50.99 91.92  A 40.93 40.93 0.0 0 0 91.92 50.99  Z"/><path d="  M 56.06 56.56  Q 55.95 66.28 56.00 76.00  C 56.03 81.39 45.96 82.95 46.01 73.71  Q 46.06 65.15 45.91 56.61  A 0.53 0.53 0.0 0 0 45.39 56.09  Q 35.64 55.93 26.08 55.99  C 20.52 56.03 19.06 46.02 28.02 46.01  Q 36.73 46.01 45.47 45.97  A 0.51 0.50 -90.0 0 0 45.97 45.46  Q 46.02 35.70 46.00 26.01  C 45.99 21.61 52.77 19.95 55.11 23.86  C 57.10 27.17 56.01 41.01 56.03 45.48  A 0.50 0.49 0.0 0 0 56.53 45.97  Q 65.67 46.00 74.76 46.02  C 79.96 46.03 82.67 52.15 78.55 54.93  C 75.33 57.10 61.04 56.02 56.56 56.06  A 0.50 0.50 0.0 0 0 56.06 56.56  Z"/>
    </svg>
    </section>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import cursorPanel from "@/components/mapCanvas/toolsPanel/cursorPanel.vue";
import brushPanel from "@/components/mapCanvas/toolsPanel/brushPanel.vue";
import stampPanel from "@/components/mapCanvas/toolsPanel/stampPanel.vue";
import shapePanel from "@/components/mapCanvas/toolsPanel/shapePanel.vue";
import pathPanel from "@/components/mapCanvas/toolsPanel/pathPanel.vue";
import textPanel from "@/components/mapCanvas/toolsPanel/textPanel.vue";
import {mapGetters} from "vuex";
import {getOptions} from "@/modules/api/toolsPanelMethods";

export default defineComponent({
  name: "ToolsPanel",
  components: {
    cursorPanel,
    brushPanel,
    stampPanel,
    shapePanel,
    pathPanel,
    textPanel,
  },
  emits: ['toolChange', 'optChange', 'update', 'removeSelect'],
  data() {
    return {
      lastColor: "" as string,
      stamps: {} as object,
      palette: {} as object,
      recentColors: Array(8).fill("#ffffff") as string[],
      optionVisible: true as boolean
    }
  },
  methods: {
      getOptions:getOptions,
      setSelectedTool(value:string):void{
          if(this.$store.getters['getSelectedTool']===value)
              this.optionVisible=!this.optionVisible
          else {
              this.$store.commit('setSelectedTool', value)
              this.optionVisible=true
          }
      }
  },
  computed:{
    ...mapGetters({
        tool: 'getSelectedTool',
        selectedObjectType:'selectionOptions/getSelectedObjectType'
    }),
  },
  async mounted():Promise<void> {
    let userOptions = await this.getOptions()
    this.stamps = userOptions.stamps
    this.palette = userOptions.palette
  },

  watch: {

  /*  selectedObj: {
      handler(val) {
        if (val) {
          this.optionVisible = false
          if (val.data.type == "text") {
            this.textOpt.content = selectedObj.content
            this.textOpt.fontFamily = selectedObj.fontFamily
            this.textOpt.fontSize = selectedObj.fontSize
            this.textOpt.justification = selectedObj.justification
             this.textOpt.opacity = selectedObj.opacity
            this.textOpt.fillColor = selectedObj.data.isFill ? val.fillColor.toCSS(true) : "transparent"
            this.textOpt.strokeColor = selectedObj.data.isBorder ? val.strokeColor.toCSS(true) : "transparent"
            this.textOpt.strokeWidth = selectedObj.data.isBorder ? val.strokeWidth : 0
            this.textOpt.shadowColor = selectedObj.data.isShadow ? val.shadowColor.toCSS(true) : "transparent"
            this.textOpt.shadowBlur = selectedObj.data.isShadow ? val.shadowBlur : 0
            this.textOpt.shOffsetX = selectedObj.data.shOffsetX
            this.textOpt.shOffsetY = selectedObj.data.shOffsetY

            this.textOpt.isBorder = selectedObj.data.isBorder
            this.textOpt.isFill = selectedObj.data.isFill
            this.textOpt.isShadow = selectedObj.data.isShadow
          }
          if (val.data.type == "shape") {
            this.shapeOpt.strokeColor = val.data.isBorder ? val.strokeColor.toCSS(true) : "transparent"
            this.shapeOpt.fillColor = val.data.isFill ? val.fillColor.toCSS(true) : "transparent"
            this.shapeOpt.strokeWidth = val.data.isBorder ? val.strokeWidth : 0
            this.shapeOpt.opacity = val.opacity
            this.shapeOpt.isBorder = val.data.isBorder
            this.shapeOpt.isFill = val.data.isFill
          }
          if (val.data.type == "stamp") {
            this.stampOpt.size = val.size.width
          }
        }
      }
    },
    rotation: {
      handler(val) {
        if (!val) return
        switch (this.selectedObj.data.type) {
          case "text":
            this.textOpt.rotation = Math.round(val)
            break
          case "shape":
            this.shapeOpt.rotation = Math.round(val)
            break
          case "stamp":
            this.stampOpt.rotation = Math.round(val)
            break
        }
      }
    },
    size: {
      handler(val) {
        console.log(val)
        if (!val || this.selectedObj.data.type != "stamp") return
        this.stampOpt.size = val
      }
    },*/
  }
})
</script>
<style lang="sass">
@use "@/assets/styles/Variables"
#tools-panel
  grid-area: ToolsPanel
  position: relative
  background: Variables.$medium-light-color
  display: flex
  flex-direction: column
  align-items: center
  z-index: 3
  user-select: none
  height: 100%
  border-right: 1px solid Variables.$medium-color
.tool
  width: 40px
  height: 40px
  transition: 0.3s all ease-in-out
  border-bottom: 1px solid Variables.$medium-color
  cursor: pointer
  & svg
    width: 100%
    height: 100%
    transition: 0.3s all ease-in-out
    object-fit: contain
    padding: 5px
  &:hover svg
    fill: Variables.$orange-color

.tools-options
  position: absolute
  border: 1px solid Variables.$medium-color
  border-left: none
  background: Variables.$light-color
  border-radius: 0 0 15px 0

  left: 41px
  top: 39px
  white-space: nowrap
  text-align: left
  z-index: 2
  overflow: hidden
  max-height: 500px
  max-width: 300px

.tools-options hr
  margin-block: 10px

.scroll-container
  max-height: 500px
  overflow-y: auto
  padding: 10px
.type-select-button
  width: 35px
  height: 35px
  transition: 0.3s all ease-in-out
  display: flex
  align-items: center
  border: 1px solid Variables.$medium-color
  background-color: Variables.$medium-light-color
  border-radius: 5px
  padding: 5px
  margin-right: 10px
  cursor: pointer
  outline: none


.type-select-button:disabled
  opacity: 0.5

.style-table tr
  height: 30px

.style-table tr>td>div
  width: 200px

.color-picker-cell
  max-width: 30px
  width: 30px
  max-height: 30px
  height: 30px
  border-radius: 5px
  cursor: pointer
  -webkit-box-shadow: 0px 0px 0px 1px rgba(34, 60, 80, 0.2)
  -moz-box-shadow: 0px 0px 0px 1px rgba(34, 60, 80, 0.2)
  box-shadow: 0px 0px 0px 1px rgba(34, 60, 80, 0.2)

.none-color-placeholder
  border-radius: 5px
  height: 30px

.close-options-img
  width: 25px
  height: 25px
  transition: 0.3s all
  fill: Variables.$dark-color
  cursor: pointer
  &:hover
    transform: scale(1.15)
    fill: Variables.$orange-color
</style>
