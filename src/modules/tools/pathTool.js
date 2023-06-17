import * as paper from "paper" ;
import Clicker from "@/modules/logic/clicker";
import store from "@/modules/store/store";
const clicker=new Clicker()
export default class pathTool {
    constructor() {
        this.instance=new paper.Tool()
	Object.assign(this,store.state.pathOptions)
	store.subscribe((mutation) => {
	    if (mutation.type.startsWith("pathOptions/")){
		Object.assign(this, store.state.pathOptions)
		this.set()
	    }})
	if(store.getters.getSelectedToolName=="path")
	    this.set()
    }
    set() {
        if(this.cursor) this.cursor.remove()
	this.cursor= new paper.Shape.Circle({
	    center: [0,0],
	    radius:1,
	    name:"pathCursor",
	    fillColor: "transparent",
	    strokeColor: "white",
	    strokeWidth: 2,
	    blendMode: "difference",
	})
	let initPoint = undefined
	let vector, firstSegment, lastSegment
	let segments = []
	this.cursor.radius = this.size
	switch (this.pathType) {
	    case "line":
		this.instance.onMouseMove = (event) => {
		    this.cursor.position=store.getters.getCenterFlag?paper.view.center:event.point
		    if (this.currentItem)
			this.currentItem.remove()
		    if (initPoint) {
			this.currentItem = new paper.Path.Line({
			    from: initPoint,
			    to: event.point,
			    strokeWidth: this.size*2,
			    strokeCap: this.roundCap ? "round" : "square",
			    strokeColor: this.color,
			    opacity: this.opacity
			})
			this.currentItem.data.type="path"
			if (this.style === "dashed")
			    this.currentItem.dashArray = this.dashArray.map((x) => (x * this.size))
			else if (this.style === "dotted")
			    this.currentItem.dashArray = this.dotArray.map((x) => (x * this.size))
			else this.currentItem.dashArray = null
			this.currentItem.insertBelow(this.cursor)
			store.commit("updateSelectedTool", this)
		    }
		}
		this.instance.onMouseDown = (event) => {
		    if (!initPoint)
			initPoint = event.point
		    else {
			this.currentItem.clone()
			initPoint = undefined
		    }
		}
		break
	    case "poly":
		this.instance.onMouseMove = (event) => {
		    this.cursor.position=store.getters.getCenterFlag?paper.view.center:event.point
		    if (this.currentItem)
			this.currentItem.remove()
		    if (initPoint) {
			lastSegment = new paper.Segment(
			    event.point,
			    null,
			    null
			)
			this.currentItem = new paper.Path({
			    segments: segments.concat(lastSegment),
			    strokeWidth: this.size*2,
			    strokeJoin: "round",
			    strokeCap: this.roundCap ? "round" : "square",
			    strokeColor: this.color,
			    opacity: this.opacity
			})
			if (this.style == "dashed")
			    this.currentItem.dashArray = this.dashArray.map((x) => (x * this.size))
			else if (this.style == "dotted")
			    this.currentItem.dashArray = this.dotArray.map((x) => (x * this.size))
			else this.currentItem.dashArray = null
			this.currentItem.insertBelow(this.cursor)
			this.currentItem.data.type="path"
			store.commit("updateSelectedTool", this)
		    }
		}
		this.instance.onMouseDown = (event) => {
		    if(clicker.doubleClick()) {
			initPoint=undefined
			this.currentItem.clone()
			this.currentItem.remove()
			return;
		    }
		    if (!initPoint) {
			segments = []
		    }
		    firstSegment = new paper.Segment(
			event.point,
			null,
			null
		    )
		    segments.push(firstSegment)
		    initPoint = event.point
		}
		break
	    case "curve":
		this.instance.onMouseMove = (event) => {
		    let hIn, hOut, firstVector, angle
		    this.cursor.position=store.getters.getCenterFlag?paper.view.center:event.point
		    if (this.currentItem)
			this.currentItem.remove()
		    if (initPoint) {
			if (segments.length > 1) {
			    vector = new paper.Point({
				x: event.point.x - firstSegment.point.x,
				y: event.point.y - firstSegment.point.y
			    });
			    firstVector = new paper.Point({
				x: segments[segments.length - 1].point.x - segments[segments.length - 2].point.x,
				y: segments[segments.length - 1].point.y - segments[segments.length - 2].point.y
			    });
			    angle = vector.getDirectedAngle(firstVector) > 0 ?
				180 - vector.getDirectedAngle(firstVector) :
				-180 + Math.abs(vector.getDirectedAngle(firstVector))
			    hIn = vector.rotate(180)
			    hOut = vector
			    hOut.length = hIn.length = vector.length * 0.3
			    if (angle > 0) {
				hIn.angle = firstVector.angle - (90 - angle / 2) - 180
				hOut.angle = hIn.angle + 180
			    } else if (angle < 0) {
				hIn.angle = firstVector.angle - (-90 - angle / 2) - 180
				hOut.angle = hIn.angle + 180
			    } else {
				hIn.angle = firstVector.angle - angle / 2 - 180
				hOut.angle = vector.angle - (180 - (hIn.getDirectedAngle(firstVector)))
			    }
			    hIn.length = Math.abs(segments[segments.length - 1].point.getDistance(segments[segments.length - 2].point)) * 0.2 + vector.length * 0.2
			    if (Math.abs(angle) / 40 < 1) {
				hIn.length *= (Math.abs(angle) / 40)
				hOut.length *= (Math.abs(angle) / 40)
			    }
			    segments[segments.length - 1].handleIn = hIn
			    segments[segments.length - 1].handleOut = hOut
			}
			/*console.log('chIn:'+hIn.angle)
			console.log('fv:'+firstVector.angle)
			console.log("hIn:"+(hIn.getDirectedAngle(firstVector)))
			console.log("hOut:"+(hOut.getDirectedAngle(firstVector)))
			console.log("hIn-hOut:"+hIn.getDirectedAngle(hOut))
			console.log("fV-vector:"+angle)*/
			lastSegment = new paper.Segment(
			    event.point,
			    null,
			    null
			)
			this.currentItem = new paper.Path({
			    segments: segments.concat(lastSegment),
			    strokeWidth: this.size*2,
			    strokeJoin: "round",
			    strokeCap: this.roundCap ? "round" : "square",
			    strokeColor: this.color,
			    opacity: this.opacity
			})
			if (this.style == "dashed")
			    this.currentItem.dashArray = this.dashArray.map((x) => (x * this.size))
			else if (this.style == "dotted")
			    this.currentItem.dashArray = this.dotArray.map((x) => (x * this.size))
			else this.currentItem.dashArray = null
			this.currentItem.insertBelow(this.cursor)
			this.currentItem.data.type="path"
			store.commit("updateSelectedTool", this)
		    }
		}
		this.instance.onMouseDown = (event) => {
		    if(clicker.doubleClick()){
			initPoint=undefined
			this.currentItem.clone()
			this.currentItem.remove()
			return;
		    }
		    if (!initPoint) {
			segments = []
		    }
		    firstSegment = new paper.Segment(
			event.point,
			null,
			null
		    )
		    segments.push(firstSegment)
		    initPoint = event.point
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
