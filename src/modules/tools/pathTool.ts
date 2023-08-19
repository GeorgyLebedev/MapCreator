import * as paper from "paper" ;
import Clicker from "@/modules/logic/clicker";
import store from "@/modules/store/store";
import clean from "@/modules/services/canvasCleaner";

const clicker = new Clicker()
export default class pathTool {
    size: number
    opacity: number
    color: string
    pathType: string
    roundCap: boolean
    pathStyle: string
    dashArray: number[]
    dotArray: number[]
    instance: paper.Tool

    constructor() {
        this.size = store.getters['pathOptions/getPathSize']
        this.opacity = store.getters['pathOptions/getPathOpacity']
        this.color = store.getters['pathOptions/getPathColor']
        this.pathType = store.getters['pathOptions/getPathType']
        this.roundCap = store.getters['pathOptions/getPathRoundCap']
        this.pathStyle = store.getters['pathOptions/getPathStyle']
        this.dashArray = store.getters['pathOptions/getPathDashArray']
        this.dotArray = store.getters['pathOptions/getPathDotArray']
        this.instance = new paper.Tool()
        store.subscribe((mutation) => {
            if (mutation.type.startsWith("pathOptions/")) {
                Object.assign(this, store.getters['pathOptions/getPathOptions'])
                this.set()
            }
        })
    }

    set() {
        clean()
        store.commit('cursorState/setCursorStyle', 'none')
        store.commit('cursorState/setCursorSize', this.size*2)
        store.commit('cursorState/setCursorVisibility', true)
        let initPoint:paper.Point|undefined
        let vector, firstSegment:paper.Segment, lastSegment:paper.Segment
        let segments:paper.Segment[] = []
        let path: paper.Path
        switch (this.pathType) {
            case "line":
                this.instance.onMouseMove = (event:paper.ToolEvent) => {
                    if (path)
                        path.remove()
                    if (initPoint) {
                        path = new paper.Path.Line({
                            from: initPoint,
                            to: event.point,
                            strokeWidth: this.size * 2,
                            strokeCap: this.roundCap ? "round" : "square",
                            strokeColor: this.color,
                            opacity: this.opacity,
                            name: "currentItem"
                        })
                        path.data.type = "path"
                        if (this.pathStyle === "dashed")
                            path.dashArray = this.dashArray.map((x) => (x * this.size))
                        else if (this.pathStyle === "dotted")
                            path.dashArray = this.dotArray.map((x) => (x * this.size))
                        else path.dashArray = []
                        store.commit("updateSelectedTool", this)
                    }
                }
                this.instance.onMouseDown = (event:paper.ToolEvent) => {
                    if (!initPoint)
                        initPoint = event.point
                    else {
                        path.name=""
                        path.clone()
                        initPoint = undefined
                        store.commit('addChanges')
                    }
                }
                break
            case "polyline":
                this.instance.onMouseMove = (event:paper.ToolEvent) => {
                    if (path)
                        path.remove()
                    if (initPoint) {
                        lastSegment = new paper.Segment(
                            event.point,
                            undefined,
                            undefined
                        )
                        path = new paper.Path({
                            segments: segments.concat(lastSegment),
                            strokeWidth: this.size * 2,
                            strokeJoin: "round",
                            strokeCap: this.roundCap ? "round" : "square",
                            strokeColor: this.color,
                            opacity: this.opacity,
                            name: "currentItem"
                        })
                        if (this.pathStyle == "dashed")
                            path.dashArray = this.dashArray.map((x) => (x * this.size))
                        else if (this.pathStyle == "dotted")
                            path.dashArray = this.dotArray.map((x) => (x * this.size))
                        else path.dashArray = []
                        path.data.type = "path"
                        store.commit("updateSelectedTool", this)
                    }
                }
                this.instance.onMouseDown = (event:paper.ToolEvent) => {
                    if (clicker.doubleClick()) {
                        initPoint = undefined
                        path.name=""
                        path.clone()
                        path.remove()
                        store.commit('addChanges')
                        return;
                    }
                    if (!initPoint) {
                        segments = []
                    }
                    firstSegment = new paper.Segment(
                        event.point,
                        undefined,
                        undefined
                    )
                    segments.push(firstSegment)
                    initPoint = event.point
                }
                break
            case "curve":
                this.instance.onMouseMove = (event:paper.ToolEvent) => {
                    let hIn, hOut, firstVector, angle
                    if (path)
                        path.remove()
                    if (initPoint) {
                        if (segments.length > 1) {
                            vector = new paper.Point({
                                x: event.point.x - firstSegment.point.x,
                                y: event.point.y - firstSegment.point.y
                            });
                            firstVector = new paper.Point({
                                x: segments[segments.length - 1].point.x - segments[segments.length - 2].point.x,
                                y: segments[segments.length - 1].point.y - segments[segments.length - 2].point.y
                            });
                            angle = vector.getDirectedAngle(firstVector) > 0 ?
                                180 - vector.getDirectedAngle(firstVector) :
                                -180 + Math.abs(vector.getDirectedAngle(firstVector))
                            hIn = vector.rotate(180, vector)
                            hOut = vector
                            hOut.length = hIn.length = vector.length * 0.3
                            if (angle > 0) {
                                hIn.angle = firstVector.angle - (90 - angle / 2) - 180
                                hOut.angle = hIn.angle + 180
                            } else if (angle < 0) {
                                hIn.angle = firstVector.angle - (-90 - angle / 2) - 180
                                hOut.angle = hIn.angle + 180
                            } else {
                                hIn.angle = firstVector.angle - angle / 2 - 180
                                hOut.angle = vector.angle - (180 - (hIn.getDirectedAngle(firstVector)))
                            }
                            hIn.length = Math.abs(segments[segments.length - 1].point.getDistance(segments[segments.length - 2].point)) * 0.2 + vector.length * 0.2
                            if (Math.abs(angle) / 40 < 1) {
                                hIn.length *= (Math.abs(angle) / 40)
                                hOut.length *= (Math.abs(angle) / 40)
                            }
                            segments[segments.length - 1].handleIn = hIn
                            segments[segments.length - 1].handleOut = hOut
                        }
                        /*console.log('chIn:'+hIn.angle)
                        console.log('fv:'+firstVector.angle)
                        console.log("hIn:"+(hIn.getDirectedAngle(firstVector)))
                        console.log("hOut:"+(hOut.getDirectedAngle(firstVector)))
                        console.log("hIn-hOut:"+hIn.getDirectedAngle(hOut))
                        console.log("fV-vector:"+angle)*/
                        lastSegment = new paper.Segment(
                            event.point,
                            undefined,
                            undefined
                        )
                        path = new paper.Path({
                            segments: segments.concat(lastSegment),
                            strokeWidth: this.size * 2,
                            strokeJoin: "round",
                            strokeCap: this.roundCap ? "round" : "square",
                            strokeColor: this.color,
                            opacity: this.opacity,
                            name:"currentItem"
                        })
                        if (this.pathStyle == "dashed")
                            path.dashArray = this.dashArray.map((x) => (x * this.size))
                        else if (this.pathStyle == "dotted")
                            path.dashArray = this.dotArray.map((x) => (x * this.size))
                        else path.dashArray = []
                        path.data.type = "path"
                        store.commit("updateSelectedTool", this)
                    }
                }
                this.instance.onMouseDown = (event:paper.ToolEvent) => {
                    if (clicker.doubleClick()) {
                        initPoint = undefined
                        path.name=""
                        path.clone()
                        path.remove()
                        store.commit('addChanges')
                        return;
                    }
                    if (!initPoint) {
                        segments = []
                    }
                    firstSegment = new paper.Segment(
                        event.point,
                        undefined,
                        undefined
                    )
                    segments.push(firstSegment)
                    initPoint = event.point
                }
                break
        }
        store.commit("updateSelectedTool", this)
    }

    activate() {
        this.set()
        this.instance.activate()
    }
}
