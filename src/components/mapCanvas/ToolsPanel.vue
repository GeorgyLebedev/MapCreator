<template>
  <Error
      :error="this.error"
      @clearError="this.error=''"/>
  <Transition name="show">
    <cursor-panel v-if="tool=='cursor' && optionVisible" @closePanel="optionVisible=false"/>
  </Transition>
  <Transition name="show">
    <brush-panel v-if="tool=='brush' && optionVisible" @closePanel="optionVisible=false"/>
  </Transition>
  <Transition name="show">
    <stamp-panel v-if="tool=='stamp' && optionVisible" :stamps-prop="this.stamps" @closePanel="optionVisible=false"/>
  </Transition>
  <Transition name="show">
    <shape-panel v-if="tool=='shape' && optionVisible" @closePanel="optionVisible=false"/>
  </Transition>
  <Transition name="show">
    <path-panel v-if="tool=='path' && optionVisible" @closePanel="optionVisible=false"/>
  </Transition>
  <Transition name="show">
    <text-panel v-if="tool=='text' && optionVisible" @closePanel="optionVisible=false"/>
  </Transition>
  <div id="toolsPanel">
    <section class="tool" :class="{selected:tool=='cursor' }" title="Курсор"
             @click="tool='cursor'; optionVisible=!optionVisible">
      <img src="@/assets/images/Tools/cursor.png" alt="...">
    </section>
    <section class="tool" :class="{selected:tool=='brush' }" title="Кисть"
             @click="tool='brush'; optionVisible=!optionVisible">
      <img src="@/assets/images/Tools/brush.png" alt="...">
    </section>
    <section class="tool" :class="{selected:tool=='stamp' }" title="Штамп"
             @click="tool='stamp'; optionVisible=!optionVisible">
      <img src="@/assets/images/Tools/stamp.png" alt="...">
    </section>
    <section class="tool" :class="{selected:tool=='shape' }" title="Фигуры"
             @click="tool='shape'; optionVisible=!optionVisible">
      <img src="@/assets/images/Tools/shapes.png" alt="...">
    </section>
    <section class="tool" :class="{selected:tool=='path' }" title="Пути/кривые"
             @click="tool='path'; optionVisible=!optionVisible">
      <img src="@/assets/images/Tools/path.png" alt="...">
    </section>
    <section class="tool" :class="{selected:tool=='text' }" title="Надпись"
             @click="tool='text'; optionVisible=!optionVisible">
      <img src="@/assets/images/Tools/text.png" alt="...">
    </section>
    <section class="tool" :class="{selected:tool=='zoom' }" title="Масштабирование"
             @click="tool='zoom'; optionVisible=!optionVisible">
      <img src="@/assets/images/Tools/zoom.png" alt="...">
    </section>
  </div>
</template>
<script>
import Error from "@/components/Error";
import AxiosRequest from "@/modules/services/axiosRequest";
import {flags} from "@/modules/logic/flags";
import cursorPanel from "@/components/mapCanvas/toolsPanel/cursorPanel";
import brushPanel from "@/components/mapCanvas/toolsPanel/brushPanel";
import stampPanel from "@/components/mapCanvas/toolsPanel/stampPanel";
import shapePanel from "@/components/mapCanvas/toolsPanel/shapePanel";
import pathPanel from "@/components/mapCanvas/toolsPanel/pathPanel";
import textPanel from "@/components/mapCanvas/toolsPanel/textPanel";

export default {
  name: "ToolsPanel",
  components: {
    Error,
    cursorPanel,
    brushPanel,
    stampPanel,
    shapePanel,
    pathPanel,
    textPanel,
  },
  props: {
    selectedObj: {
      type: Object
    },
    rotation: {
      type: Number
    },
    size: {
      type: Number
    }
  },
  emits: ['toolChange', 'optChange', 'update', 'removeSelect'],
  data() {
    return {
      error: "",
      modalFlags: flags,
      tool: "cursor",
      lastColor: "",
      stamps: {},
      palette: {},
      recentColors: Array(8).fill("#ffffff"),
      optionVisible: true
    }
  },
  methods: {
    async getOptions() {
      try {
        let request = new AxiosRequest('options/', 'get')
        let response = await request.sendRequest()
        if (response && response.options) return response.options
      } catch (e) {
        this.error = e
      }
    },

  },
  async mounted() {
    let userOptions = await this.getOptions()
    this.stamps = userOptions.stamps
    this.palette = userOptions.palette
  },

  watch: {
    tool(val) {
      this.optionVisible = true
      this.$emit('toolChange', val)
      switch (val) {
        case "cursor":
          this.$emit('optChange', this.cursorOpt)
          break
        case "brush":
          this.$emit('optChange', this.brushOpt)
          break;
        case "stamp":
          this.$emit('optChange', this.stampOpt)
          break
        case "shape":
          this.$emit('optChange', this.shapeOpt)
          break
        case "path":
          this.$emit('optChange', this.pathOpt)
          break
        case "text":
          this.$emit('optChange', this.textOpt)
          break
        case "zoom":
          this.$emit('optChange')
          break
        default:
          return
      }
    },
    selectedObj: {
      handler(val) {
        if (val) {
          this.optionVisible = false
          if (val.data.type == "text") {
            this.textOpt.content = val.content
            this.textOpt.fontFamily = val.fontFamily
            this.textOpt.fontSize = val.fontSize
            this.textOpt.justification = val.justification
            this.textOpt.fillColor = val.data.isFill ? val.fillColor.toCSS(true) : "transparent"
            this.textOpt.strokeColor = val.data.isBorder ? val.strokeColor.toCSS(true) : "transparent"
            this.textOpt.strokeWidth = val.data.isBorder ? val.strokeWidth : 0
            this.textOpt.shadowColor = val.data.isShadow ? val.shadowColor.toCSS(true) : "transparent"
            this.textOpt.shadowBlur = val.data.isShadow ? val.shadowBlur : 0
            this.textOpt.shOffsetX = val.data.shOffsetX
            this.textOpt.shOffsetY = val.data.shOffsetY
            this.textOpt.opacity = val.opacity
            this.textOpt.isBorder = val.data.isBorder
            this.textOpt.isFill = val.data.isFill
            this.textOpt.isShadow = val.data.isShadow
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
    },
    cursorOpt: {
      handler() {
        this.$emit('optChange', this.cursorOpt)
      }, deep: true
    },
    brushOpt: {
      handler() {
        this.$emit('optChange', this.brushOpt)
      }, deep: true
    },
    stampOpt: {
      handler() {
        if (this.selectedObj) {
          Object.assign(this.selectedObj, this.stampOpt)
          this.$emit("update", this.selectedObj, this.stampOpt)
        }
        this.$emit('optChange', this.stampOpt)
      }, deep: true
    },
    shapeOpt: {
      handler() {
        if (this.selectedObj) {
          //Object.assign(this.selectedObj, this.shapeOpt)
          this.$emit("update", this.selectedObj, this.shapeOpt)
        }
        this.$emit('optChange', this.shapeOpt)
      }, deep: true
    },
    pathOpt: {
      handler() {
        this.$emit('optChange', this.pathOpt)
      }, deep: true
    },
    textOpt: {
      handler() {
        if (this.selectedObj) {
          Object.assign(this.selectedObj, this.textOpt)
          this.$emit("update", this.selectedObj, this.textOpt)
        }
        this.$emit('optChange', this.textOpt)
      }, deep: true
    },
  }
}
</script>
<style>
#toolsPanel {
  grid-area: ToolsPanel;
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  user-select: none;
  height: 100%;
}

.tool {
  width: 40px;
  height: 40px;
  border-bottom: 1px solid #dcdcdc;
  cursor: pointer;
}

.tool img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5px;
}

.toolsOptions {
  position: absolute;
  border: 1px solid gainsboro;
  border-left: none;
  background: white;
  border-radius: 0 5px 5px 0;
  padding: 10px;
  left: 41px;
  top: 39px;
  white-space: nowrap;
  text-align: left;
  z-index: 2;
  overflow-y: auto;
  max-height: 500px;
  max-width: 300px;
}

.toolsOptions hr {
  margin-block: 10px;
}

.typeSelectButton {
  width: 35px;
  height: 35px;
  border: 1px solid #728391;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
  cursor: pointer;
  outline: none;
}

.typeSelectButton.selected {
  background-color: #3d4551;
}

.typeSelectButton.selected img {
  filter: invert(100%);
}

.typeSelectButton:disabled {
  opacity: 0.5;
}
.styleTable tr {
  height: 40px;
}
.styleTable tr>td>div{
  width: 200px;
}
.colorPlaceholder {
  border: 1px solid gray;
  margin-left: 2px;
  margin-top:3px;
}

.show-enter-active,
.show-leave-active {
  transition: all 0.3s ease;
}

.show-enter-from,
.show-leave-to {
  opacity: 0;
  transform: translateX(-400px) scaleX(0);
}

.stretch-enter-from,
.stretch-leave-to {
  transform: scaleY(0);
  opacity: 0;
}

.stretch-enter-active,
.stretch-leave-active {
  transition: all 0.3s ease;
}
</style>
