<template>
    <Transition name="dropdown-show">
	<contextMenu v-if="showMenuFlag"/>
    </Transition>
    <cursor v-if="cursorVisible"/>
    <MapEditWindow v-if="showEditMapWin"/>
    <div class="main-container" @contextmenu.prevent>
	<TopMenu/>
	<ToolsPanel
		@toolChange="setTool"
	/>
	<BotMenu/>
	<div class="canvas-area" id="area">
	    <div id="canvasBox" :style="{cursor: cursorStyle}" @mousemove="cursorVisible?updateCursorPos($event):''"></div>
	</div>
    </div>
</template>
<script>
import TopMenu from "@/components/mapCanvas/TopMenu.vue"
import BotMenu from "@/components/mapCanvas/BotMenu";
import ToolsPanel from "@/components/mapCanvas/ToolsPanel";
import cursor from "@/components/mapCanvas/CursorCircle.vue";
import contextMenu from "@/components/mapCanvas/ContextMenu.vue";
import Canvas from "@/modules/logic/canvas";
import store from "@/modules/store/store";
import brushTool from "@/modules/tools/brushTool";
import stampTool from "@/modules/tools/stampTool";
import pathTool from "@/modules/tools/pathTool";
import cursorTool from "@/modules/tools/cursorTool";
import shapeTool from "@/modules/tools/shapeTool";
import textTool from "@/modules/tools/textTool";
import {mapGetters} from 'vuex'
import clean from "@/modules/services/canvasCleaner";

export default {
    name: "MapCanvas",
    components: {
	cursor,
	contextMenu,
	TopMenu,
	BotMenu,
	ToolsPanel,
    },
    data() {
	return {
	    currentMap: {
		title: "",
		description: ""
	    },
	    canvas: null,
	    showCursor: false,
	    cursorTool: null,
	    brushTool: null,
	    stampTool: null,
	    shapeTool: null,
	    pathTool: null,
	    textTool: null
	}
    },
    computed: {
	...mapGetters({
	    getContextMenuPos: 'cursorOptions/getContextMenuPos',
	    showMenuFlag: 'cursorOptions/getMenuFlag',
	    showEditMapWin: 'modalFlags/showEditMapWin',
	    showImgLoadWin: 'modalFlags/showImgLoadWin',
	    cursorVisible: 'cursorState/getCursorVisibility'
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
	cursorStyle() {
	    return store.getters['cursorState/getCursorStyle']
	},
	tool() {
	    return store.getters['getSelectedTool']
	}
    },
    methods: {
	updateCursorPos(event) {
	    store.commit('cursorState/setCursorPosition', {top: event.pageY, left: event.pageX})
	},
	setTool(tool) {
	    clean(this.canvas)
	    switch (tool) {
		case "cursor":
		    this.cursorTool.set()
		    break;
		case "brush":
		    this.brushTool.set()
		    break
		case "stamp":
		    this.stampTool.set()
		    break
		case "shape":
		    this.shapeTool.set()
		    break
		case "path":
		    this.pathTool.set()
		    break
		case "text":
		    this.textTool.set()
		    break
	    }
	},

    },
    async mounted() {
	this.canvas = new Canvas()
	this.canvas.setup("1200x780", "canvasBox")
	this.brushTool = new brushTool(this.canvas)
	this.stampTool = new stampTool(this.canvas)
	this.cursorTool = new cursorTool(this.canvas)
	this.pathTool = new pathTool(this.canvas)
	this.shapeTool = new shapeTool(this.canvas)
	this.textTool = new textTool(this.canvas)
	this.cursorTool.set()
	/*  this.currentMap = await this.getCurrentMap()
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
    this.$store.commit("setSelectedTool",this.cursorTool)*/
	/*window.onbeforeunload = () =>{
    return "";
  }*/
    },
    created() {
    },
    watch: {
	tool(val) {
	    this.setTool(val)
	}
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
