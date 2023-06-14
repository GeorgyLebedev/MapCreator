import * as paper from "paper" ;
import store from "@/modules/store/store";
export default class cursorTool {
    constructor(selection) {
        this.instance=new paper.Tool()
	this.selection=selection
	this.showContextMenu = false
	this.contextMenuPos = {}
	Object.assign(this,store.state.cursorOptions)
	store.subscribe((mutation) => {
	    if (mutation.type.startsWith("cursorOptions/")){
		Object.assign(this,store.state.cursorOptions)
		this.set()
	    }})
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
    updateItem(item, options) {
	switch (item.data.type) {
	    case "text":
		item.shadowColor = options.isShadow ? options.shadowColor : "transparent"
		item.shadowBlur = options.isShadow ? options.shadowBlur : 0
		item.shadowOffset = options.isShadow ? new paper.Point(Number(options.shOffsetX), Number(options.shOffsetY)) : undefined
		item.data.shOffsetX = options.isShadow ? options.shOffsetX : 0
		item.data.shOffsetY = options.isShadow ? options.shOffsetY : 0
		item.strokeColor = options.isBorder ? options.strokeColor : "transparent"
		item.fillColor = options.isFill ? options.fillColor : new paper.Color(0, 0, 0, 1e-6)
		item.strokeWidth = options.isBorder ? options.strokeWidth : 0
		item.data.isBorder = options.isBorder ? options.isBorder : false
		item.data.isFill = options.isFill ? options.isFill : false
		item.data.isShadow = options.isShadow ? options.isShadow : false
		break
	    case "shape":
		item.opacity = options.opacity
		item.strokeColor = options.isBorder ? options.strokeColor : "transparent"
		item.fillColor = options.isFill ? options.fillColor : "transparent"
		item.strokeWidth = options.isBorder ? options.strokeWidth : 0
		item.data.isBorder = options.isBorder ? options.isBorder : false
		item.data.isFill = options.isFill ? options.isFill : false
		item.data.isShadow = options.isShadow ? options.isShadow : false
		item.rotation = options.rotation
		break
	    case "stamp":
		item.source= item.data.stamp
		item.size = options.size
	}
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
    }
}
