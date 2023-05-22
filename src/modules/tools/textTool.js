import * as paper from "paper" ;

export default class textTool {
    constructor() {
	this.instance = new paper.Tool()
	this.content = "Текст",
	this.fontFamily = "Cambria",
	this.fontSize = 50,
	this.justification = "left",
	this.fillColor = "#ffffff",
	this.strokeColor = "#000000",
	this.strokeWidth = 1,
	this.shadowColor = "#000000",
	this.shadowBlur = 1,
	this.shOffsetX = 0,
	this.shOffsetY = 0,
	this.opacity = 1,
	this.rotation = 0,
	this.isBorder = true,
	this.isFill = true,
	this.isShadow = false
	this.set()
    }
    set(options){
        if(options) Object.assign(this,options)
	this.instance.onMouseMove = (event) => {
	    if (this.currentItem)
		this.currentItem.remove()
	    this.currentItem = new paper.PointText({
		point: event.point,
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
		shadowOffset: this.isShadow ? new paper.Point(Number(this.shOffsetX), Number(this.shOffsetY)) : undefined,
	    })
	    this.currentItem.data = {
	        type: "text",
		isBorder: this.isBorder,
		isFill: this.isFill,
		isShadow: this.isShadow,
		shOffsetX: this.isShadow ? this.shOffsetX : 0,
		shOffsetY: this.isShadow ? this.shOffsetY : 0,
	    }
	}
	this.instance.onMouseDown = () => {
	    this.currentItem.clone()
	}
    }
    activate(){
	this.instance.activate()
    }
}
