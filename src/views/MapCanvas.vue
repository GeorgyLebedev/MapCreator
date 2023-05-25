<template>
  <ErrorComponent
      :error="canvas.error"
      @clearError="canvas.error=''"/>
  <ContextMenu
               :style="{
      top: cursorTool.contextMenuPos.top? cursorTool.contextMenuPos.top + 'px': 'auto',
      right: cursorTool.contextMenuPos.right? cursorTool.contextMenuPos.right  + 'px': 'auto',
      left: cursorTool.contextMenuPos.left? cursorTool.contextMenuPos.left  + 'px':'auto',
      bottom: cursorTool.contextMenuPos.bottom? cursorTool.contextMenuPos.bottom  + 'px':'auto',
  }"
               :show-menu="cursorTool.showContextMenu"
               @copyItem="()=>{
                 cursorTool.copyItem()
                 cursorTool.contextMenuVisible(false)
                 canvas.styleCursor='default'}"
               @removeItem="()=>{
                  cursorTool.removeItem()
                  cursorTool.contextMenuVisible(false)
                  canvas.styleCursor='default'}"
               @toFront="()=>{
                 cursorTool.setToFront()
                 cursorTool.contextMenuVisible(false)
                 canvas.styleCursor='default'}"
               @toBack="()=>{
                 cursorTool.setToBack()
                 cursorTool.contextMenuVisible(false)
                 canvas.styleCursor='default'}"/>
  <StampsWindow
      :window-visible="showStampsWin"
      :stamps-prop="options&&options.stamps?options.stamps:{}"
      @showStampsWindow="(flag)=>{ showStampsWin = flag }"/>
  <MapEditWindow
      :map-name="currentMap.title"
      :map-desc="currentMap.description"
      :show-window="showEditMapWin"
      @closeWindow="()=>{showEditMapWin = false}"
      @updateName="(val)=>{currentMap.title=val}"
      @updateDesc="(val)=>{currentMap.description=val}"
      @updateMapMetadata="updateMapMetadata(currentMap)"
  />
  <div class="MainContainer" @contextmenu.prevent>
    <TopMenu
        @saveAs="(ext)=>{
          if(selection.selectedObject) selection.remove()
          exportAs(ext, canvas, currentMap.title)
        }"
        @showMapEditWindow="()=>{showEditMapWin = true}"
        @errorAlert="(message)=>canvas.error=message"
        @loadJson="canvas.loadProject"
        @loadImg="canvas.loadBackgroundImage"
    />
    <Accordion/>
    <ToolsPanel
        @toolChange="setTool"
        @optChange="setOpt"
        @update="(item, options)=>{
          cursorTool.updateItem(item, options)
          selection.set(item)
        }"
        @removeSelect="selection.remove()"
        @showStampsWindow="(flag)=>{ showStampsWin = flag }"
        :selected-obj="selection.selectedObject"
        :rotation="selection.selectedObject? Number(selection.selectedObject.rotation):0"
        :size="selection.selectedObject&&selection.selectedObject.size? Number(selection.selectedObject.size.width):0"
    />
    <BotMenu
        @resetAlign="canvas.hardReset()"
        @zoom="(event, step, mode)=>{zoom(event, step, mode, this.canvas)}"
        @resetScale="canvas.resetScale()"
        :scale-prop="Number(canvas.scale)"/>
    <div class="CanvasArea" id="canvasBox" @wheel="zoom(event,0.2, null, canvas)">
      <canvas id="map" :width="this.canvas.CSSwidth" :height="this.canvas.CSSheight"
              :style="{cursor: canvas.styleCursor, width:this.canvas.CSSwidth+'px', height:this.canvas.CSSheight+'px' }"
              @mouseout="()=>{
                toolSwitch('off')
              }"
              @mouseover="()=>{
                toolSwitch('on')
              }"
      ></canvas>
    </div>
  </div>
</template>
<script>
import TopMenu from "@/components/mapCanvas/TopMenu.vue"
import Accordion from "@/components/mapCanvas/Accordion";
import BotMenu from "@/components/mapCanvas/BotMenu";
import ToolsPanel from "@/components/mapCanvas/ToolsPanel";
import StampsWindow from "@/components/mapCanvas/StampsWindow";
import MapEditWindow from "@/components/MapEditWindow";
import AxiosRequest from "@/modules/services/axiosRequest";
import ErrorComponent from "@/components/Error";
import ContextMenu from "@/components/mapCanvas/ContextMenu";
import cursorTool from "@/modules/tools/cursorTool";
import brushTool from "@/modules/tools/brushTool";
import shapeTool from "@/modules/tools/shapeTool";
import pathTool from "@/modules/tools/pathTool";
import textTool from "@/modules/tools/textTool";
import stampTool from "@/modules/tools/stampTool";
import zoomTool from "@/modules/tools/zoomTool";
import canvas from "@/modules/logic/canvas";
import selection from "@/modules/logic/selection";
import * as paper from "paper" ;
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import {zoom} from "@/modules/logic/zoom";
import {exportAs} from "@/modules/logic/export"
export default {
  name: "MapCanvas",
  components: {
    ErrorComponent,
    TopMenu,
    Accordion,
    BotMenu,
    ToolsPanel,
    StampsWindow,
    MapEditWindow,
    ContextMenu
  },
  props:{
    id: {
      type: String
    },
  },
  data() {
    return {
      currentMap: {
        title: "",
        description: ""
      },
      options: {},
      canvas: null,
      currentTool: {
        name: "cursor",
        toolRef: null
      },
      currentItem: null,
      showEditMapWin: false,
      showStampsWin: false,
      activeLayer: null,
      selection: null,
      cursorTool: null,
      brushTool: null,
      stampTool: null,
      pathTool: null,
      shapeTool: null,
      textTool: null,
      zoomTool: null,
      nullTool: new paper.Tool()
    }
  },
  methods: {
    zoom: zoom,
    exportAs: exportAs,
    toolSwitch(mode) {
      if (mode == "on" && this.currentTool.toolRef) {
        this.currentTool.toolRef.activate()
      } else
        this.nullTool.activate()
    },
    setTool(tool) {
      this.currentTool.name = tool
    },
    setOpt(opt) {
      switch (this.currentTool.name) {
        case "cursor": this.cursorTool.set(opt)
              break
        case "brush":  this.brushTool.set(opt)
              break
        case "shape":this.shapeTool.set(opt)
              break
        case "path": this.pathTool.set(opt)
              break
        case "text": this.textTool.set(opt)
              break
        case "stamp": this.stampTool.set(opt)
              break
        case "zoom": this.zoomTool.set(this.canvas)
            break
      }
    },
    async getCurrentMap() {
      try {
        let request = new AxiosRequest(`map/${this.id}`, 'get')
        let response = (await request.sendRequest())
        if (response && response.map) return response.map
      } catch (e) {
        this.canvas.error = e.message
        this.$router.push("/Main")
      }
    },
    async getOptions(){
      try {
        let request = new AxiosRequest(`options/`, 'get')
        let response = (await request.sendRequest())
        if (response && response.options) return response.options
      } catch (e) {
        this.canvas.error = e.message
      }
    },
    async updateMapMetadata(map) { //обновление названия/описания карты
      let request
      try { //запрос на сервер с использованием AxiosRequest
        request = new AxiosRequest(`map/${map._id}`, "put", {title: map.title, description: map.description}) //запрос
        await request.sendRequest()
        this.showEditMapWin = false
      } catch (e) {
        this.canvas.error = e
      }
    }
  },
  async mounted() {
    this.currentMap = await this.getCurrentMap()
    this.options=await this.getOptions()
    if (!this.currentMap || !this.currentMap.title)
      this.$router.push("/Main")
    this.canvas.setup(this.currentMap.resolution, document.getElementById("map"))
    let firstLayer = new paper.Layer()
    firstLayer.bringToFront()
    firstLayer.activate()
    this.activeLayer = paper.project.activeLayer
    this.brushTool = new brushTool()
    this.stampTool = new stampTool()
    this.shapeTool = new shapeTool()
    this.pathTool = new pathTool()
    this.textTool = new textTool()
    this.zoomTool = new zoomTool()
    this.cursorTool.activate()
    this.currentTool.toolRef = this.cursorTool.instance
    /*window.onbeforeunload = () =>{
      return "";
    }*/
  },
  created() {
    this.canvas = new canvas()
    this.selection=new selection(this.canvas)
    this.cursorTool=new cursorTool(this.selection)
    window.addEventListener("resize", this.canvas.setDefaultSizes.bind(this.canvas));
    window.addEventListener("resize", this.canvas.resetCoords.bind(this.canvas));
  },
  watch: {
    'currentTool.name'(newTool,oldTool) {
      switch (oldTool) {
        case "cursor":
          if(this.selection.selectedObject) this.selection.remove()
          break
        case "brush":
          paper.project.activeLayer.children["brushCursor"].visible = false
          break
        case "stamp":
          if(this.stampTool.currentItem) this.stampTool.currentItem.remove()
          break
        case "shape":
          if(this.shapeTool.currentItem) this.shapeTool.currentItem.remove()
          break
        case "path":
          paper.project.activeLayer.children["pathCursor"].visible = false
          if(this.pathTool.currentItem) this.pathTool.currentItem.remove()
          break
        case "text":
          if(this.textTool.currentItem) this.textTool.currentItem.remove()
          break
      }
      switch (newTool) {
        case "cursor":
          this.currentTool.toolRef = this.cursorTool.instance
          this.canvas.styleCursor = "default"
          this.cursorTool.activate()
          break
        case "brush":
          this.currentTool.toolRef = this.brushTool.instance
          this.canvas.styleCursor = "none"
          this.brushTool.activate()
          break
        case "stamp":
          this.currentTool.toolRef = this.stampTool.instance
          this.canvas.styleCursor = "none"
          this.stampTool.activate()
          break
        case "shape":
          this.currentTool.toolRef = this.shapeTool.instance
          this.canvas.styleCursor = "crosshair"
          this.shapeTool.activate()
          break
        case "path":
          this.currentTool.toolRef = this.pathTool.instance
          this.canvas.styleCursor = "none"
          this.pathTool.activate()
          break
        case "text":
          this.currentTool.toolRef = this.textTool.instance
          this.canvas.styleCursor = "none"
          this.textTool.activate()
          break
        case "zoom":
          this.currentTool.toolRef = this.zoomTool.instance
          this.canvas.styleCursor = "zoom-in"
          this.zoomTool.activate()
          break
      }
    },
    'activeLayer.children.length'() {
      /*let obj = this.activeLayer.lastChild
      obj.applyMatrix = false*/
      console.log(paper.project.activeLayer)
    },
    'currentItem'(item) {
      item.data.type = this.currentTool.name
    }
  }
}
</script>
<style>
.MainContainer {
  display: grid;
  width: 100vw;
  max-height: 100vh;
  height: 100vh;
  max-width: 100vw;
  overflow-y: hidden;
  z-index: 1;
  position: relative;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 40px 1fr 40px;
  gap: 0px 0px;
  padding: 0;
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
  overflow-x: hidden;
  overflow-y: hidden;
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
  cursor: pointer;
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
