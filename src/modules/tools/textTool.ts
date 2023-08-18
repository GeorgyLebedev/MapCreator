import clean from "@/modules/services/canvasCleaner";
import Konva from "konva";
import Canvas from "@/modules/logic/canvas";
import store from "@/modules/store/store";

export default class textTool {
	text: string
	fontFamily: string
	fontSize: number
	fontStyle: string
	textDecoration: string
	align: string
	fill: string
	fillEnabled: boolean
	stroke: string
	strokeEnabled: boolean
	strokeWidth: number
	shadowColor: string
	shadowEnabled: boolean
	shadowBlur: number
	shadowOffsetX: number
	shadowOffsetY: number
	opacity: number
	rotation: number
	canvas: Canvas
    constructor(canvas:Canvas) {
		this.text=store.getters['textOptions/getText']
		this.fontFamily=store.getters['textOptions/getFontFamily']
		this.fontSize=store.getters['textOptions/getFontSize']
		this.fontStyle=store.getters['textOptions/getFontStyle']
		this.textDecoration=store.getters['textOptions/getTextDecoration']
		this.align=store.getters['textOptions/getAlign']
		this.fill=store.getters['textOptions/getFillColor']
		this.fillEnabled=store.getters['textOptions/getFillEnabled']
		this.stroke=store.getters['textOptions/getStrokeColor']
		this.strokeEnabled=store.getters['textOptions/getStrokeEnabled']
		this.strokeWidth=store.getters['textOptions/getStrokeWidth']
		this.shadowColor=store.getters['textOptions/getShadowColor']
		this.shadowEnabled=store.getters['textOptions/getShadowEnabled']
		this.shadowBlur=store.getters['textOptions/getShadowBlur']
		this.shadowOffsetX=store.getters['textOptions/getShadowOffsetX']
		this.shadowOffsetY=store.getters['textOptions/getShadowOffsetY']
		this.opacity=store.getters['textOptions/getOpacity']
		this.rotation=store.getters['textOptions/getRotation']
		this.canvas=canvas
		store.subscribe((mutation) => {
			if (mutation.type.startsWith("textOptions/") && !store.getters['selectionOptions/getSelectedObject']){
				Object.assign(this, store.getters['textOptions/getTextOptions'])
				this.canvas.activeLayer.draw()
				this.set()
			}
		})
    }
 	set(){
		clean(this.canvas)
		store.commit('cursorState/setCursorStyle', 'none')
		let text:Konva.Text|null=null
		this.canvas.stage?.on('mousemove touchmove',()=>{
			if(this.text.length<=0) return
			if(text) text.destroy()
			text=new Konva.Text({
				x: this.canvas.stage?.getPointerPosition()?.x,
				y: this.canvas.stage?.getPointerPosition()?.y,
				text:this.text,
				fontFamily: this.fontFamily,
				fontSize: this.fontSize,
				fontStyle:this.fontStyle,
				textDecoration: this.textDecoration,
				align: this.align,
				fill: this.fill,
				fillEnabled:this.fillEnabled,
				stroke: this.stroke,
				strokeWidth: this.strokeWidth+0.01*this.fontSize/2,
				shadowColor: this.shadowColor,
				shadowEnabled:this.shadowEnabled,
				shadowBlur: this.shadowBlur,
				shadowOffsetX:this.shadowOffsetX,
				shadowOffsetY:this.shadowOffsetY,
				opacity:this.opacity,
				rotation:this.rotation,
				data:{type:"text"},
				name: "activeNode"
			})
			this.canvas.activeLayer.add(text)
		})
		this.canvas.stage?.on('mousedown touchdown',()=> {
			if(this.text.length<=0) return
			if(!text) return
			text.name("")
			this.canvas.activeLayer.add(text.clone())
		})
		}
}
