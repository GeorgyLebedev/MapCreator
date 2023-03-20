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
      <canvas id="map" width="1560" height="680" :style="{cursor: this.styleCursor }" @mouseout="toolSwitch('off')"
              @mouseover="toolSwitch('on')"></canvas>
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
      currentTool: {
        name: "cursor",
        toolRef: null
      },
      currentItem: null,
      OBJECT_STORAGE: [],
      styleCursor: "default",
      recentColors: Array(8).fill("#ffffff"),
      colorChanged: false,
      activeLayer: null,
      cursorTool: new paper.Tool(),
      brushTool: new paper.Tool(),
      cursorOpt:{
        selectedObj: null,
        selectionGroup: null
      },
      brushOpt: {
        size: 1,
        opacity: 1,
        color: "",
        cursor: null,
      },
      stampTool: new paper.Tool(),
      stampOpt:{
        size: 30,
        opacity: 1,
        rotation: 0,
        revert: "none",
        currentSet: "firstSet",
        currentStamp: "stampEx.png",
        currentStampPath: undefined,
        stampSetArray: []
      },
      pathTool: new paper.Tool(),
      pathOpt: {
        size: 1,
        opacity: 1,
        color: "",
        cursor: null,
        pathType: "line",
        roundCap: true,
        style: "default",
        dashArray: [10, 5],
        dotArray: [1, 5],
      },
      shapeTool: new paper.Tool(),
      shapeOpt: {
        shapeType: "rectangle",
        borderWidth: 1,
        borderColor: "#000000",
        fillColor: "#ffffff",
        borderRadius: 0,
        opacity: 1
      },
      textTool: new paper.Tool(),
      textOpt: {
        text: "Текст",
        font: "Cambria",
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
      nullTool: new paper.Tool()
    }
  },
  methods: {
    updateScale(data) {
      this.scale = data.newScale
    },
    getBoundGroup(group,item){
      let rotateStart, rotateEnd, angle
      let boundRect= new paper.Path.Rectangle({
        rectangle: item.strokeBounds,
        strokeColor: '#42aaff',
        strokeWidth: 1,
        name: "rect"
      })
      let boundCircle= new paper.Path.Circle({
        center: boundRect.position,
        radius: Math.sqrt((item.strokeBounds.width*item.strokeBounds.width+item.strokeBounds.height*item.strokeBounds.height))/2,
        strokeColor: "#000000",
        fillColor: "#000000",
        strokeWidth: 0.001,
        opacity:0.000001,
        name: "circle"
      })
      let corners=['topLeft', 'topRight', 'bottomRight', 'bottomLeft']
      let twoLast=[]
      const baseCoef=boundRect.bounds['bottomRight'].getDistance(boundRect.bounds['topLeft'])
      group.removeChildren()
      corners.forEach((corner,index) =>{
        let boundSq=new paper.Path.Rectangle({
          width:10,
          height:10,
          position: boundRect.bounds[corner],
          fillColor: "#42aaff",
          name: (index+1)+"corner"
        })
        boundSq.onMouseLeave=()=>{
          this.styleCursor="default"
        }
        if(corner=='topLeft' || corner=='bottomRight'){
          boundSq.onMouseEnter=()=>{
            this.styleCursor='nwse-resize'
          }}
        else{
          boundSq.onMouseEnter=()=>{
            this.styleCursor='nesw-resize'
          }}
        group.addChild(boundSq)
      })
      let sqArray=[group.children['1corner'],group.children['2corner'],group.children['3corner'],group.children['4corner']]
      sqArray.forEach((square, index) =>{
        square.onMouseDrag=(event)=>{
          square.position=event.point
          let oppositeSq=(sqArray[index+2]) ? sqArray[index+2].position : sqArray[index+2-4].position
          corners.forEach((corner,i) =>{
            sqArray[i].position= boundRect.bounds[corner]
          })
          let limit=(event.point.x+event.point.y)-(oppositeSq.x+oppositeSq.y)
          if(!(((index==0 || index==3)&& limit<0) || ((index==1 || index==2)&& limit>0)))
            return
          let scaleFactor=(oppositeSq.getDistance(event.point))/(baseCoef)
          if(twoLast.length<2) {
            twoLast.push(scaleFactor)
            item.scale(1/twoLast[0],oppositeSq)
            item.scale(scaleFactor,oppositeSq)
          }
          else {
            item.scale(1/twoLast[0],oppositeSq)
            item.scale(twoLast[1],oppositeSq)
            twoLast[0]=twoLast[1]
            twoLast[1]=scaleFactor
          }
          group.removeChildren()
          group=this.getBoundGroup(group,item)
        }
        square.onMouseUp=()=>{
          twoLast=[]
        }
      })
      boundCircle.onMouseLeave=()=>{
        this.styleCursor="default"
      }
      boundCircle.onMouseEnter=()=>{
        this.styleCursor='url(' +require('../assets/images/Service/rotate.png')+'), auto'
      }
      boundCircle.onMouseDown=(event)=>{
        rotateStart=new paper.Point({
          x:event.point.x - boundCircle.position.x,
          y:event.point.y - boundCircle.position.y
        })
      }
      boundCircle.onMouseDrag=(event)=>{
        if(angle) {
          item.rotate(-angle)
          item.position=boundRect.position
        }
        rotateEnd=new paper.Point({
          x:event.point.x - boundCircle.position.x,
          y:event.point.y - boundCircle.position.y
        })
        angle=rotateStart.getDirectedAngle(rotateEnd)
        item.rotate(angle)
        item.position=boundRect.position
        group.removeChildren()
        group=this.getBoundGroup(group,item)
      }
      item.onMouseDrag=(event)=>{
        item.position.x += event.delta.x
        item.position.y += event.delta.y
        group.position.x += event.delta.x
        group.position.y += event.delta.y
      }
      group.addChild(boundRect)
      group.addChild(boundCircle)
      group.insertBelow(item)
      return group
    },
    setSelected(item){
      let boundGroup=this.getBoundGroup(new paper.Group(),item)
      return boundGroup
    },
    removeSelect(){
      this.cursorOpt.selectionGroup.removeChildren()
      this.cursorOpt.selectionGroup.remove()
      this.cursorOpt.selectionGroup=undefined
      this.cursorOpt.selectedObj.onMouseDrag=undefined
      this.cursorOpt.selectedObj=undefined
    },
    toolSwitch(mode) {
      if (mode == "on" && this.currentTool.toolRef) {
        this.currentTool.toolRef.activate()
      } else
        this.nullTool.activate()
    },
    setTool(tool) {
      this.currentTool.name = tool
      this.activeLayer.onDoubleClick = undefined
    },
    setOpt(opt) {
      if (this.currentTool.name == "brush") {
        if (this.brushOpt.color != opt.color)
          this.colorChanged = true
        Object.assign(this.brushOpt, opt)
        this.setBrush(this.brushTool, this.brushOpt)
      }
      if (this.currentTool.name == "shape") {
        if (this.shapeOpt.fillColor != opt.fillColor)
          this.colorChanged = "fill"
        if (this.shapeOpt.borderColor != opt.borderColor)
          this.colorChanged = "border"
        Object.assign(this.shapeOpt, opt)
        this.setShapeTool(this.shapeTool, this.shapeOpt)
      }
      if (this.currentTool.name == "path") {
        if (this.pathOpt.color != opt.color)
          this.colorChanged = true
        Object.assign(this.pathOpt, opt)
        this.setPathTool(this.pathTool, this.pathOpt)
      }
      if (this.currentTool.name == "text") {
        Object.assign(this.textOpt, opt)
        this.setTextTool(this.textTool, this.textOpt)
      }
      if (this.currentTool.name == "stamp") {
        Object.assign(this.stampOpt, opt)
        this.setStampTool(this.stampTool, this.stampOpt)
      }
    },
    updateRecentColors(newColor) {
      if (newColor == "transparent") return
      if (this.recentColors.length < 8)
        this.recentColors.unshift(newColor)
      else {
        this.recentColors = this.recentColors.slice(0, 7)
        this.recentColors.unshift(newColor)
      }
    },
    setCursor(cursor, options){
      cursor.onMouseDown=(event)=>{
       let obj=event.item
        if(obj && options.selectedObj && obj.id==options.selectionGroup.id) return
        if(options.selectedObj && obj!=options.selectedObj) {
          this.removeSelect()
        }
        if(!obj || this.OBJECT_STORAGE.indexOf(obj) == -1) return
        if(!options.selectedObj) {
          options.selectedObj = obj
          options.selectionGroup=this.setSelected(obj)
        }
      }
      cursor.onKeyDown=(event)=>{
        if(event.key=='delete' && options.selectedObj) {
          options.selectedObj.remove()
          this.removeSelect()
        }
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
    setStampTool(stampTool,options){
      stampTool.onMouseMove = (event) => {
        if (this.currentItem)
          this.currentItem.remove()
        this.currentItem = new paper.Raster({
          source: require('../assets/images/Stamps/firstSet/stampEx.png'),
          position: event.point,
          size: options.size,
          opacity: options.opacity,
        })
      }
      stampTool.onMouseDown = () => {
        this.OBJECT_STORAGE.push(this.currentItem.clone())
      }
    },
    setShapeTool(shapeTool, options) {
      let exLine
      let center, radius
      let sides
      let ref = this
      let initPoint = undefined
      if (options.shapeType !== "arbitrary")
        this.activeLayer.onDoubleClick = undefined
      else {
        this.activeLayer.onDoubleClick = () => {
          this.currentItem.closed = true
          this.currentItem.fillColor = options.fillColor
          this.OBJECT_STORAGE.push(this.currentItem.clone())
          this.currentItem.remove()
          initPoint = undefined
        }
      }
      switch (options.shapeType) {
        case "rectangle":
          shapeTool.onMouseDown = (event) => {
            if (!initPoint)
              initPoint = event.point
            else {
              this.OBJECT_STORAGE.push(this.currentItem.clone())
              /*this.currentItem.clone()*/
              initPoint = undefined
            }
            if (ref.colorChanged == "fill") {
              ref.updateRecentColors(options.fillColor)
              ref.colorChanged = false
            }
            if (ref.colorChanged == "border") {
              ref.updateRecentColors(options.borderColor)
              ref.colorChanged = false
            }
          }
          shapeTool.onMouseMove = (event) => {
            if (this.currentItem)
              this.currentItem.remove()
            if (initPoint) {
              this.currentItem = new paper.Path.Rectangle({
                from: initPoint,
                to: event.point,
                strokeColor: options.borderColor,
                fillColor: options.fillColor,
                strokeWidth: options.borderWidth == 1 ? options.borderWidth * 2 : options.borderWidth,
                opacity: options.opacity
              })
            }
          }
          break
        case "triangle":
        case "polygon":
          if (options.shapeType == "triangle")
            sides = 3
          else
            sides = options.sides
          shapeTool.onMouseDown = (event) => {
            if (!initPoint)
              initPoint = event.point
            else {
              center = new paper.Point(event.point)
              center.x = (event.point.x + initPoint.x) / 2
              center.y = (event.point.y + initPoint.y) / 2
              radius = Math.sqrt(Math.pow((initPoint.x - center.x), 2) + Math.pow((initPoint.y - center.y), 2))
              this.OBJECT_STORAGE.push(this.currentItem.clone())
              initPoint = undefined
            }
            if (ref.colorChanged == "fill") {
              ref.updateRecentColors(options.fillColor)
              ref.colorChanged = false
            }
            if (ref.colorChanged == "border") {
              ref.updateRecentColors(options.borderColor)
              ref.colorChanged = false
            }
          }
          shapeTool.onMouseMove = (event) => {
            if (this.currentItem)
              this.currentItem.remove()
            if (initPoint) {
              center = new paper.Point(event.point)
              center.x = (event.point.x + initPoint.x) / 2
              center.y = (event.point.y + initPoint.y) / 2
              radius = Math.sqrt(Math.pow((initPoint.x - center.x), 2) + Math.pow((initPoint.y - center.y), 2))
              this.currentItem = new paper.Path.RegularPolygon({
                center: center,
                sides: sides,
                radius: radius,
                strokeColor: options.borderColor,
                fillColor: options.fillColor,
                strokeWidth: options.borderWidth,
                opacity: options.opacity
              })
            }
          }
          break
        case "circle":
          shapeTool.onMouseDown = (event) => {
            if (!initPoint)
              initPoint = event.point
            else {
              this.OBJECT_STORAGE.push(this.currentItem.clone())
              initPoint = undefined
            }
            if (ref.colorChanged == "fill") {
              ref.updateRecentColors(options.fillColor)
              ref.colorChanged = false
            }
            if (ref.colorChanged == "border") {
              ref.updateRecentColors(options.borderColor)
              ref.colorChanged = false
            }
          }
          shapeTool.onMouseMove = (event) => {
            if (this.currentItem)
              this.currentItem.remove()
            if (initPoint) {
              this.currentItem = new paper.Path.Ellipse({
                point: initPoint,
                size: new paper.Point(event.point.x - initPoint.x, event.point.y - initPoint.y),
                strokeColor: options.borderColor,
                fillColor: options.fillColor,
                strokeWidth: options.borderWidth,
                opacity: options.opacity
              })
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
                strokeCap: "round"
              })
            }
          }
          shapeTool.onMouseDown = (event) => {
            if (!initPoint) {
              this.currentItem = new paper.Path({
                strokeWidth: options.borderWidth,
                strokeColor: options.borderColor,
                opacity: options.opacity,
                strokeCap: "round"
              })
              initPoint = event.point
              this.currentItem.add(initPoint)
            } else {
              initPoint = event.point
              this.currentItem.add(initPoint)
            }
            if (ref.colorChanged == "fill") {
              ref.updateRecentColors(options.fillColor)
              ref.colorChanged = false
            }
            if (ref.colorChanged == "border") {
              ref.updateRecentColors(options.borderColor)
              ref.colorChanged = false
            }
          }
          break
      }
    },
    setPathTool(pathTool, options) {
      let ref = this
      let initPoint = undefined
      let vector
      let firstSegment, lastSegment
      let segments = []
      options.cursor.radius = options.size
      if (options.pathType !== "poly" && options.pathType !== "curve")
        this.activeLayer.onDoubleClick = undefined
      else {
        this.activeLayer.onDoubleClick = () => {
          initPoint = undefined
          this.currentItem.clone()
          this.currentItem.remove()
        }
      }
      switch (options.pathType) {
        case "line":
          pathTool.onMouseMove = (event) => {
            options.cursor.position = event.point;
            if (this.currentItem)
              this.currentItem.remove()
            if (initPoint) {
              this.currentItem = new paper.Path.Line({
                from: initPoint,
                to: event.point,
                strokeWidth: options.size,
                strokeCap: options.roundCap ? "round" : "square",
                strokeColor: options.color,
                opacity: options.opacity
              })
              if (options.style == "dashed")
                this.currentItem.dashArray = options.dashArray.map((x) => (x * options.size))
              else if (options.style == "dotted")
                this.currentItem.dashArray = options.dotArray.map((x) => (x * options.size))
              else this.currentItem.dashArray = null
              this.currentItem.insertBelow(options.cursor)
            }
          }
          pathTool.onMouseDown = (event) => {
            if (!initPoint)
              initPoint = event.point
            else {
              this.currentItem = new paper.Path.Line(initPoint, event.point)
              this.currentItem.insertBelow(options.cursor)
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
            if (this.currentItem)
              this.currentItem.remove()
            if (initPoint) {
                lastSegment = new paper.Segment(
                    event.point,
                    null,
                    null
                )
                this.currentItem = new paper.Path({
                  segments: segments.concat(lastSegment),
                  strokeWidth: options.size,
                  strokeJoin: "round",
                  strokeCap: options.roundCap ? "round" : "square",
                  strokeColor: options.color,
                  opacity: options.opacity
                })
                if (options.style == "dashed")
                  this.currentItem.dashArray = options.dashArray.map((x) => (x * options.size))
                else if (options.style == "dotted")
                  this.currentItem.dashArray = options.dotArray.map((x) => (x * options.size))
                else this.currentItem.dashArray = null
                this.currentItem.insertBelow(options.cursor)

            }
          }
          pathTool.onMouseDown = (event) => {
            if (!initPoint) {
              segments = []
            }
            firstSegment = new paper.Segment(
                event.point,
                null,
                null
            )
            segments.push(firstSegment)
            initPoint = event.point
            if (ref.colorChanged) {
              ref.updateRecentColors(options.color)
              ref.colorChanged = false
            }
          }
          break
        case "curve":
          pathTool.onMouseMove = (event) => {
            let hIn, hOut, firstVector, angle
            options.cursor.position = event.point;
            if (this.currentItem)
              this.currentItem.remove()
            if (initPoint) {
              if (segments.length > 1) {
                vector = new paper.Point({
                  x: event.point.x - firstSegment.point.x,
                  y: event.point.y - firstSegment.point.y
                });
                firstVector = new paper.Point({
                  x: segments[segments.length - 1].point.x - segments[segments.length - 2].point.x,
                  y: segments[segments.length - 1].point.y - segments[segments.length - 2].point.y
                });
                angle = vector.getDirectedAngle(firstVector) > 0 ?
                    180 - vector.getDirectedAngle(firstVector) :
                    -180 + Math.abs(vector.getDirectedAngle(firstVector))
                hIn = vector.rotate(180)
                hOut = vector
                hOut.length=hIn.length=vector.length*0.3
                if(angle>0) {
                  hIn.angle = firstVector.angle - (90 - angle / 2) - 180
                  hOut.angle = hIn.angle +180
                }
                else if(angle<0) {
                  hIn.angle = firstVector.angle - (-90 - angle / 2) - 180
                  hOut.angle = hIn.angle+180
                }
                else {
                  hIn.angle=firstVector.angle - angle / 2 - 180
                  hOut.angle=vector.angle-(180-(hIn.getDirectedAngle(firstVector)))
                }
                hIn.length = Math.abs(segments[segments.length - 1].point.getDistance(segments[segments.length - 2].point)) * 0.2 + vector.length*0.2
                if(Math.abs(angle)/40 < 1) {
                  hIn.length *= (Math.abs(angle) / 40)
                  hOut.length *= (Math.abs(angle) / 40)
                }
                segments[segments.length - 1].handleIn = hIn
                segments[segments.length - 1].handleOut = hOut
              }

            /*console.log('chIn:'+hIn.angle)
            console.log('fv:'+firstVector.angle)
            console.log("hIn:"+(hIn.getDirectedAngle(firstVector)))
            console.log("hOut:"+(hOut.getDirectedAngle(firstVector)))
            console.log("hIn-hOut:"+hIn.getDirectedAngle(hOut))
            console.log("fV-vector:"+angle)*/
            lastSegment = new paper.Segment(
                event.point,
                null,
                null
            )
            /*lastSegment.selected = true
            segments[segments.length - 1].selected = true*/
            this.currentItem = new paper.Path({
              segments: segments.concat(lastSegment),
              strokeWidth: options.size,
              strokeJoin: "round",
              strokeCap: options.roundCap ? "round" : "square",
              strokeColor: options.color,
              opacity: options.opacity
            })
            if (options.style == "dashed")
              this.currentItem.dashArray = options.dashArray.map((x) => (x * options.size))
            else if (options.style == "dotted")
              this.currentItem.dashArray = options.dotArray.map((x) => (x * options.size))
            else this.currentItem.dashArray = null
            this.currentItem.insertBelow(options.cursor)
          }}
          pathTool.onMouseDown = (event) => {
            if (!initPoint) {
              segments = []
            }
            firstSegment = new paper.Segment(
                event.point,
                null,
                null
            )
            segments.push(firstSegment)
            initPoint = event.point
            if (ref.colorChanged) {
              ref.updateRecentColors(options.color)
              ref.colorChanged = false
            }
          }
          break
      }
    },
    setTextTool(textTool, options) {
      textTool.onMouseMove = (event) => {
        if (this.currentItem)
          this.currentItem.remove()
        this.currentItem = new paper.PointText({
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
          shadowOffset: options.isShadow ? new paper.Point(Number(options.shOffsetX), Number(options.shOffsetY)) : undefined
        })
      }
      textTool.onMouseDown = () => {
        this.OBJECT_STORAGE.push(this.currentItem.clone())
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
    //-----STAMP-------------------------
    this.setStampTool(this.stampTool, this.stampOpt)
    //-----SHAPE-------------------------
    this.setShapeTool(this.shapeTool, this.shapeOpt)
    //-----PATH--------------------------
    this.pathOpt.cursor = new paper.Shape.Circle(new paper.Point(0, 0), 1)
    this.pathOpt.cursor.fillColor = 'transparent'
    this.pathOpt.cursor.strokeColor = "black"
    this.pathOpt.cursor.visible = false
    this.setPathTool(this.pathTool, this.pathOpt)
    //-----TEXT--------------------------
    this.setTextTool(this.textTool, this.textOpt)
    ////......
    this.setCursor(this.cursorTool, this.cursorOpt)
    this.cursorTool.activate()
    this.currentTool.toolRef = this.cursorTool
  },
  watch: {
    'currentTool.name'(val) {
      if (this.currentItem)
        this.currentItem.remove()
      if (val != "brush")
        this.brushOpt.cursor.visible = false
      if (val != "path")
        this.pathOpt.cursor.visible = false
      if (val !="cursor" && this.cursorOpt.selectedObj)
        this.removeSelect()
      switch (val) {
        case "cursor":
          this.currentTool.toolRef = this.cursorTool
          this.styleCursor = "default"
          this.cursorTool.activate()
          break
        case "brush":
          this.currentTool.toolRef = this.brushTool
          this.styleCursor = "none"
          this.brushOpt.cursor.visible = true
          this.brushTool.activate()
          break
        case "stamp":
          this.currentTool.toolRef = this.stampTool
          this.styleCursor = "none"
          this.stampTool.activate()
          break
        case "shape":
          this.currentTool.toolRef = this.shapeTool
          this.styleCursor = "crosshair"
          this.shapeTool.activate()
          break
        case "path":
          this.currentTool.toolRef = this.pathTool
          this.styleCursor = "none"
          this.pathOpt.cursor.visible = true
          this.pathTool.activate()
          break
        case "text":
          this.currentTool.toolRef = this.textTool
          this.styleCursor = "none"
          this.textTool.activate()
      }
    },
    'OBJECT_STORAGE.length'(val) {
      let obj = this.OBJECT_STORAGE[val - 1]
      this.activeLayer.addChild(obj)
      console.log(paper.project.layers)
      console.log(this.OBJECT_STORAGE)
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
  z-index: 1;
  position: relative;
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
  position: relative;
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
  cursor: pointer;
  padding: 0;
  margin: 0
}

.cursorNone {
  cursor: none;
}

input[type=color]::-webkit-color-swatch {
  border-radius: 0;
  border: 1px solid gray;
  cursor: toolRef
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
  cursor: toolRef;
  box-shadow: -180px 0 0 173px #232323;
}

input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  background: white;
  width: 12px;
  height: 12px;
  border: 1px solid #232323;
  border-radius: 10px;
  cursor: toolRef;
  box-shadow: -180px 0 0 173px #232323;
}
</style>
