import * as paper from "paper" ;
import store from "@/modules/store/store";
import Clicker from "@/modules/logic/clicker";
import clean from "@/modules/services/canvasCleaner";
import iShape from "@/components/mapCanvas/toolsPanel/shapePanel/iShape";

const clicker = new Clicker()

export default class shapeTool {
    options: iShape
    instance: paper.Tool

    constructor() {
        this.instance = new paper.Tool()
        this.options = {
            shapeType: store.getters['shapeOptions/getShapeType'],
            strokeColor: store.getters['shapeOptions/getStrokeColor'],
            strokeWidth: store.getters['shapeOptions/getStrokeWidth'],
            strokeEnabled: store.getters['shapeOptions/getStrokeEnabled'],
            fillColor: store.getters['shapeOptions/getFillColor'],
            fillEnabled: store.getters['shapeOptions/getFillEnabled'],
            opacity: store.getters['shapeOptions/getOpacity'],
            rotation: store.getters['shapeOptions/getRotation'],
            sides: store.getters['shapeOptions/getSides']
        }
        store.subscribe((mutation) => {
            if (mutation.type.startsWith("shapeOptions/") && !store.getters['selectionOptions/getSelectedItem']) {
                Object.assign(this.options, store.getters['shapeOptions/getShapeOptions'])
                this.set()
            }
        })
    }

    set() {
        clean()
        store.commit('cursorState/setCursorStyle', 'crosshair')
        store.commit('cursorState/setCursorVisibility', false)
        let exLine: paper.Path
        let initPoint: paper.Point | undefined
        let center, radius
        let sides: number
        let shape: paper.Path
        switch (this.options.shapeType) {
            case "rectangle":
                this.instance.onMouseDown = (event: paper.ToolEvent) => {
                    if (!initPoint)
                        initPoint = event.point
                    else {
                        shape.data.type = "shape"
                        shape.name = ""
                        shape.clone()
                        initPoint = undefined
                        store.commit('addChanges')
                    }
                }
                this.instance.onMouseMove = (event: paper.ToolEvent) => {
                    if (shape)
                        shape.remove()
                    if (initPoint) {
                        shape = new paper.Path.Rectangle({
                            from: initPoint,
                            to: event.point,
                            strokeColor: this.options.strokeEnabled ? this.options.strokeColor : 'transparent',
                            fillColor: this.options.fillEnabled ? this.options.fillColor : 'transparent',
                            strokeWidth: this.options.strokeWidth,
                            opacity: this.options.opacity,
                            rotation: this.options.rotation,
                            name: "currentItem"
                        })
                        shape.data.options = {...this.options}
                        store.commit("updateSelectedTool", this)
                    }
                }
                break
            case "triangle":
            case "polygon":
                if (this.options.shapeType == "triangle")
                    sides = 3
                else
                    sides = this.options.sides
                this.instance.onMouseDown = (event: paper.ToolEvent) => {
                    if (!initPoint)
                        initPoint = event.point
                    else {
                        center = new paper.Point(event.point)
                        center.x = (event.point.x + initPoint.x) / 2
                        center.y = (event.point.y + initPoint.y) / 2
                        radius = Math.sqrt(Math.pow((initPoint.x - center.x), 2) + Math.pow((initPoint.y - center.y), 2))
                        shape.data.type = "shape"
                        shape.name = ""
                        shape.clone()
                        initPoint = undefined
                        store.commit('addChanges')
                    }
                }
                this.instance.onMouseMove = (event: paper.ToolEvent) => {
                    if (shape)
                        shape.remove()
                    if (initPoint) {
                        center = new paper.Point(event.point)
                        center.x = (event.point.x + initPoint.x) / 2
                        center.y = (event.point.y + initPoint.y) / 2
                        radius = Math.sqrt(Math.pow((initPoint.x - center.x), 2) + Math.pow((initPoint.y - center.y), 2))
                        shape = new paper.Path.RegularPolygon({
                            center: center,
                            sides: sides,
                            radius: radius,
                            strokeColor: this.options.strokeEnabled ? this.options.strokeColor : 'transparent',
                            fillColor: this.options.fillEnabled ? this.options.fillColor : 'transparent',
                            strokeWidth: this.options.strokeWidth,
                            opacity: this.options.opacity,
                            rotation: this.options.rotation,
                            name: "currentItem"
                        })
                        shape.data.options = {...this.options}
                        store.commit("updateSelectedTool", this)
                    }
                }
                break
            case "circle":
                this.instance.onMouseDown = (event: paper.ToolEvent) => {
                    if (!initPoint)
                        initPoint = event.point
                    else {
                        shape.data.type = "shape"
                        shape.name = ""
                        shape.clone()
                        initPoint = undefined
                        store.commit('addChanges')
                    }
                }
                this.instance.onMouseMove = (event: paper.ToolEvent) => {
                    if (shape)
                        shape.remove()
                    if (initPoint) {
                        shape = new paper.Path.Ellipse({
                            point: initPoint,
                            size: new paper.Point(event.point.x - initPoint.x, event.point.y - initPoint.y),
                            strokeColor: this.options.strokeEnabled ? this.options.strokeColor : 'transparent',
                            fillColor: this.options.fillEnabled ? this.options.fillColor : 'transparent',
                            strokeWidth: this.options.strokeWidth,
                            opacity: this.options.opacity,
                            rotation: this.options.rotation,
                            name: "currentItem"
                        })
                        shape.data.options = {...this.options}
                        store.commit("updateSelectedTool", this.options)
                    }
                }
                break
            case "arbitrary":
                this.instance.onMouseMove = (event: paper.ToolEvent) => {
                    if (exLine)
                        exLine.remove()
                    if (initPoint) {
                        exLine = new paper.Path.Line({
                            from: initPoint,
                            to: event.point,
                            strokeWidth: this.options.strokeWidth,
                            strokeColor: this.options.strokeColor,
                            opacity: this.options.opacity,
                            strokeCap: "square",
                        })
                    }
                }
                this.instance.onMouseDown = (event: paper.ToolEvent) => {
                    if (clicker.doubleClick()) {
                        shape.closed = true
                        shape.fillColor = this.options.fillEnabled ? new paper.Color(this.options.fillColor) : new paper.Color("transparent")
                        shape.data.type = "shape"
                        shape.name = ""
                        shape.clone()
                        shape.remove()
                        initPoint = undefined
                        store.commit('addChanges')
                        return
                    }
                    if (!initPoint) {
                        shape = new paper.Path({
                            strokeWidth: this.options.strokeWidth,
                            strokeColor: this.options.strokeEnabled ? this.options.strokeColor : 'transparent',
                            opacity: this.options.opacity,
                            strokeCap: "square",
                            rotation: this.options.rotation,
                            name: "currentItem"
                        })
                        shape.data.options = {...this.options}
                        initPoint = event.point
                        shape.add(initPoint)
                        store.commit("updateSelectedTool", this.options)
                    } else {
                        initPoint = event.point
                        shape.add(initPoint)
                    }
                }
                break
        }
        store.commit("updateSelectedTool", this.options)
    }

    activate() {
        this.set()
        this.instance.activate()
    }
}
