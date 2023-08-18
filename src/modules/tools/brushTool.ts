import Canvas from "@/modules/logic/canvas";
import clean from "@/modules/services/canvasCleaner";
import store from "@/modules/store/store";
import Konva from "konva";
import {Vector2d} from "konva/lib/types";
export default class brushTool {
	brushType: string
	color: string
	opacity: number
	size: number
	canvas:Canvas
	constructor(canvas:Canvas) {
		this.brushType=store.getters['brushOptions/getBrushType']
		this.color=store.getters['brushOptions/getBrushColor']
		this.opacity=store.getters['brushOptions/getBrushOpacity']
		this.size=store.getters['brushOptions/getBrushSize']
		this.canvas=canvas
        store.subscribe((mutation) => {
            if (mutation.type.startsWith("brushOptions/")){
            Object.assign(this, store.getters['brushOptions/getBrushOptions'])
            this.set()
            }
        })
	}

	set() {
		clean(this.canvas)
		store.commit('cursorState/setCursorStyle', 'none')
		store.commit('cursorState/setCursorSize', this.size)
		store.commit('cursorState/setCursorVisibility', true)
		let isDragging:boolean=false
		let path:Konva.Line|null=null
		this.canvas.stage?.on('mousedown touchstart',()=>{
			isDragging=true
			path=new Konva.Line({
				points:[],
				stroke:this.color,
				opacity:this.opacity,
				lineCap: 'round',
				lineJoin: 'round',
				strokeWidth:this.size,
				tension:0.5,
				data: {type: "brush"}
			})
			this.canvas.activeLayer?.add(path)
		})
		this.canvas.stage?.on('mouseup touchend',()=>{
			isDragging=false
			path=null
		})
		this.canvas.stage?.on('mousemove touchmove',()=>{
			if(isDragging) {
				const point = this.canvas.stage?.getPointerPosition() as Vector2d
				path?.points(path?.points().concat([point.x, point.y]))
			}
		})
	}
}
