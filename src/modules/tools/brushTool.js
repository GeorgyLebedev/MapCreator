import * as paper from "paper" ;
import store from "@/modules/store/store";
export default class brushTool {
    constructor() {
        this.instance=new paper.Tool()
	Object.assign(this, store.state.brushOptions)
	this.cursor=null
	store.subscribe((mutation) => {
	    if (mutation.type.startsWith("brushOptions/")){
		Object.assign(this, store.state.brushOptions)
		this.set()
	    }
	})
	if(store.getters.getSelectedToolName=="brush")
	    this.set()
    }
    set(){
	if(this.cursor) this.cursor.remove()
	this.cursor=new paper.Shape.Circle({
	    center: [0,0],
	    radius:1,
	    name:"brushCursor",
	    fillColor: "transparent",
	    strokeColor: "white",
	    strokeWidth: 2,
	    blendMode: "difference",
	})
	let path
	this.cursor.radius = this.size
	this.instance.onMouseMove = (event) => {
		this.cursor.position=store.getters.getCenterFlag?paper.view.center: event.point
	}
	this.instance.onMouseDown = (event) => {
	    path = new paper.Path();
	    path.insertBelow(this.cursor)
	    path.strokeWidth = this.size * 2
	    path.strokeCap = "round"
	    path.strokeColor = this.color;
	    path.opacity = this.opacity
	    path.add(event.point);
	    path.data.type="brush"
	}
	this.instance.onMouseDrag =  (event) => {
	    path.add(event.point);
	    path.smooth();
	    this.cursor.position = event.point;
	}
	this.instance.onMouseUp = (event) => {
	    path.add(event.point);
	    path.smooth();
	}
	store.commit("updateSelectedTool", this)
    }
    activate(){
        this.set()
        this.instance.activate()
    }
}
