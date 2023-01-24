<template>
  <div class="MainContainer" @contextmenu.prevent>
    <TopMenu/>
    <Accordion/>
    <ToolsPanel
        @toolChange="setTool"
        @optChange="setOpt"
        :recent-colors="recentColors"/>
    <BotMenu @scaleChange="updateScale"/>
    <div class="CanvasArea">
      <canvas id="map" width="1560" height="680" :class="{cursorNone: withoutCursor}"></canvas>
    </div>
  </div>
</template>
<script>
import TopMenu from "@/components/TopMenu.vue"
import Accordion from "@/components/Accordion";
import BotMenu from "@/components/BotMenu";
import ToolsPanel from "@/components/ToolsPanel";
import * as paper from "paper" ;
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

export default {
  name: "MapCanvas",
  components: {
    TopMenu,
    Accordion,
    BotMenu,
    ToolsPanel
  },
  data() {
    return {
      scale: 100,
      currentTool: "cursor",
      withoutCursor: false,
      recentColors: Array(8).fill("#ffffff"),
      colorChanged: false,
      activeLayer: null,
      cursorTool: new paper.Tool(),
      brushTool: new paper.Tool(),
      brushOpt: {
        size: 1,
        opacity: 1,
        color: "",
        cursor: null,
      },
      stampTool: new paper.Tool(),
      pathTool: new paper.Tool(),
      pathOpt: {
        size: 1,
        opacity: 1,
        color: "",
        cursor: null,
        pathType: "line",
        cap: "round"
      },
      textTool: new paper.Tool(),
      zoomTool: new paper.Tool(),
    }
  },
  methods: {
    updateScale(data) {
      this.scale = data.newScale
    },
    setTool(tool) {
      this.currentTool = tool
      this.activeLayer.onDoubleClick = undefined
    },
    setOpt(opt) {
      if (this.currentTool == "brush") {
        if (this.brushOpt.color != opt.color)
          this.colorChanged = true
        Object.assign(this.brushOpt, opt)
        this.setBrush(this.brushTool, this.brushOpt)
      }
      if (this.currentTool == "path") {
        if (this.pathOpt.color != opt.color)
          this.colorChanged = true
        Object.assign(this.pathOpt, opt)
        this.setPathTool(this.pathTool, this.pathOpt)
      }
    },
    updateRecentColors(newColor) {
      if (this.recentColors.length < 8)
        this.recentColors.unshift(newColor)
      else {
        this.recentColors = this.recentColors.slice(0, 7)
        this.recentColors.unshift(newColor)
      }
    },
    setBrush(brush, options) {
      let path
      let ref = this
      options.cursor.radius = options.size
      brush.onMouseMove = (event) => {
        options.cursor.position = event.point;
      }
      brush.onMouseDown = function (event) {
        path = new paper.Path();
        if (ref.colorChanged) {
          ref.updateRecentColors(options.color)
          ref.colorChanged = false
        }
        path.insertBelow(options.cursor)
        path.strokeWidth = options.size * 2
        path.strokeCap = "round"
        path.strokeColor = options.color;
        path.opacity = options.opacity
        path.add(event.point);
      }
      brush.onMouseDrag = function (event) {
        path.add(event.point);
        path.smooth();
        options.cursor.position = event.point;
      }
      brush.onMouseUp = function (event) {
        path.add(event.point);
        path.smooth();
      }
    },
    setPathTool(pathTool, options) {
      let path = new paper.Path
      let ref = this
      let initPoint = undefined
      let firstSegment, lastSegment
      let segments=[]
      options.cursor.radius = options.size
      if (options.pathType !== "poly" && options.pathType !== "curve")
        this.activeLayer.onDoubleClick = undefined
      else {
        this.activeLayer.onDoubleClick = (event) => {
          path = new paper.Path.Line(initPoint, event.point)
          initPoint = undefined
        }
      }
      switch (options.pathType) {
        case "line":
          pathTool.onMouseMove = (event) => {
            options.cursor.position = event.point;
            if (path)
              path.remove()
            if (initPoint) {
              path = new paper.Path.Line(initPoint, event.point)
              path.insertBelow(options.cursor)
              path.strokeWidth = options.size * 2
              path.strokeCap = options.cap
              path.strokeColor = options.color;
              path.opacity = options.opacity
            }
          }
          pathTool.onMouseDown = (event) => {
            if (!initPoint)
              initPoint = event.point
            else {
              path = new paper.Path.Line(initPoint, event.point)
              path.insertBelow(options.cursor)
              initPoint = undefined
            }
            if (ref.colorChanged) {
              ref.updateRecentColors(options.color)
              ref.colorChanged = false
            }
          }
          break
        case "poly":
          pathTool.onMouseMove = (event) => {
            options.cursor.position = event.point;
            if (path)
              path.remove()
            if (initPoint) {
              path = new paper.Path.Line(initPoint, event.point)
              path.insertBelow(options.cursor)
              path.strokeWidth = options.size * 2
              path.strokeCap =  options.cap
              path.strokeColor = options.color;
              path.opacity = options.opacity
            }
          }
          pathTool.onMouseDown = (event) => {
            if (!initPoint)
              initPoint = event.point
            else {
              path = new paper.Path.Line(initPoint, event.point)
              path.insertBelow(options.cursor)
              initPoint = event.point
            }
            if (ref.colorChanged) {
              ref.updateRecentColors(options.color)
              ref.colorChanged = false
            }
          }
          break
        case "curve":
          pathTool.onMouseMove = (event) => {
            options.cursor.position = event.point;
            if (path)
              path.remove()
            if (initPoint) {
              lastSegment=new paper.Segment({
                point:event.point,
                handleIn: [10,10]
              })
              path = new paper.Path({
                segments: segments.concat(lastSegment)
              })
              path.insertBelow(options.cursor)
              path.strokeWidth = options.size * 2
              path.strokeCap = options.cap
              path.strokeColor = options.color;
              path.opacity = options.opacity
            }
          }
          pathTool.onMouseDown = (event) => {
            firstSegment=new paper.Segment({
              point:event.point,
              handleIn: [10,10]
            })
            segments.push(firstSegment)
            initPoint=event.point
            if (ref.colorChanged) {
              ref.updateRecentColors(options.color)
              ref.colorChanged = false
            }
          }
          break;
      }
    }
  },
  mounted() {
    let canvas = document.getElementById("map")
    paper.setup(canvas)
    this.activeLayer = paper.project.activeLayer
    //initCursor....
    //------BRUSH------------------------
    this.brushOpt.cursor = new paper.Shape.Circle(new paper.Point(0, 0), 1)
    this.brushOpt.cursor.fillColor = 'transparent'
    this.brushOpt.cursor.strokeColor = "black"
    this.brushOpt.cursor.visible = false
    this.setBrush(this.brushTool, this.brushOpt)
    //-----PATH--------------------------
    this.pathOpt.cursor = new paper.Shape.Circle(new paper.Point(0, 0), 1)
    this.pathOpt.cursor.fillColor = 'transparent'
    this.pathOpt.cursor.strokeColor = "black"
    this.pathOpt.cursor.visible = false
    this.setPathTool(this.pathTool, this.pathOpt)
    ////......
    this.cursorTool.activate()
  },
  watch: {
    currentTool(val) {
      if (val != "brush")
        this.brushOpt.cursor.visible = false
      if (val != "path")
        this.pathOpt.cursor.visible = false
      switch (val) {
        case "cursor":
          this.withoutCursor = false
          this.cursorTool.activate()
          break
        case "brush":
          this.withoutCursor = true
          this.brushOpt.cursor.visible = true
          this.brushTool.activate()
          break
        case "path":
          this.withoutCursor = true
          this.pathOpt.cursor.visible = true
          this.pathTool.activate()
          break
      }
    }
  }
}
</script>
<style>
.MainContainer {
  display: grid;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 40px 1fr 40px;
  gap: 0px 0px;
  grid-auto-flow: row dense;
  justify-items: stretch;
  grid-template-areas:
    "TopMenu TopMenu"
    "ToolsPanel CanvasArea"
    "BotMenu BotMenu";
}

.CanvasArea {
  grid-area: CanvasArea;
  z-index: 1;
  justify-content: center;
  align-items: center;
  border-left: 1px solid gainsboro;
}


#map {
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
}

input[type=color] {
  border: none;
  width: 30px;
  height: 30px;
  background-color: transparent;
  padding: 0;
  margin: 0
}

.cursorNone {
  cursor: none;
}

input[type=color]::-webkit-color-swatch {
  border-radius: 0;
  border: 1px solid gray;
  cursor: pointer
}

*:hover > .hoverinv {
  filter: invert(1);
}

input[type=number] {
  font-size: smaller;
  font-weight: bolder;
  max-width: 50px;
  border: 1px solid #8a8a8a;
  border-radius: 5px;
  padding: 3px 0 2px 5px
}

.tools-options input[type=range] {
  width: 150px;
  margin: 0 10px;
}

input[type=range] {
  width: 175px;
  height: 12px;
  -webkit-appearance: none;
  background: silver;
  outline: none;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 7px;
  padding-left: 1px;
  padding-right: 1px;
  -webkit-box-shadow: 0px 0px 0px 1px rgba(35, 35, 35, 1) inset;
  -moz-box-shadow: 0px 0px 0px 1px rgba(35, 35, 35, 1) inset;
  box-shadow: 0px 0px 0px 1px rgba(35, 35, 35, 1) inset;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: white;
  width: 12px;
  height: 12px;

  border: 1px solid #232323;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: -180px 0 0 173px #232323;
}

input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  background: white;
  width: 12px;
  height: 12px;
  border: 1px solid #232323;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: -180px 0 0 173px #232323;
}
</style>
