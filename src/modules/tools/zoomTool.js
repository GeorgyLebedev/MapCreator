import * as paper from "paper" ;
import {zoom} from "../logic/zoom"
export default class zoomTool {
    constructor() {
        this.instance=new paper.Tool()
	this.canvas=null,
	this.set()
    }
    set(canvas){
        this.canvas=canvas
	let drag = false
	let isZoom = false
	let newX, newY
	this.instance.onMouseUp = (event) => {
	    let mode
	    if (event.event.button == 0) {
		this.canvas.styleCursor = "zoom-in"
		mode = "+"
	    }
	    if (event.event.button == 2) {
		this.canvas.styleCursor = "zoom-out"
		mode = "-"
	    }
	    drag = false
	    if (!isZoom) return
	    zoom(event.event, 0.5, mode,canvas)
	}
	this.instance.onMouseMove = (event) => {
	    isZoom = false
	    if (!drag) return
	    newX=canvas.offsetLeft + event.event.movementX
	    newY=canvas.offsetTop + event.event.movementY
	    canvas.ref.style.transform = "translate(" + newX + "px," + newY + "px)"
	    canvas.offsetLeft = newX
	    canvas.offsetTop = newY
	}
	this.instance.onMouseDown = () => {
	    isZoom = true
	    drag = true
	    this.canvas.styleCursor = "move"
	}
    }
    activate(){
	this.instance.activate()
    }
}
