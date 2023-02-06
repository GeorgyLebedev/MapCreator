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
      <canvas id="map" width="1560" height="680" :style="{'cursor': styleCursor}"></canvas>
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
      styleCursor: "default",
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
        roundCap: true,
        style: "default",
        dashArray: [10,5],
        dotArray:[1,5]
      },
      shapeTool: new paper.Tool(),
      shapeOpt:{
        shapeType: "rectangle",
        borderWidth: 1,
        borderColor: "#000000",
        fillColor: "#ffffff",
        borderRadius: 0,
        opacity:1
      },
      textTool: new paper.Tool(),
      textOpt:{
        text: "Текст",
        font: "Cambria",
        fontWeight: "normal",
        fontSize: 10,
        textAlign: "left",
        fillColor: "#ffffff",
        strokeColor: "#000000",
        strokeWidth: 1,
        shadowColor: "#000000",
        shOffsetX: 0,
        shOffsetY: 0,
        opacity: 1,
        rotation: 0,
        isBorder: true,
        isFill: true,
        isShadow: false
      },
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
      if (this.currentTool == "shape") {
        if (this.shapeOpt.fillColor != opt.fillColor)
          this.colorChanged = "fill"
        if (this.shapeOpt.borderColor != opt.borderColor)
          this.colorChanged = "border"
        Object.assign(this.shapeOpt, opt)
        this.setShapeTool(this.shapeTool, this.shapeOpt)
      }
      if (this.currentTool == "path") {
        if (this.pathOpt.color != opt.color)
          this.colorChanged = true
        Object.assign(this.pathOpt, opt)
        this.setPathTool(this.pathTool, this.pathOpt)
      }
      if (this.currentTool == "text") {
        Object.assign(this.textOpt, opt)
        this.setTextTool(this.textTool, this.textOpt)
      }
    },
    updateRecentColors(newColor) {
      if (newColor=="transparent") return
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
    setShapeTool(shapeTool, options){
      let rectangle
      let path
      let exLine
      let triangle, center, radius
      let sides
      let ref=this
      let initPoint=undefined
      if (options.shapeType !== "arbitrary")
        this.activeLayer.onDoubleClick = undefined
      else
      {
        this.activeLayer.onDoubleClick = () => {
          path.closed=true
          path.fillColor=options.fillColor
          initPoint = undefined
        }
      }
        switch (options.shapeType) {
          case "rectangle":
            shapeTool.onMouseDown = (event) =>{
              if (!initPoint)
                initPoint=event.point
              else {
                rectangle.clone()
                rectangle.remove()
                initPoint = undefined
              }
              if (ref.colorChanged=="fill") {
                ref.updateRecentColors(options.fillColor)
                ref.colorChanged = false
              }
              if (ref.colorChanged=="border") {
                ref.updateRecentColors(options.borderColor)
                ref.colorChanged = false
              }
            }
            shapeTool.onMouseMove = (event) =>{
              if(rectangle)
                rectangle.remove()
              if(initPoint){
                rectangle=new paper.Path.Rectangle(initPoint, event.point)
                rectangle.strokeColor=options.borderColor
                rectangle.fillColor=options.fillColor
                rectangle.strokeWidth=options.borderWidth
                rectangle.opacity=options.opacity
              }
            }
            break
          case "triangle":
          case "polygon":
            if(options.shapeType=="triangle")
            sides=3
              else
                sides=options.sides
            shapeTool.onMouseDown = (event) =>{
              if (!initPoint)
                initPoint=event.point
              else {
                center=new paper.Point(event.point)
                center.x=(event.point.x+initPoint.x)/2
                center.y=(event.point.y+initPoint.y)/2
                radius=Math.sqrt(Math.pow((initPoint.x-center.x),2)+Math.pow((initPoint.y-center.y),2))
                triangle.clone()
                triangle.remove()
                initPoint = undefined
              }
              if (ref.colorChanged=="fill") {
                ref.updateRecentColors(options.fillColor)
                ref.colorChanged = false
              }
              if (ref.colorChanged=="border") {
                ref.updateRecentColors(options.borderColor)
                ref.colorChanged = false
              }
            }
            shapeTool.onMouseMove = (event) =>{
              if(triangle)
                triangle.remove()
              if(initPoint){
                center=new paper.Point(event.point)
                center.x=(event.point.x+initPoint.x)/2
                center.y=(event.point.y+initPoint.y)/2
                radius=Math.sqrt(Math.pow((initPoint.x-center.x),2)+Math.pow((initPoint.y-center.y),2))
                triangle = new paper.Path.RegularPolygon(center, sides, radius)
                triangle.strokeColor=options.borderColor
                triangle.fillColor=options.fillColor
                triangle.strokeWidth=options.borderWidth
                triangle.opacity=options.opacity
              }
            }
            break
          case "circle":
            shapeTool.onMouseDown = (event) =>{
              if (!initPoint)
                initPoint=event.point
              else {
                path.clone()
                path.remove()
                initPoint = undefined
              }
              if (ref.colorChanged=="fill") {
                ref.updateRecentColors(options.fillColor)
                ref.colorChanged = false
              }
              if (ref.colorChanged=="border") {
                ref.updateRecentColors(options.borderColor)
                ref.colorChanged = false
              }
            }
            shapeTool.onMouseMove = (event) =>{
              if(path)
                path.remove()
              if(initPoint){
                rectangle=new paper.Rectangle(initPoint, event.point)
                path = new paper.Path.Ellipse(rectangle)
                path.strokeColor=options.borderColor
                path.fillColor=options.fillColor
                path.strokeWidth=options.borderWidth
                path.opacity=options.opacity
              }
            }
            break
          case "arbitrary":
            shapeTool.onMouseMove = (event) => {
              if (exLine)
                exLine.remove()
              if (initPoint) {
                exLine = new paper.Path.Line({
                  from: initPoint,
                  to: event.point,
                  strokeWidth: options.borderWidth,
                  strokeColor: options.borderColor,
                  opacity: options.opacity,
                  strokeCap:"round"
                })
              }
            }
            shapeTool.onMouseDown = (event) => {
              if (!initPoint) {
                path=new paper.Path()
                path.strokeWidth=options.borderWidth
                path.strokeColor=options.borderColor
                path.opacity=options.opacity
                path.strokeCap="round"
                initPoint = event.point
                path.add(initPoint)
              }
              else {
                initPoint = event.point
                path.add(initPoint)
              }
              if (ref.colorChanged=="fill") {
                ref.updateRecentColors(options.fillColor)
                ref.colorChanged = false
              }
              if (ref.colorChanged=="border") {
                ref.updateRecentColors(options.borderColor)
                ref.colorChanged = false
              }
            }
              break
        }
    },
    setPathTool(pathTool, options) {
      let path = new paper.Path
      let exLine
      let ref = this
      let initPoint = undefined
      let vector
      let firstSegment, lastSegment
      let hIn
      let segments=[]
      options.cursor.radius = options.size
      if (options.pathType !== "poly" && options.pathType !== "curve")
        this.activeLayer.onDoubleClick = undefined
      else {
        this.activeLayer.onDoubleClick = (event) => {
          path.add(event.point)
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
              path = new paper.Path.Line({
                from: initPoint,
                to: event.point,
                strokeWidth: options.size,
                strokeCap: options.roundCap ? "round":"square",
                strokeColor: options.color,
                opacity: options.opacity
              })
              if(options.style=="dashed")
                path.dashArray=options.dashArray.map((x)=>(x*options.size))
              else if (options.style=="dotted")
                path.dashArray=options.dotArray.map((x)=>(x*options.size))
              else path.dashArray=null
              path.insertBelow(options.cursor)
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
            if (exLine)
              exLine.remove()
            if (initPoint) {
              exLine = new paper.Path.Line({
                from: initPoint,
                to: event.point,
                strokeWidth: options.size,
                strokeCap: options.roundCap ? "round":"square",
                strokeColor: options.color,
                opacity: options.opacity
              })
              if(options.style=="dashed")
                path.dashArray=options.dashArray.map((x)=>(x*options.size))
              else if (options.style=="dotted")
                path.dashArray=options.dotArray.map((x)=>(x*options.size))
              else path.dashArray=null
              path.insertBelow(options.cursor)
            }
          }
          pathTool.onMouseDown = (event) => {
            if (!initPoint) {
              initPoint = event.point
              path = new paper.Path({
                strokeWidth: options.size,
                strokeCap: options.roundCap ? "round":"square",
                strokeColor: options.color,
                opacity: options.opacity
              })
              path.insertBelow(options.cursor)
              path.add(initPoint)
            }
            else {
              initPoint = event.point
              path.add(initPoint)
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
            if(initPoint) {
              if (segments.length > 1) {
                 vector = new paper.Point({
                  angle: event.point.getAngle(firstSegment.point),
                  length: event.point.getDistance(firstSegment.point)
                });
                hIn = null
                segments[segments.length-1].handleOut=vector
              }
              else hIn = null
            }
              lastSegment=new paper.Segment(
                event.point,
                hIn,
                null
              )
              lastSegment.selected=true
              segments[segments.length-1].selected=true
              path = new paper.Path({
                segments: segments.concat(lastSegment)
              })

              path.insertBelow(options.cursor)
              path.strokeWidth = options.size
              path.strokeCap = options.roundCap ? "round":"square"
              path.strokeColor = options.color;
              path.opacity = options.opacity
          }
          pathTool.onMouseDown = (event) => {
            //console.log(paper.view.center)
            if(!initPoint) {
              segments = []
            }
            firstSegment = new paper.Segment(
                event.point,
                null,
                null
            )
            segments.push(firstSegment)
            initPoint=event.point
            if (ref.colorChanged) {
              ref.updateRecentColors(options.color)
              ref.colorChanged = false
            }
          }
          break;
      }
    },
    setTextTool(textTool,options){
      let text
      textTool.onMouseMove= (event)=>{
          if(text)
            text.remove()
          text=new paper.PointText({
            point: event.point,
            content: options.text,
            fillColor: options.isFill ? options.fillColor : undefined,
            fontFamily: options.font,
            fontWeight: options.fontWeight,
            fontSize: options.fontSize,
            opacity: options.opacity,
            strokeColor: options.isBorder ? options.strokeColor : undefined,
            strokeWidth: options.isBorder ? options.strokeWidth : 0,
            shadowColor: options.isShadow ? options.shadowColor : undefined,
            shadowBlur: options.isShadow ? options.shadowBlur : 0,
            shadowOffset: options.isShadow ? new paper.Point(Number(options.shOffsetX),Number(options.shOffsetY)) : undefined
          })
        console.log(options.shOffsetX)
        console.log(options.shOffsetY)
      }
      textTool.onMouseDown= ()=>{
          text.clone()
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
    //-----SHAPE-------------------------
    this.setShapeTool(this.shapeTool,this.shapeOpt)
    //-----PATH--------------------------
    this.pathOpt.cursor = new paper.Shape.Circle(new paper.Point(0, 0), 1)
    this.pathOpt.cursor.fillColor = 'transparent'
    this.pathOpt.cursor.strokeColor = "black"
    this.pathOpt.cursor.visible = false
    this.setPathTool(this.pathTool, this.pathOpt)
    //-----TEXT--------------------------
    this.setTextTool(this.textTool, this.textOpt)
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
          this.styleCursor = "default"
          this.cursorTool.activate()
          break
        case "brush":
          this.styleCursor = "none"
          this.brushOpt.cursor.visible = true
          this.brushTool.activate()
          break
        case "shape":
          this.styleCursor = "crosshair"
          this.shapeTool.activate()
          break
        case "path":
          this.styleCursor = "none"
          this.pathOpt.cursor.visible = true
          this.pathTool.activate()
          break
        case "text":
          this.styleCursor="none"
          this.textTool.activate()
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
