import store from "@/modules/store/store";
import Canvas from "@/modules/logic/canvas";
import Konva from "konva";
import {Vector2d} from "konva/lib/types";
import clean from "@/modules/services/canvasCleaner";

export default class stampTool {
    size: number
    opacity: number
    rotation: number
    currentKit: string
    currentStamp: string
    canvas: Canvas

    constructor(canvas: Canvas) {
        this.size = store.getters['stampOptions/getStampSize']
        this.opacity = store.getters['stampOptions/getStampOpacity']
        this.rotation = store.getters['stampOptions/getStampRotation']
        this.currentKit = store.getters['stampOptions/getCurrentKit']
        this.currentStamp = store.getters['stampOptions/getCurrentStamp']
        this.canvas = canvas
        store.subscribe((mutation) => {
            if (mutation.type.startsWith("stampOptions/") && !store.getters['selectionOptions/getSelectedObject']){
                Object.assign(this, store.getters['stampOptions/getStampOptions'])
                this.canvas.activeLayer.draw()
                this.set()
            }
        })
    }

    set() {
        clean(this.canvas)
        let stamp:Konva.Image|null
        const svg:HTMLImageElement=new Image()
        svg.src=this.currentStamp
        store.commit('cursorState/setCursorStyle', 'none')
        this.canvas.stage?.on('mousemove touchmove',()=>{
            const point=this.canvas.stage?.getPointerPosition() as Vector2d
            if(stamp) stamp.destroy()
            stamp=new Konva.Image({
                x:point.x,
                y:point.y,
                image:svg,
                width:this.size,
                height: svg.height/(svg.width/this.size),
                opacity: this.opacity,
                rotation: this.rotation,
                name:"activeNode"
            })
            this.canvas.activeLayer.add(stamp)
        })
        this.canvas.stage?.on('mousedown touchdown',()=>{
            if(!stamp) return
            stamp.name("")
            this.canvas.activeLayer.add(stamp.clone())
        })
    }
}
