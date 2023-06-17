<template>
  <ContextMenu
               :style="contextMenuStyle"
               :show-menu="this.getMenuFlag"
               @copyItem="()=>{
                 cursorTool.copyItem()
                 cursorTool.contextMenuVisible(false)
                 this.$store.commit('setCursorStyle', 'default')}"
               @removeItem="()=>{
                  cursorTool.removeItem()
                  cursorTool.contextMenuVisible(false)
                  this.$store.commit('setCursorStyle', 'default')}"
               @toFront="()=>{
                 cursorTool.setToFront()
                 cursorTool.contextMenuVisible(false)
                 this.$store.commit('setCursorStyle', 'default')}"
               @toBack="()=>{
                 cursorTool.setToBack()
                 cursorTool.contextMenuVisible(false)
                 this.$store.commit('setCursorStyle', 'default')}"/>
  <MapEditWindow
      v-if="modalFlags.showEditMapWin"
      :map-name="currentMap.title"
      :map-desc="currentMap.description"
      @closeWindow="()=>modalFlags.showEditMapWin=false"
      @updateName="(val)=>currentMap.title=val"
      @updateDesc="(val)=>currentMap.description=val"
      @updateMapMetadata="updateMapMetadata(currentMap)"
  />
  <ImageLoadWindow
      v-if="modalFlags.showImgLoadWin"
      @closeWindow="()=>{modalFlags.showImgLoadWin=false}"
      @setLoadMode="(mode)=>{
        modalFlags.showImgLoadWin=false
        canvas.backgroundOpt.loadMode=mode
        canvas.setBackground(canvas.backgroundOpt)
      }"
  />
  <div class="MainContainer" @contextmenu.prevent>
    <TopMenu
        :canvas-size="{width:canvas.resoX, height:canvas.resoY}"
        @saveAs="(ext)=>{
          if(selection.selectedObject) selection.remove()
          exportAs(ext, canvas, currentMap.title)
        }"
        @showMapEditWindow="()=>{ modalFlags.showEditMapWin = true}"
        @showImageLoadWindow="(background)=>{
          canvas.backgroundOpt=background
          modalFlags.showImgLoadWin = true
        }"
        @setCanvasBackground="(background)=>{canvas.setBackground(background)}"
        @removeCanvasBackground="canvas.removeBackground().bind(canvas)"
        @loadJson="canvas.loadProject"
    />
    <ToolsPanel
        @toolChange="setTool"
    />
    <BotMenu
        @resetAlign="canvas.hardReset()"
        @zoom="(event, step, mode)=>{zoom(event, step, mode, this.canvas)}"
        @resetScale="canvas.resetScale()"
        @saveMap="updateMapObjects(currentMap)"
        :status-prop="this.saveStatus"
        :changes-prop="canvas.changes"
        :scale-prop="Number(canvas.scale)"/>
    <div class="CanvasArea" id="canvasBox" @wheel="zoom(event,0.2, null, canvas)">
      <canvas id="map" :width="this.canvas.CSSwidth" :height="this.canvas.CSSheight"
              :style="{cursor: cursorStyle, width:this.canvas.CSSwidth+'px', height:this.canvas.CSSheight+'px' }"
      @mouseout="this.$store.commit('setCenterItemFlag',true)"
      @mouseover="this.$store.commit('setCenterItemFlag',false)"
      ></canvas>
    </div>
  </div>
</template>
<script>
import TopMenu from "@/components/mapCanvas/TopMenu.vue"
import BotMenu from "@/components/mapCanvas/BotMenu";
import ToolsPanel from "@/components/mapCanvas/ToolsPanel";
import MapEditWindow from "@/components/MapEditWindow";
import ImageLoadWindow from "@/components/mapCanvas/ImageLoadWindow";
import AxiosRequest from "@/modules/services/axiosRequest";
import ContextMenu from "@/components/mapCanvas/ContextMenu";
import cursorTool from "@/modules/tools/cursorTool";
import brushTool from "@/modules/tools/brushTool";
import shapeTool from "@/modules/tools/shapeTool";
import pathTool from "@/modules/tools/pathTool";
import textTool from "@/modules/tools/textTool";
import stampTool from "@/modules/tools/stampTool";
import zoomTool from "@/modules/tools/zoomTool";
import canvas from "@/modules/logic/canvas";
import selection from "@/modules/logic/selectionLogic";
import {flags} from "@/modules/logic/flags";
import * as paper from "paper" ;
import {zoom} from "@/modules/logic/zoom";
import {exportAs} from "@/modules/logic/export"
import {mapGetters} from 'vuex'
export default {
  name: "MapCanvas",
  components: {
    TopMenu,
    BotMenu,
    ToolsPanel,
    MapEditWindow,
    ImageLoadWindow,
    ContextMenu
  },
  data() {
    return {
      saveStatus: "Нет изменений",
      modalFlags: flags,
      currentMap: {
        title: "",
        description: ""
      },
      canvas: null,
      activeLayer: null,
      selection: null,
      cursorTool: null,
      brushTool: null,
      stampTool: null,
      pathTool: null,
      shapeTool: null,
      textTool: null,
      zoomTool: null,
    }
  },
  computed: {
    ...mapGetters(['getCursorStyle'],['cursorOptions/getContextMenuPos']),
    ...mapGetters('cursorOptions', [
      'getContextMenuPos',
    ]),
    ...mapGetters('cursorOptions', [
      'getMenuFlag',
    ]),
    contextMenuStyle() {
      if(!this.getContextMenuPos) return
      return {
        top: this.getContextMenuPos.top ? `${this.getContextMenuPos.top}px` : 'auto',
        right: this.getContextMenuPos.right ? `${this.getContextMenuPos.right }px` : 'auto',
        left: this.getContextMenuPos.left ? `${ this.getContextMenuPos.left}px` : 'auto',
        bottom: this.getContextMenuPos.bottom ? `${this.getContextMenuPos.bottom}px` : 'auto',
      };
    },
    cursorStyle(){
      return this.getCursorStyle
    },

  },
  methods: {
    zoom: zoom,
    exportAs: exportAs,
    setTool(tool) {
      switch (tool){
        case "cursor":
          this.$store.commit("setSelectedTool",this.cursorTool)
          break
        case "brush":
          this.$store.commit("setSelectedTool",this.brushTool)
          break
        case "stamp":
          this.$store.commit("setSelectedTool",this.stampTool)
          break
        case "shape":
          this.$store.commit("setSelectedTool",this.shapeTool)
          break
        case "path":
          this.$store.commit("setSelectedTool",this.pathTool)
          break
        case "text":
          this.$store.commit("setSelectedTool",this.textTool)
          break
        case "zoom":
          this.$store.commit("setSelectedTool",this.zoomTool)
          break
      }
    },
    async getCurrentMap() {
      try {
        let request = new AxiosRequest(`map/${this.$route.params.id}`, 'get')
        let response = (await request.sendRequest())
        if (response && response.map) return response.map
      } catch (e) {
        this.$store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
        this.$router.push("/Main")
      }
    },
    async updateMapMetadata(map) { //обновление названия/описания карты
      let request
      try { //запрос на сервер с использованием AxiosRequest
        request = new AxiosRequest(`map/${map._id}`, "put", {title: map.title, description: map.description}) //запрос
        await request.sendRequest()
        this.showEditMapWin = false
      } catch (e) {
        this.$store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
      }
      this.modalFlags.showEditMapWin=false
    },
    async updateMapObjects(map){
      this.$store.commit("removeCurrentItem")
      if(this.selection)
        this.selection.remove()
      const objects=paper.project.exportJSON()
      let request
      try{
        request = new AxiosRequest(`map/${map._id}`, "put", {objects:objects}) //запрос
        await request.sendRequest()
        this.$store.commit("setNotification", ["success","Успешно сохранено!"])
        this.canvas.changes=0
        this.saveStatus="Сохранено"
      }
      catch (e) {
        this.$store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
    }
    this.toolSwitch('on')
    }
  },
  async mounted() {
    this.currentMap = await this.getCurrentMap()
    if (!this.currentMap || !this.currentMap.title)
      this.$router.push("/Main")
    this.canvas.setup(this.currentMap.resolution, document.getElementById("map"))
    if(this.currentMap.objects){
      this.canvas.loadProject(this.currentMap.objects)
    }
    else {
      let firstLayer = new paper.Layer()
      firstLayer.bringToFront()
      firstLayer.activate()
    }
    this.activeLayer = paper.project.activeLayer
    this.brushTool = new brushTool()
    this.stampTool = new stampTool()
    this.shapeTool = new shapeTool()
    this.pathTool = new pathTool()
    this.textTool = new textTool()
    this.zoomTool = new zoomTool(this.canvas)
    this.$store.commit("setSelectedTool",this.cursorTool)
    /*window.onbeforeunload = () =>{
      return "";
    }*/
  },
  created() {
    this.canvas = new canvas()
    this.selection=new selection()
    this.cursorTool=new cursorTool(this.selection)
    window.addEventListener("resize", this.canvas.setDefaultSizes.bind(this.canvas));
    window.addEventListener("resize", this.canvas.resetCoords.bind(this.canvas));
  },
  watch: {
    'activeLayer.children.length'(old, val) {
      if(val) {
        const filteredArr = this.activeLayer.children.filter(obj => (obj.name !== 'brushCursor' || obj.name !== 'pathCursor'));
        if(filteredArr.length>0) {
          const obj = filteredArr.reduce((prev, current) => prev.id > current.id ? prev : current);
          console.log(obj.data.type)
          if (obj && obj.data && obj.data.type && ['brush', 'path', 'stamp', 'text', 'shape'].includes(obj.data.type))
            this.canvas.changes++
        }
        this.saveStatus=this.canvas.changes>0?"Не сохранено":"Нет изменений"
      }
    },
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

input[type='color'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 34px;
  height: 38px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
input[type='color']::-webkit-color-swatch {
  width: 100%;
  border: 1px solid #728391;
}
input[type='color']::-moz-color-swatch {
  width: 100%;
  border: 1px solid #728391;
}

.cursorNone {
  cursor: none;
}


*:hover > .hoverInvert {
  filter: invert(1);
}

input[type=number] {
  outline: none;
  font-family: Comfortaa;
  font-size: smaller;
  font-weight: bolder;
  max-width: 50px;
  border: 1px solid #3d4551;
  border-radius: 5px;
  padding: 3px 0 2px 5px
}

.tools-options input[type=range] {
  width: 150px;
  margin: 0 10px;
}

input[type=range] {
  width: 175px;
  height: 13px;
  margin-inline: 10px;
  -webkit-appearance: none;
  background: #728391;
  outline: none;
  border-radius: 10px;
  overflow: hidden;
  padding-left: 1px;
  padding-right: 1px;
  -webkit-box-shadow: 0px 0px 0px 1px rgba(35, 35, 35, 1) inset;
  -moz-box-shadow: 0px 0px 0px 1px rgba(35, 35, 35, 1) inset;
  box-shadow: 0px 0px 0px 1px rgba(35, 35, 35, 1) inset;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: #3d4551;
  width: 11px;
  height: 11px;
  border: 2px solid #ea5c41;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: -180px 0 0 173px #3d4551;
}

input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  background: #3d4551;
  width: 11px;
  height: 11px;
  border: 2px solid #ea5c41;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: -180px 0 0 173px #3d4551;
}
</style>
