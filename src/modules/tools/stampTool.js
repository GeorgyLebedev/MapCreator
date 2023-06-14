import * as paper from "paper" ;
import store from "@/modules/store/store";

export default class stampTool {
    constructor() {
        this.instance=new paper.Tool()
	Object.assign(this,store.state.stampOptions)
	this.set()
	store.subscribe((mutation) => {
	    if (mutation.type.startsWith("stampOptions/")){
		Object.assign(this, store.state.stampOptions)
		this.set()
	    }})
    }
    set(){
	this.instance.onMouseMove = (event) => {
	    if (this.currentItem)
		this.currentItem.remove()
	    this.currentItem = new paper.Raster({
		source:  this.currentStamp,
		position: this.centerFlag?paper.view.center:event.point,
		size: this.size,
		opacity: this.opacity,
		rotation: this.rotation
	    })
	    this.currentItem.data.set = this.currentKit
	    this.currentItem.data.stamp = this.currentStamp
	    this.currentItem.data.type="stamp"
	}
	this.instance.onMouseDown = () => {
	    this.currentItem.clone()
	}
	store.commit("updateSelectedTool", this)
    }
    activate(){
	this.instance.activate()
    }
}
