import * as paper from "paper" ;
import store from "@/modules/store/store";
export default class stampTool {
    constructor() {
        this.instance=new paper.Tool()
	Object.assign(this,store.state.stampOptions)
	store.subscribe((mutation) => {
	    if (mutation.type.startsWith("stampOptions/")){
		Object.assign(this, store.state.stampOptions)
		this.set()
	    }})
	if(store.getters.getSelectedToolName=="stamp")
	    this.set()
    }
    set(){
	this.instance.onMouseMove = (event) => {
	    if (this.currentItem)
		this.currentItem.remove()
	    this.currentItem = new paper.Raster({
		source:  this.currentStamp,
		position: store.getters.getCenterFlag?paper.view.center:event.point,
		size: this.size,
		opacity: this.opacity,
		rotation: this.rotation
	    })
	    this.currentItem.data.currentKit = this.currentKit
	    this.currentItem.data.currentStamp = this.currentStamp
	    this.currentItem.data.type="stamp"
	    store.commit("updateSelectedTool", this)
	}
	this.instance.onMouseDown = () => {
	    this.currentItem.clone()
	    store.commit('addChanges')
	}
    }
    activate(){
	this.instance.activate()
    }
}
