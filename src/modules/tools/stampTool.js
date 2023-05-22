import * as paper from "paper" ;

export default class stampTool {
    constructor() {
        this.instance=new paper.Tool()
	this.size = 50
	this.opacity = 1
	this.rotation = 0
	this.revert = "none"
	this.currentSet = "firstSet"
	this.currentStamp = "stampEx.svg"
	this.currentStampPath = undefined
	this.stampSetArray = []
	this.set()
    }
    set(options){
        if(options) Object.assign(this,options)
	this.instance.onMouseMove = (event) => {
	    if (this.currentItem)
		this.currentItem.remove()
	    this.currentItem = new paper.Raster({
		source:  require('@/assets/Stamps/' + this.currentSet + '/' + this.currentStamp),
		position: event.point,
		size: this.size,
		opacity: this.opacity,
		rotation: this.rotation
	    })
	    this.currentItem.data.set = this.currentSet
	    this.currentItem.data.stamp = this.currentStamp
	    this.currentItem.data.type="stamp"
	}
	this.instance.onMouseDown = () => {
	    this.currentItem.clone()
	}
    }
    activate(){
	this.instance.activate()
    }
}
