import * as paper from "paper" ;
export default class brushTool {
    constructor() {
        this.instance=new paper.Tool()
        this.size=1
	this.opacity=1
	this.color= ""
	this.cursor=null
    }
    set(options){
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
        if(options) Object.assign(this, options)
	let path
	this.cursor.radius = this.size
	this.instance.onMouseMove = (event) => {
	    this.cursor.position = event.point;
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
    }
    activate(){
        this.instance.activate()
    }
}
