<template>
  <StampsWindow
      :window-visible="this.stampsWinVisible"
      @showStampsWindow="showStampsWin"
  ></StampsWindow>
  <div class="MainContainer" @contextmenu.prevent>
    <TopMenu/>
    <Accordion/>
    <ToolsPanel
        @toolChange="setTool"
        @optChange="setOpt"
        @newSelect="setSelected"
        @update="updateItem"
        @removeSelect="removeSelect"
        @showStampsWindow="showStampsWin"
        :recent-colors="recentColors"
        :selected-obj="cursorOpt.selectedObj"
        :rotation="Number(rotation)"
    />
    <BotMenu
        @resetAlign="canvasReset"
        @zoom="zoom"
        @resetScale="resetScale"
        :scale-prop="Number(this.canvasObj.scale)"/>
    <div class="CanvasArea" id="canvasBox" @wheel="zoom(event,0.2)">
      <canvas id="map" :width="this.canvasObj.resoX" :height="this.canvasObj.resoY" :style="{cursor: this.styleCursor, width:this.canvasObj.CSSwidth+'px', height:this.canvasObj.CSSheight+'px' }"
              @mouseout="toolSwitch('off')"
              @mouseover="toolSwitch('on')"
              ></canvas>
    </div>
  </div>
</template>
<script>
import TopMenu from "@/components/TopMenu.vue"
import Accordion from "@/components/Accordion";
import BotMenu from "@/components/BotMenu";
import ToolsPanel from "@/components/ToolsPanel";
import StampsWindow from "@/components/StampsWindow";
import * as paper from "paper" ;
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
export default {
  name: "MapCanvas",
  components: {
    TopMenu,
    Accordion,
    BotMenu,
    ToolsPanel,
    StampsWindow
  },
  data() {
    return {
      canvasObj:{
        ref: null,
        resoX: 1920,
        CSSwidth: 1,
        defaultWidth: 1,
        resoY: 1080,
        CSSheight: 1,
        defaultHeight: 1,
        scale: 1,
        ratio: 1,
        offsetLeft:0,
        offsetTop:0
      },
      currentTool: {
        name: "cursor",
        toolRef: null
      },
      currentItem: null,
      stampsWinVisible: false,
      rotation:0,
      OBJECT_STORAGE: [],
      styleCursor: "default",
      recentColors: Array(8).fill("#ffffff"),
      colorChanged: false,
      activeLayer: null,
      cursorTool: new paper.Tool(),
      cursorOpt:{
        selectedObj: null
      },
      brushTool: new paper.Tool(),
      brushOpt: {
        size: 1,
        opacity: 1,
        color: "",
        cursor: null,
      },
      stampTool: new paper.Tool(),
      stampOpt:{
        size: 500,
        scale: 50,
        opacity: 1,
        rotation: 0,
        revert: "none",
        currentSet: "firstSet",
        currentStamp: "stampEx.svg",
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
        strokeWidth: 1,
        strokeColor: "#000000",
        fillColor: "#ffffff",
        borderRadius: 0,
        opacity: 1,
        rotation: 0
      },
      textTool: new paper.Tool(),
      textOpt: {
        content: "Текст",
        fontFamily: "Cambria",
        fontSize: 10,
        justification: "left",
        fillColor: "#ffffff",
        strokeColor: "#000000",
        strokeWidth: 1,
        shadowColor: "#000000",
        shadowBlur: 1,
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
    showStampsWin(flag){
      this.stampsWinVisible=flag
    },
    zoom(e,step=0, mode=null){
      let event = window.event || e
      let newX, newY
      let canvasPoint={
        x:null,
        y:null
      }
      let cObj=this.canvasObj
      let scale=cObj.scale
      if(!mode)
      mode=event.wheelDelta>0 ? "+":"-"
      switch (mode) {
        case "+":
          step=Math.abs(step)
          break
        case "-":
          step=-step
          break
        case "=":
          break
      }
      if(mode=="+"|| mode=="-") {
        canvasPoint.x = event.pageX -  cObj.offsetLeft // старые координаты курсора на холсте
        canvasPoint.y = event.pageY - cObj.offsetTop
        newX =canvasPoint.x-canvasPoint.x*((scale+step)/scale)
        newY =canvasPoint.y-canvasPoint.y*((scale+step)/scale)
        if (scale + step < 0.2 || scale + step > 5) return
        scale += step
        scale = Number(scale.toFixed(2))
        cObj.CSSheight = cObj.defaultHeight * scale
        cObj.CSSwidth = cObj.defaultWidth * scale
        paper.view.center=new paper.Point(cObj.CSSwidth/2,cObj.CSSheight/2 )
        paper.view.zoom=scale
        paper.view.viewSize=new paper.Size(cObj.CSSwidth,cObj.CSSheight)
        paper.view.update()
        cObj.scale = scale
        this.setTranslate(cObj.offsetLeft+newX, cObj.offsetTop+newY)
      }
      if(mode=="="){
        canvasPoint.x = document.documentElement.clientWidth/2 -  cObj.offsetLeft
        canvasPoint.y = document.documentElement.clientHeight/2 - cObj.offsetTop
        newX =canvasPoint.x-canvasPoint.x*(step/scale)
        newY =canvasPoint.y-canvasPoint.y*(step/scale)
        scale=step
        cObj.CSSheight = cObj.defaultHeight * scale
        cObj.CSSwidth = cObj.defaultWidth * scale
        cObj.scale = scale
        this.setTranslate(cObj.offsetLeft+newX, cObj.offsetTop+newY)
      }

    },
    setTranslate(x,y){
      this.canvasObj.ref.style.transform="translate("+x+"px,"+y+"px)"
      this.canvasObj.offsetLeft=x
      this.canvasObj.offsetTop=y
    },
    getCanvasArea(){
      let canvasArea={
        width: document.documentElement.clientWidth-document.getElementById('toolsPanel').offsetWidth,
        height: document.documentElement.clientHeight-document.getElementById('footer').offsetHeight-document.getElementById('header').offsetHeight
      }
      return canvasArea
    },
    setDefaultSizes(){
      let area=this.getCanvasArea()
      this.canvasObj.defaultHeight=area.height
      this.canvasObj.defaultWidth=this.canvasObj.defaultHeight*this.canvasObj.ratio
      this.canvasReset()
    },
    resetScale(){
      this.canvasObj.scale=1
      this.canvasObj.CSSwidth=this.canvasObj.defaultWidth
      this.canvasObj.CSSheight=this.canvasObj.defaultHeight
    },
    canvasReset(){
      //paper.view.zoom=1
      this.canvasObj.scale=1
      this.canvasObj.CSSwidth=this.canvasObj.defaultWidth
      this.canvasObj.CSSheight=this.canvasObj.defaultHeight
      let area=this.getCanvasArea()
      this.setTranslate(((area.width-this.canvasObj.defaultWidth)/2), ((area.height-this.canvasObj.defaultHeight)/2))
    },
    getBoundGroup(group,item){
      let rotateStart, rotateEnd, angle=0
      this.rotation=item.rotation
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
      boundCircle.onMouseUp=()=>{
        angle=undefined
      }
      boundCircle.onMouseDrag=(event)=>{
        if(angle) {
          this.rotation-=angle
          item.position = boundRect.position
        }
        rotateEnd=new paper.Point({
          x:event.point.x - boundCircle.position.x,
          y:event.point.y - boundCircle.position.y
        })
        angle=rotateStart.getDirectedAngle(rotateEnd)
        this.rotation+=angle
        item.position=boundRect.position
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
      if(item.selectionGroup){
        item.selectionGroup.removeChildren()
        item.selectionGroup.remove()
        item.selectionGroup=undefined
      }
      item.selectionGroup=this.getBoundGroup(new paper.Group(),item)
      return item
    },
    removeSelect(){
      this.cursorOpt.selectedObj.selectionGroup.removeChildren()
      this.cursorOpt.selectedObj.selectionGroup.remove()
      this.cursorOpt.selectedObj.selectionGroup=undefined
      this.cursorOpt.selectedObj.onMouseDrag=undefined
      this.cursorOpt.selectedObj=undefined
    },
    updateItem(item, options){
      switch (item.type) {
        case "text":
          item.shadowColor= options.isShadow ? options.shadowColor : "transparent"
          item.shadowBlur= options.isShadow ? options.shadowBlur : 0
          item.shadowOffset= options.isShadow ? new paper.Point(Number(options.shOffsetX), Number(options.shOffsetY)) : undefined
          item.data.shOffsetX=options.isShadow ? options.shOffsetX:0
          item.data.shOffsetY=options.isShadow ? options.shOffsetY:0
          item.strokeColor = options.isBorder ? options.strokeColor : "transparent"
          item.fillColor = options.isFill ? options.fillColor : new paper.Color(0, 0, 0, 1e-6)
          item.strokeWidth= options.isBorder ? options.strokeWidth : 0
          item.data.isBorder=options.isBorder ?options.isBorder:false
          item.data.isFill=options.isFill ?options.isFill:false
          item.data.isShadow=options.isShadow ?options.isShadow:false
          break
        case "shape":
          item.opacity=options.opacity
          item.strokeColor= options.isBorder ? options.strokeColor : "transparent"
          item.fillColor=options.isFill?options.fillColor:"transparent"
          item.strokeWidth= options.isBorder ? options.strokeWidth : 0
          item.data.isBorder=options.isBorder ?options.isBorder:false
          item.data.isFill=options.isFill ?options.isFill:false
          item.data.isShadow=options.isShadow ?options.isShadow:false
          item.rotation=options.rotation
          break
        case "stamp":
          item.size=options.scale/options.size*options.size
      }
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
        if (this.shapeOpt.strokeColor != opt.strokeColor)
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
      if(this.recentColors.indexOf(newColor)!=-1) return
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
        if(obj && options.selectedObj && obj.id==options.selectedObj.selectionGroup.id) return
        if(options.selectedObj && obj!=options.selectedObj) {
          this.removeSelect()
        }
        if(!obj || this.OBJECT_STORAGE.indexOf(obj) == -1) return
        if(!options.selectedObj) {
          this.setSelected(obj)
          options.selectedObj = obj
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
          source: require('../assets/images/Stamps/'+options.currentSet+'/'+options.currentStamp),
          position: event.point,
          size: options.size * options.scale/options.size,
          opacity: options.opacity,
          rotation: options.rotation
        })
        this.currentItem.data.scale=options.scale
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
              initPoint = undefined
            }
            if (ref.colorChanged == "fill") {
              ref.updateRecentColors(options.fillColor)
              ref.colorChanged = false
            }
            if (ref.colorChanged == "border") {
              ref.updateRecentColors(options.strokeColor)
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
                strokeColor: options.strokeColor,
                fillColor: options.fillColor,
                strokeWidth: options.strokeWidth == 1 ? options.strokeWidth * 2 : options.strokeWidth,
                opacity: options.opacity,
                rotation: options.rotation
              })
              this.currentItem.data.isBorder=this.shapeOpt.isBorder
              this.currentItem.data.isFill=this.shapeOpt.isFill
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
              ref.updateRecentColors(options.strokeColor)
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
                strokeColor: options.strokeColor,
                fillColor: options.fillColor,
                strokeWidth: options.strokeWidth,
                opacity: options.opacity,
                rotation: options.rotation
              })
              this.currentItem.data.isBorder=this.shapeOpt.isBorder
              this.currentItem.data.isFill=this.shapeOpt.isFill
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
              ref.updateRecentColors(options.strokeColor)
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
                strokeColor: options.strokeColor,
                fillColor: options.fillColor,
                strokeWidth: options.strokeWidth,
                opacity: options.opacity,
                rotation: options.rotation
              })
              this.currentItem.data.isBorder=this.shapeOpt.isBorder
              this.currentItem.data.isFill=this.shapeOpt.isFill
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
                strokeWidth: options.strokeWidth,
                strokeColor: options.strokeColor,
                opacity: options.opacity,
                strokeCap: "round"
              })
            }
          }
          shapeTool.onMouseDown = (event) => {
            if (!initPoint) {
              this.currentItem = new paper.Path({
                strokeWidth: options.strokeWidth,
                strokeColor: options.strokeColor,
                opacity: options.opacity,
                strokeCap: "round",
                rotation: options.rotation
              })
              this.currentItem.data.isBorder=this.shapeOpt.isBorder
              this.currentItem.data.isFill=this.shapeOpt.isFill
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
              ref.updateRecentColors(options.strokeColor)
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
          content: options.content,
          fillColor: options.isFill ? options.fillColor : new paper.Color(0, 0, 0, 1e-6),
          fontFamily: options.fontFamily,
          fontWeight: options.fontWeight,
          fontSize: options.fontSize,
          justification: options.justification,
          opacity: options.opacity,
          rotation: options.rotation,
          strokeColor: options.isBorder ? options.strokeColor : "transparent",
          strokeWidth: options.isBorder ? options.strokeWidth : 0,
          shadowColor: options.isShadow ? options.shadowColor : "transparent",
          shadowBlur: options.isShadow ? options.shadowBlur : 0,
          shadowOffset: options.isShadow ? new paper.Point(Number(options.shOffsetX), Number(options.shOffsetY)) : undefined,
        })
        this.currentItem.data={
          isBorder: options.isBorder,
          isFill : options.isFill,
          isShadow: options.isShadow,
          shOffsetX: options.isShadow ? options.shOffsetX : 0,
          shOffsetY: options.isShadow ? options.shOffsetY : 0,
        }
      }
      textTool.onMouseDown = () => {
        this.OBJECT_STORAGE.push(this.currentItem.clone())
      }
    },
    setZoomTool(zoomTool){
      let drag=false
      let isZoom=false
      zoomTool.onMouseUp=(event)=>{
        let mode
        if(event.event.button==0){
          this.styleCursor="zoom-in"
          mode="+"
        }
        if(event.event.button==2) {
          this.styleCursor="zoom-out"
          mode = "-"
        }
        drag=false
        if(!isZoom) return
        this.zoom(event.event,0.5,mode)
      }
      zoomTool.onMouseMove=(event)=>{
        isZoom=false
        if(!drag) return
        let cObj=this.canvasObj
        this.setTranslate(cObj.offsetLeft+event.event.movementX,cObj.offsetTop+event.event.movementY)
      }
      zoomTool.onMouseDown=()=>{
        isZoom=true
        drag=true
        this.styleCursor="move"
      }
    }
  },
  mounted() {
    this.canvasObj.ref = document.getElementById("map")
    this.canvasObj.ratio=this.canvasObj.resoX/this.canvasObj.resoY
    this.canvasObj.CSSheight=document.getElementById("canvasBox").offsetHeight
    this.canvasObj.CSSwidth=this.canvasObj.CSSheight*this.canvasObj.ratio
    this.canvasObj.defaultWidth=this.canvasObj.CSSwidth
    this.canvasObj.defaultHeight=this.canvasObj.CSSheight

    paper.setup(this.canvasObj.ref)
    paper.view.viewSize=new paper.Size(this.canvasObj.CSSwidth,this.canvasObj.CSSheight)
    this.canvasReset()
    this.activeLayer = paper.project.activeLayer
    //------BRUSH------------------------
    this.brushOpt.cursor = new paper.Shape.Circle(new paper.Point(0, 0), 1)
    this.brushOpt.cursor.name="cursor"
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
    this.pathOpt.cursor.name="cursor"
    this.pathOpt.cursor.strokeColor = "black"
    this.pathOpt.cursor.visible = false
    this.setPathTool(this.pathTool, this.pathOpt)
    //-----TEXT--------------------------
    this.setTextTool(this.textTool, this.textOpt)
    //-----ZOOM--------------------------
    this.setZoomTool(this.zoomTool)
    //-----CURSOR------------------------
    this.setCursor(this.cursorTool, this.cursorOpt)
    this.cursorTool.activate()
    this.currentTool.toolRef = this.cursorTool
    /*window.onbeforeunload = () =>{
      return "";
    }*/
  },
  created() {
    window.addEventListener("resize", this.setDefaultSizes);
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
              break
        case "zoom":
          this.currentTool.toolRef = this.zoomTool
          this.styleCursor = "zoom-in"
          this.zoomTool.activate()
              break

      }
    },
    'rotation'(val){
      if(this.cursorOpt.selectedObj.type!="shape")
      this.cursorOpt.selectedObj.rotation=val
    },
    'OBJECT_STORAGE.length'(val) {
      let obj = this.OBJECT_STORAGE[val - 1]
      obj.applyMatrix=false
      obj.type=this.currentTool.name
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
  max-height: 100vw;
  height: 100vh;
  max-width: 100vw;
  overflow-y: hidden;
  z-index: 1;
  position: relative;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 40px 1fr 40px;
  gap: 0px 0px;
  padding:0;
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
