import * as paper from "paper" ;
import Clicker from "@/modules/logic/clicker";
const clicker=new Clicker()
export default class shapeTool {
    constructor() {
        this.instance=new paper.Tool()
	this.shapeType= "rectangle"
	this.strokeWidth= 1
	this.strokeColor= "#000000"
	this.fillColor= "#ffffff"
	this.borderRadius= 0
	this.opacity= 1
	this.rotation= 0
	this.sides= 5,
	this.isArbitrary= false,
	this.isFill= true,
	this.isBorder= true
	this.set()
    }
    set(options){
        if(options) Object.assign(this,options)
	let exLine
	let center, radius
	let sides
	let initPoint = undefined
	switch (this.shapeType) {
	    case "rectangle":
		this.instance.onMouseDown = (event) => {
		    if (!initPoint)
			initPoint = event.point
		    else {
			this.currentItem.data.type="shape"
			this.currentItem.clone()
			initPoint = undefined
		    }
		}
		this.instance.onMouseMove = (event) => {
		    if (this.currentItem)
			this.currentItem.remove()
		    if (initPoint) {
			this.currentItem = new paper.Path.Rectangle({
			    from: initPoint,
			    to: event.point,
			    strokeColor: this.strokeColor,
			    fillColor: this.fillColor,
			    strokeWidth: this.strokeWidth,
			    opacity: this.opacity,
			    rotation: this.rotation
			})
			this.currentItem.data.isBorder = this.isBorder
			this.currentItem.data.isFill = this.isFill
		    }
		}
		break
	    case "triangle":
	    case "polygon":
		if (this.shapeType == "triangle")
		    sides = 3
		else
		    sides = this.sides
		this.instance.onMouseDown = (event) => {
		    if (!initPoint)
			initPoint = event.point
		    else {
			center = new paper.Point(event.point)
			center.x = (event.point.x + initPoint.x) / 2
			center.y = (event.point.y + initPoint.y) / 2
			radius = Math.sqrt(Math.pow((initPoint.x - center.x), 2) + Math.pow((initPoint.y - center.y), 2))
			this.currentItem.data.type="shape"
			this.currentItem.clone()
			initPoint = undefined
		    }
		}
		this.instance.onMouseMove = (event) => {
		    if (this.currentItem)
			this.currentItem.remove()
		    if (initPoint) {
			center = new paper.Point(event.point)
			center.x = (event.point.x + initPoint.x) / 2
			center.y = (event.point.y + initPoint.y) / 2
			radius = Math.sqrt(Math.pow((initPoint.x - center.x), 2) + Math.pow((initPoint.y - center.y), 2))
			this.currentItem = new paper.Path.RegularPolygon({
			    center: center,
			    sides: sides,
			    radius: radius,
			    strokeColor: this.strokeColor,
			    fillColor: this.fillColor,
			    strokeWidth: this.strokeWidth,
			    opacity: this.opacity,
			    rotation: this.rotation
			})
			this.currentItem.data.isBorder = this.isBorder
			this.currentItem.data.isFill = this.isFill
		    }
		}
		break
	    case "circle":
		this.instance.onMouseDown = (event) => {
		    if (!initPoint)
			initPoint = event.point
		    else {
			this.currentItem.data.type="shape"
			this.currentItem.clone()
			initPoint = undefined
		    }
		}
		this.instance.onMouseMove = (event) => {
		    if (this.currentItem)
			this.currentItem.remove()
		    if (initPoint) {
			this.currentItem = new paper.Path.Ellipse({
			    point: initPoint,
			    size: new paper.Point(event.point.x - initPoint.x, event.point.y - initPoint.y),
			    strokeColor: this.strokeColor,
			    fillColor: this.fillColor,
			    strokeWidth: this.strokeWidth,
			    opacity: this.opacity,
			    rotation: this.rotation
			})
			this.currentItem.data.isBorder = this.isBorder
			this.currentItem.data.isFill = this.isFill
		    }
		}
		break
	    case "arbitrary":
		this.instance.onMouseMove = (event) => {
		    if (exLine)
			exLine.remove()
		    if (initPoint) {
			exLine = new paper.Path.Line({
			    from: initPoint,
			    to: event.point,
			    strokeWidth: this.strokeWidth,
			    strokeColor: this.strokeColor,
			    opacity: this.opacity,
			    strokeCap: "round"
			})
		    }
		}
		this.instance.onMouseDown = (event) => {
		    if(clicker.doubleClick()){
			this.currentItem.closed = true
			this.currentItem.fillColor = this.fillColor
			this.currentItem.data.type="shape"
			this.currentItem.clone()
			this.currentItem.remove()
			initPoint = undefined
			return
		    }
		    if (!initPoint) {
			this.currentItem = new paper.Path({
			    strokeWidth: this.strokeWidth,
			    strokeColor: this.strokeColor,
			    opacity: this.opacity,
			    strokeCap: "round",
			    rotation: this.rotation
			})
			this.currentItem.data.isBorder = this.isBorder
			this.currentItem.data.isFill = this.isFill
			initPoint = event.point
			this.currentItem.add(initPoint)
		    } else {
			initPoint = event.point
			this.currentItem.add(initPoint)
		    }
		}
		break
	}
    }
    activate(){
	this.instance.activate()
    }
}
