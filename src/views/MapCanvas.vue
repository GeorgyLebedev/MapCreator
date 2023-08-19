<template>
    <cursor-circle v-if="cursorVisible"/>
    <ContextMenu
	    :show-menu="this.getMenuFlag"
	    :style="contextMenuStyle"
	    @copyItem="()=>{
                 cursorTool.copyItem()
                 cursorTool.contextMenuVisible(false)
                 this.$store.commit('setCursorStyle', 'default')}"
	    @removeItem="()=>{
                  cursorTool.removeItem()
                  cursorTool.contextMenuVisible(false)
                  this.$store.commit('setCursorStyle', 'default')}"
	    @toBack="()=>{
                 cursorTool.setToBack()
                 cursorTool.contextMenuVisible(false)
                 this.$store.commit('setCursorStyle', 'default')}"
	    @toFront="()=>{
                 cursorTool.setToFront()
                 cursorTool.contextMenuVisible(false)
                 this.$store.commit('setCursorStyle', 'default')}"/>
    <MapEditWindow
	    v-if="showEditMapWin"
	    :map-desc="currentMap.description"
	    :map-name="currentMap.title"
	    @updateDesc="(val)=>currentMap.description=val"
	    @updateMapMetadata="updateMapMetadata(currentMap)"
	    @updateName="(val)=>currentMap.title=val"
    />
    <ImageLoadWindow
	    v-if="showImgLoadWin"
	    @setLoadMode="(mode)=>{
        this.$store.commit('modalFlags/setShowImgLoadWin', false)
        canvas.backgroundOpt.loadMode=mode
        canvas.setBackground(canvas.backgroundOpt)
      }"
    />
    <div class="main-container" @contextmenu.prevent>
	<TopMenu
		:canvas-size="{width:canvas.resoX, height:canvas.resoY}"
		@loadJson="canvas.loadProject"
		@removeCanvasBackground="canvas.removeBackground().bind(this.canvas)"
		@saveAs="(ext)=>{
          if(selection.selectedObject) selection.remove()
          exportAs(ext, canvas, currentMap.title)
        }"
		@setCanvasBackground="(background)=>{canvas.setBackground(background)}"
		@showImageLoadWindow="(background)=>{
          canvas.backgroundOpt=background
           this.$store.commit('modalFlags/setShowImgLoadWin', true)
        }"
		@showMapEditWindow=" this.$store.commit('modalFlags/setShowEditMapWin', true)"
	/>
	<ToolsPanel
		@toolChange="setTool"
	/>
	<BotMenu
		:scale-prop="Number(canvas.scale)"
		@resetAlign="canvas.hardReset()"
		@resetScale="canvas.resetScale()"
		@saveMap="updateMapObjects(currentMap)"
		@zoom="(event, step, mode)=>{zoom(event, step, mode, this.canvas)}"/>
	<div id="canvasBox" class="canvas-area" @wheel="zoom(event,0.2, null, canvas)">
	    <canvas id="map" :height="this.canvas.CSSheight" :style="{cursor: cursorStyle, width:this.canvas.CSSwidth+'px', height:this.canvas.CSSheight+'px' }"
		    :width="this.canvas.CSSwidth"
		    @mousemove="cursorVisible?updateCursorPos($event):''"
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
import cursorCircle from "@/components/mapCanvas/cursorCircle.vue";
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
	ContextMenu,
	cursorCircle
    },
    data() {
	return {
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
	...mapGetters({
	    getContextMenuPos: 'cursorOptions/getContextMenuPos',
	    getMenuFlag: 'cursorOptions/getMenuFlag',
	    showEditMapWin: 'modalFlags/showEditMapWin',
	    showImgLoadWin: 'modalFlags/showImgLoadWin',
	    cursorVisible: 'cursorState/getCursorVisibility',
	    cursorStyle: 'cursorState/getCursorStyle'
	}),
	contextMenuStyle() {
	    if (!this.getContextMenuPos) return
	    return {
		top: this.getContextMenuPos.top ? `${this.getContextMenuPos.top}px` : 'auto',
		right: this.getContextMenuPos.right ? `${this.getContextMenuPos.right}px` : 'auto',
		left: this.getContextMenuPos.left ? `${this.getContextMenuPos.left}px` : 'auto',
		bottom: this.getContextMenuPos.bottom ? `${this.getContextMenuPos.bottom}px` : 'auto',
	    };
	},

    },
    methods: {
	updateCursorPos(event) {
	    this.$store.commit('cursorState/setCursorPosition', {top: event.pageY, left: event.pageX})
	},
	zoom: zoom,
	exportAs: exportAs,
	setTool(tool) {
	    switch (tool) {
		case "cursor": this.cursorTool.activate()
		    break
		case "brush": this.brushTool.activate()
		    break
		case "stamp": this.stampTool.activate()
		    break
		case "shape": this.shapeTool.activate()
		    break
		case "path": this.pathTool.activate()
		    break
		case "text":this.textTool.activate()
		    break
		case "zoom": this.zoomTool.activate()
		    break
	    }
	},
	async getCurrentMap() {
	    try {
		let request = new AxiosRequest(`map/${this.$route.params.id}`, 'get')
		let response = (await request.sendRequest())
		if (response && response.map) return response.map
	    } catch (e) {
		this.$store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
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
		this.$store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
	    }
	    this.$store.commit('modalFlags/setShowEditMapWin', false)
	},
	async updateMapObjects(map) {
	    this.$store.commit("removeCurrentItem")
	    if (this.selection)
		this.selection.remove()
	    const objects = paper.project.exportJSON()
	    let request
	    try {
		request = new AxiosRequest(`map/${map._id}`, "put", {objects: objects}) //запрос
		await request.sendRequest()
		this.$store.commit("setNotification", ["success", "Успешно сохранено!"])
		this.$store.commit("clearChanges")
	    } catch (e) {
		this.$store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
	    }
	    this.toolSwitch('on')
	}
    },
    async mounted() {
	this.currentMap = await this.getCurrentMap()
	if (!this.currentMap || !this.currentMap.title)
	    this.$router.push("/Main")
	this.canvas.setup(this.currentMap.resolution, document.getElementById("map"))
	if (this.currentMap.objects) {
	    this.canvas.loadProject(this.currentMap.objects)
	} else {
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
	this.cursorTool.activate()
	/*window.onbeforeunload = () =>{
    return "";
  }*/
    },
    created() {
	this.canvas = new canvas()
	this.selection = new selection()
	this.cursorTool = new cursorTool(this.selection)
	window.addEventListener("resize", this.canvas.setDefaultSizes.bind(this.canvas));
	window.addEventListener("resize", this.canvas.resetCoords.bind(this.canvas));
    },
    watch: {
	/*   'activeLayer.children.length'(old, val) {
       if(val) {
         console.log(this.activeLayer.children)
         const filteredArr = this.activeLayer.children.filter(obj => (obj.name !== 'brushCursor' || obj.name !== 'pathCursor'));
         if(filteredArr.length>0) {
           const obj = filteredArr.reduce((prev, current) => prev.id > current.id ? prev : current);
           console.log(obj.data.type)
           if (obj && obj.data && obj.data.type && ['brush', 'path', 'stamp', 'text', 'shape'].includes(obj.data.type))
             this.canvas.changes++
         }
         this.saveStatus=this.canvas.changes>0?"Не сохранено":"Нет изменений"
       }
     },*/
    }
}
</script>
<style lang="sass" scoped>
@use "@/assets/styles/pages/MapCanvas"
</style>
