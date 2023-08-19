import * as paper from "paper" ;
import store from "@/modules/store/store";
import clean from "@/modules/services/canvasCleaner";

export default class textTool {
    content: string
    fontFamily: string
    fontSize: number
    justification: string
    fillColor: string
    fillEnabled: boolean
    strokeColor: string
    strokeEnabled: boolean
    strokeWidth: number
    shadowColor: string
    shadowEnabled: boolean
    shadowBlur: number
    shadowOffsetX: number
    shadowOffsetY: number
    opacity: number
    rotation: number
    instance: paper.Tool

    constructor() {
        this.instance = new paper.Tool()
        this.content = store.getters['textOptions/getContent']
        this.fontFamily = store.getters['textOptions/getFontFamily']
        this.fontSize = store.getters['textOptions/getFontSize']
        this.justification = store.getters['textOptions/getJustification']
        this.fillColor = store.getters['textOptions/getFillColor']
        this.fillEnabled = store.getters['textOptions/getFillEnabled']
        this.strokeColor = store.getters['textOptions/getStrokeColor']
        this.strokeEnabled = store.getters['textOptions/getStrokeEnabled']
        this.strokeWidth = store.getters['textOptions/getStrokeWidth']
        this.shadowColor = store.getters['textOptions/getShadowColor']
        this.shadowEnabled = store.getters['textOptions/getShadowEnabled']
        this.shadowBlur = store.getters['textOptions/getShadowBlur']
        this.shadowOffsetX = store.getters['textOptions/getShadowOffsetX']
        this.shadowOffsetY = store.getters['textOptions/getShadowOffsetY']
        this.opacity = store.getters['textOptions/getOpacity']
        this.rotation = store.getters['textOptions/getRotation']
        store.subscribe((mutation) => {
            if (mutation.type.startsWith("textOptions/") && !store.getters['selectionOptions/getSelectedObject']) {
                Object.assign(this, store.getters['textOptions/getTextOptions'])
                this.set()
            }
        })
    }

    set() {
        clean()
        store.commit('cursorState/setCursorStyle', 'none')
        let text:paper.PointText
        this.instance.onMouseMove = (event:paper.ToolEvent) => {
            if (text)
                text.remove()
            text = new paper.PointText({
                point: store.getters.getCenterFlag ? paper.view.center : event.point,
                content: this.content,
                fillColor: this.fillEnabled ? this.fillColor : new paper.Color(0, 0, 0, 1e-6),
                fontFamily: this.fontFamily,
                fontSize: this.fontSize,
                justification: this.justification,
                opacity: this.opacity,
                rotation: this.rotation,
                strokeColor: this.strokeEnabled ? this.strokeColor : "transparent",
                strokeWidth: this.strokeEnabled ? this.strokeWidth+0.01*this.fontSize/2 : 0,
                shadowColor: this.shadowEnabled ? this.shadowColor : "transparent",
                shadowBlur: this.shadowEnabled ? this.shadowBlur : 0,
                shadowOffset: this.shadowEnabled ? new paper.Point({x:this.shadowOffsetX,y:this.shadowOffsetY}) : undefined,
                name:"currentItem"
            })
            text.data = {
                type: "text",
                strokeEnabled: this.strokeEnabled,
                fillEnabled: this.fillEnabled,
                shadowEnabled: this.shadowEnabled,
            }
            store.commit("updateSelectedTool", this)
        }
        this.instance.onMouseDown = () => {
            text.name=""
            text.clone()
            store.commit('addChanges')
        }

    }

    activate() {
        this.set()
        this.instance.activate()
    }
}
