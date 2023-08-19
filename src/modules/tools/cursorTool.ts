import * as paper from "paper" ;
import store from "@/modules/store/store";
import selectionLogic from "@/modules/logic/selectionLogic";
import clean from "@/modules/services/canvasCleaner";
export default class cursorTool {
	selectionTypes: string[]
	contextMenuPos: {top?: number, bottom?: number, left?: number, right?: number}
	showContextMenu: boolean
	selected:any
	instance: paper.Tool
	selection: selectionLogic
    constructor(selection:selectionLogic) {
		this.selectionTypes=store.getters['cursorOptions/getSelectionTypes']
		this.contextMenuPos=store.getters['cursorOptions/getContextMenuPos']
		this.showContextMenu=store.getters['cursorOptions/getMenuFlag']
        this.instance=new paper.Tool()
	this.selection=selection
	store.subscribe((mutation) => {
	    if (mutation.type.startsWith("cursorOptions/")){
		Object.assign(this,store.getters['cursorOptions/getCursorOptions'])
		this.set()
	    }})
	if(store.getters.getSelectedToolName=="cursor")
	    this.set()
    }
    set(){
		clean()
		store.commit('cursorState/setCursorStyle', 'default')
	this.instance.onMouseDown = (event:any) => {
	    if (event.event.which == 1 && this.showContextMenu) this.contextMenuVisible(false)
	    const obj = event.item //получаем объект при клике
	    if (this.selection.selectedObject && (obj.id == this.selection.selectedObject.id) && (event.event.which == 3))
		this.contextMenuVisible(true, event.event)
	    else if (this.showContextMenu)
		this.contextMenuVisible(false)
	    if (obj && this.selection.selectedObject && obj.id == this.selection.selectionGroup.id) return
	    if (this.selection.selectedObject && obj != this.selection.selectedObject)
		this.selection.remove()
	    if (!obj || obj.name=="backgroundRectangle") return //если объекта нет или он не принадлежит текущему слою
	   /* paper.project.activeLayer.children.indexOf(obj) == -1*/
	    if (obj && this.selectionTypes.indexOf(obj?.data?.type) == -1) return
	    if(!this.selection.selectedObject)
		this.selection.set(obj)
	    }
	this.instance.onKeyDown = (event:paper.KeyEvent) => {
	    if (event.key == 'delete' && this.selection.selectedObject) {
		this.removeItem(this.selection.selectedObject)
	    }
	    if(event.key=='escape'&& this.selection.selectedObject){
		this.selection.remove()
	    }
	}
	store.commit("updateSelectedTool", this)
    }
    activate(){
		this.set()
	this.instance.activate()
    }
    copyItem(item=this.selection.selectedObject) {
        if(!item) return
	const newItem = item.clone()
	newItem.position.x += 20
	newItem.position.y += 20
	if (item.data.type)
	    newItem.data.type = item.data.type
	paper.project.activeLayer.addChild(newItem)
	this.selection.remove()
	this.selection.set(newItem)
	store.commit('addChanges')
    }
    removeItem(item=this.selection.selectedObject) {
	if(!item) return
        this.selection.remove()
	item.remove()
	store.commit('addChanges')
    }
    setToFront(item=this.selection.selectedObject) {
	if(!item) return
        this.selection.remove()
	item.bringToFront()
	this.selection.set(item)
	store.commit('addChanges')
    }
    setToBack(item=this.selection.selectedObject) {
	if(!item) return
        this.selection.remove()
	item.sendToBack()
	this.selection.set(item)
	store.commit('addChanges')
    }
    contextMenuVisible(flag:boolean, position:null|{clientX:number, clientY:number} = null) {
	this.showContextMenu = flag
	const windowX = document.documentElement.clientWidth
	const windowY = document.documentElement.clientHeight
	if (flag && position) {
	    this.contextMenuPos = {}
	    if ((windowX - position.clientX) < 300)
		this.contextMenuPos.right = windowX - position.clientX
	    else
		this.contextMenuPos.left = position.clientX
	    if ((windowY - position.clientY) < 300)
		this.contextMenuPos.bottom = windowY - position.clientY
	    else
		this.contextMenuPos.top = position.clientY
	}
    }
}
