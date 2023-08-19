import * as paper from "paper" ;
import store from "@/modules/store/store";
import clean from "@/modules/services/canvasCleaner";
export default class brushTool {
	brushType: string
	color: string
	opacity: number
	size: number
	instance: paper.Tool
	constructor() {
		this.instance=new paper.Tool()
		this.brushType=store.getters['brushOptions/getBrushType']
		this.color=store.getters['brushOptions/getBrushColor']
		this.opacity=store.getters['brushOptions/getBrushOpacity']
		this.size=store.getters['brushOptions/getBrushSize']
		store.subscribe((mutation) => {
			if (mutation.type.startsWith("brushOptions/")){
				Object.assign(this, store.getters['brushOptions/getBrushOptions'])
				this.set()
			}
		})
	}
    set(){
		clean()
		store.commit('cursorState/setCursorStyle', 'none')
		store.commit('cursorState/setCursorSize', this.size*2)
		store.commit('cursorState/setCursorVisibility', true)
	let path:paper.Path
	this.instance.onMouseDown = (event:paper.MouseEvent) => {
	    path = new paper.Path();
	    path.strokeWidth = this.size * 2
	    path.strokeCap = "round"
		path.strokeJoin="round"
	    path.strokeColor = new paper.Color(this.color)
	    path.opacity = this.opacity
	    path.add(event.point);
	    path.data.type="brush"
	}
	this.instance.onMouseDrag =  (event:paper.MouseEvent) => {
	    path.add(event.point);
	    path.smooth();
	}
	this.instance.onMouseUp = (event:paper.MouseEvent) => {
	    path.add(event.point);
	    path.smooth();
	    store.commit('addChanges')
	}
	store.commit("updateSelectedTool", this)
    }
    activate(){
        this.set()
        this.instance.activate()
    }
}
