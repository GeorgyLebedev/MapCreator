import * as paper from "paper" ;
import store from "@/modules/store/store";
import Clicker from "@/modules/logic/clicker";
const clicker=new Clicker()

export default class shapeTool {
    constructor() {
        this.instance=new paper.Tool()
	Object.assign(this,store.state.shapeOptions)
	store.subscribe((mutation) => {
	    if (mutation.type.startsWith("shapeOptions/")){
		Object.assign(this, store.state.shapeOptions)
		this.set()
	    }
	    if(mutation.type=="setSelectedTool" && store.getters.getSelectedToolName=="shape"){
		this.initPoint=undefined
		this.set()
	    }
	})
    }
    set(){
	let exLine
	let center, radius
	let sides
	switch (this.shapeType) {
	    case "rectangle":
		this.instance.onMouseDown = (event) => {
		    if (!this.initPoint)
			this.initPoint = event.point
		    else {
			this.currentItem.data.type="shape"
			this.currentItem.clone()
			this.initPoint = undefined
		    }
		}
		this.instance.onMouseMove = (event) => {
		    if (this.currentItem)
			this.currentItem.remove()
		    if (this.initPoint) {
			this.currentItem = new paper.Path.Rectangle({
			    from: this.initPoint,
			    to: event.point,
			    strokeColor: this.strokeColor,
			    fillColor: this.fillColor,
			    strokeWidth: this.strokeWidth,
			    opacity: this.opacity,
			    rotation: this.rotation
			})
			this.currentItem.data.isBorder = this.isBorder
			this.currentItem.data.isFill = this.isFill
			store.commit("updateSelectedTool", this)
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
		    if (!this.initPoint)
			this.initPoint = event.point
		    else {
			center = new paper.Point(event.point)
			center.x = (event.point.x + this.initPoint.x) / 2
			center.y = (event.point.y + this.initPoint.y) / 2
			radius = Math.sqrt(Math.pow((this.initPoint.x - center.x), 2) + Math.pow((this.initPoint.y - center.y), 2))
			this.currentItem.data.type="shape"
			this.currentItem.clone()
			this.initPoint = undefined
		    }
		}
		this.instance.onMouseMove = (event) => {
		    if (this.currentItem)
			this.currentItem.remove()
		    if (this.initPoint) {
			center = new paper.Point(event.point)
			center.x = (event.point.x + this.initPoint.x) / 2
			center.y = (event.point.y + this.initPoint.y) / 2
			radius = Math.sqrt(Math.pow((this.initPoint.x - center.x), 2) + Math.pow((this.initPoint.y - center.y), 2))
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
			store.commit("updateSelectedTool", this)
		    }
		}
		break
	    case "circle":
		this.instance.onMouseDown = (event) => {
		    if (!this.initPoint)
			this.initPoint = event.point
		    else {
			this.currentItem.data.type="shape"
			this.currentItem.clone()
			this.initPoint = undefined
		    }
		}
		this.instance.onMouseMove = (event) => {
		    if (this.currentItem)
			this.currentItem.remove()
		    if (this.initPoint) {
			this.currentItem = new paper.Path.Ellipse({
			    point: this.initPoint,
			    size: new paper.Point(event.point.x - this.initPoint.x, event.point.y - this.initPoint.y),
			    strokeColor: this.strokeColor,
			    fillColor: this.fillColor,
			    strokeWidth: this.strokeWidth,
			    opacity: this.opacity,
			    rotation: this.rotation
			})
			this.currentItem.data.isBorder = this.isBorder
			this.currentItem.data.isFill = this.isFill
			store.commit("updateSelectedTool", this)
		    }
		}
		break
	    case "arbitrary":
		this.instance.onMouseMove = (event) => {
		    if (exLine)
			exLine.remove()
		    if (this.initPoint) {
			exLine = new paper.Path.Line({
			    from: this.initPoint,
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
			this.initPoint = undefined
			return
		    }
		    if (!this.initPoint) {
			this.currentItem = new paper.Path({
			    strokeWidth: this.strokeWidth,
			    strokeColor: this.strokeColor,
			    opacity: this.opacity,
			    strokeCap: "round",
			    rotation: this.rotation
			})
			this.currentItem.data.isBorder = this.isBorder
			this.currentItem.data.isFill = this.isFill
			this.initPoint = event.point
			this.currentItem.add(this.initPoint)
			store.commit("updateSelectedTool", this)
		    } else {
			this.initPoint = event.point
			this.currentItem.add(this.initPoint)
		    }
		}
		break
	}
	store.commit("updateSelectedTool", this)
    }
    activate(){
	this.instance.activate()
    }
}
