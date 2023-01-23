<template>
  <div class="MainContainer" @contextmenu.prevent>
    <TopMenu/>
    <Accordion/>
    <ToolsPanel
        @toolChange="setTool"
        @optChange="setOpt"
    :recent-colors="brushOpt.recentColors"/>
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
  data (){
    return {
      scale: 100,
      currentTool: "cursor",
      withoutCursor: false,
      cursorTool: new paper.Tool(),
      brushTool: new paper.Tool(),
      brushOpt: {
            size: 1,
            opacity:1,
            color: "",
            cursor:  null,
            colorChanged: false,
            recentColors: Array(8).fill("#ffffff"),
          },
      stampTool: new paper.Tool(),
      pathTool: new paper.Tool(),
      textTool: new paper.Tool(),
      zoomTool: new paper.Tool(),
    }
  },
  methods:{
    updateScale(data){
     this.scale=data.newScale
    },
    setTool(tool){
      this.currentTool=tool
    },
    setOpt(opt){
      if(this.currentTool=="brush"){
        if (this.brushOpt.color!=opt.color)
          this.brushOpt.colorChanged=true
        Object.assign(this.brushOpt,opt)
        this.setBrush(this.brushTool,this.brushOpt)
      }
    },
    setBrush(brush, options){
      let path
      options.cursor.radius=options.size
      brush.onMouseMove = (event)=>{
        options.cursor.position = event.point;
      }
      brush.onMouseDown = function(event) {
        path = new paper.Path();
        path.insertBelow(options.cursor)
        path.strokeWidth=options.size*2
        path.strokeCap="round"
        if(options.colorChanged){
          if(options.recentColors.length<8)
          options.recentColors.unshift(options.color)
          else {
            options.recentColors=options.recentColors.slice(0,7)
            options.recentColors.unshift(options.color)
          }
          console.log(options.recentColors)
          options.colorChanged=false
        }
        path.strokeColor = options.color;
        path.opacity=options.opacity
        path.add(event.point);
      }
      brush.onMouseDrag = function(event) {
        path.add(event.point);
        path.smooth();
        options.cursor.position = event.point;
      }
      brush.onMouseUp = function(event) {
        path.add(event.point);
        path.smooth();
      }
    }
  },
  mounted() {
    let canvas=document.getElementById("map")
    paper.setup(canvas)
   //initCursor....

    this.brushOpt.cursor=new paper.Shape.Circle(new paper.Point(0, 0),1)
    this.brushOpt.cursor.fillColor = 'transparent'
    this.brushOpt.cursor.strokeColor = "black"
    this.brushOpt.cursor.visible=false
    this.setBrush(this.brushTool, this.brushOpt)
    ////......
    this.cursorTool.activate()
  },
  watch:{
    currentTool(val){
      if(val!="brush")
        this.brushOpt.cursor.visible=false
      switch (val){
        case "cursor":
          this.withoutCursor=false
          this.cursorTool.activate()
          break;
        case "brush":
          this.withoutCursor=true
          this.brushOpt.cursor.visible=true
          this.brushTool.activate()
          break;
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
* {
  z-index: 3;
}
#map{
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
.cursorNone{
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
.tools-options input[type=range]{
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
