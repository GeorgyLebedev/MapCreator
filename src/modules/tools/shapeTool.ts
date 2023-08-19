import * as paper from "paper" ;
import store from "@/modules/store/store";
import Clicker from "@/modules/logic/clicker";
import clean from "@/modules/services/canvasCleaner";
const clicker=new Clicker()

export default class shapeTool {
	shapeType: string
	strokeColor: string
	strokeWidth: number
	strokeEnabled: boolean
	fillColor: string
	fillEnabled: boolean
	opacity: number
	rotation: number
	sides: number
	instance:paper.Tool
    constructor() {
        this.instance=new paper.Tool()
		this.shapeType=store.getters['shapeOptions/getShapeType']
		this.strokeColor=store.getters['shapeOptions/getStrokeColor']
		this.strokeWidth=store.getters['shapeOptions/getStrokeWidth']
		this.strokeEnabled=store.getters['shapeOptions/getStrokeEnabled']
		this.fillColor=store.getters['shapeOptions/getFillColor']
		this.fillEnabled=store.getters['shapeOptions/getFillEnabled']
		this.opacity=store.getters['shapeOptions/getOpacity']
		this.rotation=store.getters['shapeOptions/getRotation']
		this.sides=store.getters['shapeOptions/getSides']
		store.subscribe((mutation) => {
			if (mutation.type.startsWith("shapeOptions/") && !store.getters['selectionOptions/getSelectedObject']){
				Object.assign(this, store.getters['shapeOptions/getShapeOptions'])
				this.set()
			}
		})
	}

    set(){
		clean()
		store.commit('cursorState/setCursorStyle', 'crosshair')
		store.commit('cursorState/setCursorVisibility', false)
	let exLine:paper.Path
	let initPoint:paper.Point|undefined
	let center, radius
	let sides:number
		let shape:paper.Path
	switch (this.shapeType) {
	    case "rectangle":
		this.instance.onMouseDown = (event:paper.ToolEvent) => {
		    if (!initPoint)
			initPoint = event.point
		    else {
			shape.data.type="shape"
				shape.name=""
			shape.clone()
			initPoint = undefined
			store.commit('addChanges')
		    }
		}
		this.instance.onMouseMove = (event:paper.ToolEvent) => {
		    if (shape)
			shape.remove()
		    if (initPoint) {
			shape = new paper.Path.Rectangle({
			    from: initPoint,
			    to: event.point,
			    strokeColor: this.strokeEnabled?this.strokeColor:'transparent',
			    fillColor: this.fillEnabled?this.fillColor:'transparent',
			    strokeWidth: this.strokeWidth,
			    opacity: this.opacity,
			    rotation: this.rotation,
				name:"currentItem"
			})
			shape.data.strokeEnabled = this.strokeEnabled
			shape.data.fillEnabled = this.fillEnabled
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
		this.instance.onMouseDown = (event:paper.ToolEvent) => {
		    if (!initPoint)
			initPoint = event.point
		    else {
			center = new paper.Point(event.point)
			center.x = (event.point.x + initPoint.x) / 2
			center.y = (event.point.y + initPoint.y) / 2
			radius = Math.sqrt(Math.pow((initPoint.x - center.x), 2) + Math.pow((initPoint.y - center.y), 2))
			shape.data.type="shape"
				shape.name=""
			shape.clone()
			initPoint = undefined
			store.commit('addChanges')
		    }
		}
		this.instance.onMouseMove = (event:paper.ToolEvent) => {
		    if (shape)
			shape.remove()
		    if (initPoint) {
			center = new paper.Point(event.point)
			center.x = (event.point.x + initPoint.x) / 2
			center.y = (event.point.y + initPoint.y) / 2
			radius = Math.sqrt(Math.pow((initPoint.x - center.x), 2) + Math.pow((initPoint.y - center.y), 2))
			shape = new paper.Path.RegularPolygon({
			    center: center,
			    sides: sides,
			    radius: radius,
			    strokeColor: this.strokeEnabled?this.strokeColor:'transparent',
			    fillColor:  this.fillEnabled?this.fillColor:'transparent',
			    strokeWidth: this.strokeWidth,
			    opacity: this.opacity,
			    rotation: this.rotation,
				name:"currentItem"
			})
			shape.data.strokeEnabled = this.strokeEnabled
			shape.data.fillEnabled = this.fillEnabled
			store.commit("updateSelectedTool", this)
		    }
		}
		break
	    case "circle":
		this.instance.onMouseDown = (event:paper.ToolEvent) => {
		    if (!initPoint)
			initPoint = event.point
		    else {
			shape.data.type="shape"
				shape.name=""
			shape.clone()
			initPoint = undefined
			store.commit('addChanges')
		    }
		}
		this.instance.onMouseMove = (event:paper.ToolEvent) => {
		    if (shape)
			shape.remove()
		    if (initPoint) {
			shape = new paper.Path.Ellipse({
			    point: initPoint,
			    size: new paper.Point(event.point.x - initPoint.x, event.point.y - initPoint.y),
			    strokeColor: this.strokeEnabled?this.strokeColor:'transparent',
			    fillColor:  this.fillEnabled?this.fillColor:'transparent',
			    strokeWidth: this.strokeWidth,
			    opacity: this.opacity,
			    rotation: this.rotation,
				name:"currentItem"
			})
			shape.data.strokeEnabled = this.strokeEnabled
			shape.data.fillEnabled = this.fillEnabled
			store.commit("updateSelectedTool", this)
		    }
		}
		break
	    case "arbitrary":
		this.instance.onMouseMove = (event:paper.ToolEvent) => {
		    if (exLine)
			exLine.remove()
		    if (initPoint) {
			exLine = new paper.Path.Line({
			    from: initPoint,
			    to: event.point,
			    strokeWidth: this.strokeWidth,
			    strokeColor: this.strokeColor,
			    opacity: this.opacity,
			    strokeCap: "square",
			})
		    }
		}
		this.instance.onMouseDown = (event:paper.ToolEvent) => {
		    if(clicker.doubleClick()){
			shape.closed = true
			shape.fillColor = this.fillEnabled?new paper.Color(this.fillColor):new paper.Color("transparent")
			shape.data.type="shape"
			shape.name=""
			shape.clone()
			shape.remove()
			initPoint = undefined
			store.commit('addChanges')
			return
		    }
		    if (!initPoint) {
			shape = new paper.Path({
			    strokeWidth: this.strokeWidth,
			    strokeColor: this.strokeEnabled?this.strokeColor:'transparent',
			    opacity: this.opacity,
			    strokeCap: "square",
			    rotation: this.rotation,
				name:"currentItem"
			})
			shape.data.strokeEnabled = this.strokeEnabled
			shape.data.fillEnabled = this.fillEnabled
			initPoint = event.point
			shape.add(initPoint)
			store.commit("updateSelectedTool", this)
		    } else {
			initPoint = event.point
			shape.add(initPoint)
		    }
		}
		break
	}
	store.commit("updateSelectedTool", this)
    }
    activate(){
		this.set()
	this.instance.activate()
    }
}
