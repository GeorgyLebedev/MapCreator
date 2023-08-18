import * as paper from "paper" ;
import store from "@/modules/store/store";
import {zoom} from "../logic/zoom"
export default class zoomTool {
    constructor(canvas) {
        this.instance=new paper.Tool()
	this.name="zoom"
	this.canvas=canvas,
	this.set()
    }
    set(){
	let drag = false
	let isZoom = false
	let newX, newY
	this.instance.onMouseUp = (event) => {
	    let mode
	    if (event.event.button == 0) {
		store.commit('cursorState/setCursorStyle', 'zoom-in')
		mode = "+"
	    }
	    if (event.event.button == 2) {
		store.commit('cursorState/setCursorStyle', 'zoom-out')
		mode = "-"
	    }
	    drag = false
	    if (!isZoom) return
	    zoom(event.event, 0.5, mode,this.canvas)
	}
	this.instance.onMouseMove = (event) => {
	    isZoom = false
	    if (!drag) return
	    newX=this.canvas.offsetLeft + event.event.movementX
	    newY=this.canvas.offsetTop + event.event.movementY
	    this.canvas.ref.style.transform = "translate(" + newX + "px," + newY + "px)"
	    this.canvas.offsetLeft = newX
	    this.canvas.offsetTop = newY
	}
	this.instance.onMouseDown = () => {
	    isZoom = true
	    drag = true
	    store.commit('cursorState/setCursorStyle', 'move')
	}
    }
    activate(){
	this.instance.activate()
    }
}
