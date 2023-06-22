import * as paper from "paper" ;
import store from "@/modules/store/store";

export default class textTool {
    constructor() {
	this.instance = new paper.Tool()
	Object.assign(this,store.state.textOptions)
	store.subscribe((mutation) => {
	    if (mutation.type.startsWith("textOptions/")){
		Object.assign(this, store.state.textOptions)
		this.set()
	    }
	    if(mutation.type=="setSelectedTool" && store.getters.getSelectedToolName=="text"){
		this.set()
	    }
	})
    }
    set(){
	this.instance.onMouseMove = (event) => {
	    if (this.currentItem)
		this.currentItem.remove()
	    this.currentItem = new paper.PointText({
		point: store.getters.getCenterFlag?paper.view.center:event.point,
		content: this.content,
		fillColor: this.isFill ? this.fillColor : new paper.Color(0, 0, 0, 1e-6),
		fontFamily: this.fontFamily,
		fontSize: this.fontSize,
		justification: this.justification,
		opacity: this.opacity,
		rotation: this.rotation,
		strokeColor: this.isBorder ? this.strokeColor : "transparent",
		strokeWidth: this.isBorder ? this.strokeWidth : 0,
		shadowColor: this.isShadow ? this.shadowColor : "transparent",
		shadowBlur: this.isShadow ? this.shadowBlur : 0,
		shadowOffset: this.isShadow ? this.shadowOffset: undefined,
	    })
	    this.currentItem.data = {
	        type: "text",
		isBorder: this.isBorder,
		isFill: this.isFill,
		isShadow: this.isShadow,
	    }
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
