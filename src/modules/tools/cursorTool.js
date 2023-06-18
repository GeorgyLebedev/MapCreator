import * as paper from "paper" ;
import store from "@/modules/store/store";
export default class cursorTool {
    constructor(selection) {
        this.instance=new paper.Tool()
	this.selection=selection
	Object.assign(this,store.state.cursorOptions)
	store.subscribe((mutation) => {
	    if (mutation.type.startsWith("cursorOptions/")){
		Object.assign(this,store.state.cursorOptions)
		this.set()
	    if (mutation.type=="setSelectedTool") {
	        this.contextMenuVisible(false)
		store.commit("cursorOptions/updateCursorOptions", this)
	    }
	    }})
	if(store.getters.getSelectedToolName=="cursor")
	    this.set()
    }
    set(){
	this.instance.onMouseDown = (event) => {
	    if (event.event.which == 1 && this.showContextMenu) this.contextMenuVisible(false)
	    let obj = event.item //получаем объект при клике
	    if (this.selection.selectedObject && (obj.id == this.selection.selectedObject.id) && (event.event.which == 3))
		this.contextMenuVisible(true, event.event)
	    else if (this.showContextMenu)
		this.contextMenuVisible(false)
	    if (obj && this.selection.selectedObject && obj.id == this.selection.selectionGroup.id) return
	    if (this.selection.selectedObject && obj != this.selection.selectedObject)
		this.selection.remove()
	    if (!obj || obj.name=="backgroundRectangle") return //если объекта нет или он не принадлежит текущему слою
	   /* paper.project.activeLayer.children.indexOf(obj) == -1*/
	    if (obj && this.selectionTypes.indexOf(obj.data.type) == -1) return
	    if(!this.selection.selectedObject)
		this.selection.set(obj)
	    }
	this.instance.onKeyDown = (event) => {
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
	this.instance.activate()
    }
    copyItem(item=this.selection.selectedObject) {
        if(!item) return
	let newItem = item.clone()
	newItem.position.x += 20
	newItem.position.y += 20
	if (item.data.type)
	    newItem.data.type = item.data.type
	paper.project.activeLayer.addChild(newItem)
	this.selection.remove()
	this.selection.set(newItem)
    }
    removeItem(item=this.selection.selectedObject) {
	if(!item) return
        this.selection.remove()
	item.remove()
    }
    setToFront(item=this.selection.selectedObject) {
	if(!item) return
        this.selection.remove()
	item.bringToFront()
	this.selection.set(item)
    }
    setToBack(item=this.selection.selectedObject) {
	if(!item) return
        this.selection.remove()
	item.sendToBack()
	this.selection.set(item)
    }
    contextMenuVisible(flag, position = null) {
	this.showContextMenu = flag
	let windowX = document.documentElement.clientWidth
	let windowY = document.documentElement.clientHeight
	if (flag) {
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
	store.commit("cursorOptions/updateCursorOptions", this)
    }
}
