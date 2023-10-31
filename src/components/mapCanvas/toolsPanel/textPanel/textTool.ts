import * as paper from "paper" ;
import store from "@/modules/store/store";
import clean from "@/modules/services/canvasCleaner";
import iText from "@/components/mapCanvas/toolsPanel/textPanel/iText";

export default class textTool{
    options: iText
    instance: paper.Tool

    constructor() {
        this.instance = new paper.Tool()
        this.options={
        content: store.getters['textOptions/getContent'],
        fontFamily: store.getters['textOptions/getFontFamily'],
        fontSize: store.getters['textOptions/getFontSize'],
        justification: store.getters['textOptions/getJustification'],
        fillColor: store.getters['textOptions/getFillColor'],
        fillEnabled: store.getters['textOptions/getFillEnabled'],
        strokeColor: store.getters['textOptions/getStrokeColor'],
        strokeEnabled: store.getters['textOptions/getStrokeEnabled'],
        strokeWidth: store.getters['textOptions/getStrokeWidth'],
        shadowColor: store.getters['textOptions/getShadowColor'],
        shadowEnabled: store.getters['textOptions/getShadowEnabled'],
        shadowBlur: store.getters['textOptions/getShadowBlur'],
        shadowOffsetX: store.getters['textOptions/getShadowOffsetX'],
        shadowOffsetY: store.getters['textOptions/getShadowOffsetY'],
        opacity: store.getters['textOptions/getOpacity'],
        rotation: store.getters['textOptions/getRotation']
        }
        store.subscribe((mutation) => {
            if (mutation.type.startsWith("textOptions/") && !store.getters['selection/getSelectedItem']) {
                Object.assign(this.options, store.getters['textOptions/getTextOptions'])
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
                content: this.options.content,
                fillColor: this.options.fillEnabled ? this.options.fillColor : new paper.Color(0, 0, 0, 1e-6),
                fontFamily: this.options.fontFamily,
                fontSize: this.options.fontSize,
                justification: this.options.justification,
                opacity: this.options.opacity,
                rotation: this.options.rotation,
                strokeColor: this.options.strokeEnabled ? this.options.strokeColor : "transparent",
                strokeWidth: this.options.strokeEnabled ? this.options.strokeWidth+0.01*this.options.fontSize/2 : 0,
                shadowColor: this.options.shadowEnabled ? this.options.shadowColor : "transparent",
                shadowBlur: this.options.shadowEnabled ? this.options.shadowBlur : 0,
                shadowOffset: this.options.shadowEnabled ? new paper.Point({x:this.options.shadowOffsetX,y:this.options.shadowOffsetY}) : undefined,
                name:"currentItem"
            })
            text.data = {
                type: "text",
                options: {...this.options},
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
