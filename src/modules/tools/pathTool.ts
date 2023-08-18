import Canvas from "@/modules/logic/canvas";
import Clicker from "@/modules/logic/clicker";
import store from "@/modules/store/store";
import clean from "@/modules/services/canvasCleaner";
import Konva from "konva";
import {Vector2d} from "konva/lib/types";

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
    canvas: Canvas

    constructor(canvas: Canvas) {
        this.size = store.getters['pathOptions/getPathSize']
        this.opacity = store.getters['pathOptions/getPathOpacity']
        this.color = store.getters['pathOptions/getPathColor']
        this.pathType = store.getters['pathOptions/getPathType']
        this.roundCap = store.getters['pathOptions/getPathRoundCap']
        this.pathStyle = store.getters['pathOptions/getPathStyle']
        this.dashArray = store.getters['pathOptions/getPathDashArray']
        this.dotArray = store.getters['pathOptions/getPathDotArray']
        this.canvas = canvas
        store.subscribe((mutation) => {
            if (mutation.type.startsWith("pathOptions/")) {
                Object.assign(this, store.getters['pathOptions/getPathOptions'])
                this.set()
            }
        })
    }

    set() {
        clean(this.canvas)
        store.commit('cursorState/setCursorStyle', 'none')
        store.commit('cursorState/setCursorSize', this.size)
        store.commit('cursorState/setCursorVisibility', true)
        switch (this.pathType) {
            case "line":
                this.setLineBuilder()
                break
            case "polyline":
                this.setPolylineBuilder()
                break
            case "curve":
                this.setPolylineBuilder()
                break
        }
    }

    setLineBuilder() {
        let path: Konva.Line
        let startPoint: Vector2d | null, endPoint: Vector2d | null
        this.canvas.stage?.on('mousedown touchstart', () => {
            if (startPoint) {
                endPoint = this.canvas.stage?.getPointerPosition() as Vector2d
                path = new Konva.Line({
                    points: [startPoint.x, startPoint.y, endPoint.x, endPoint.y],
                    stroke: this.color,
                    opacity: this.opacity,
                    dash: this.getDashDotArray(),
                    lineCap: this.roundCap ? 'round' : "square",
                    strokeWidth: this.size,
                    data: {type: "path"}
                })
                startPoint=null
                return
            }
            startPoint = this.canvas.stage?.getPointerPosition() as Vector2d
        })
        this.canvas.stage?.on('mousemove touchmove', () => {
            if (!startPoint) return
            if (path) path.destroy()
            path = new Konva.Line({
                stroke: this.color,
                opacity: this.opacity,
                dash: this.getDashDotArray(),
                lineCap: this.roundCap ? 'round' : "square",
                strokeWidth: this.size,
                data: {type: "path"}
            })
            endPoint = this.canvas.stage?.getPointerPosition() as Vector2d
            path?.points([startPoint.x, startPoint.y, endPoint.x, endPoint.y])
            this.canvas.activeLayer?.add(path)
        })
    }
    setPolylineBuilder(){
        const clicker=new Clicker()
        let path: Konva.Line
        let points:number[]=[]
        let point: Vector2d | null
        this.canvas.stage?.on('mousedown touchstart', () => {
            if(clicker.doubleClick() && points.length!==0){
                this.canvas.activeLayer?.add(path.clone())
                path.destroy()
                points=[]
                return
            }
            point = this.canvas.stage?.getPointerPosition() as Vector2d
            points.push(point.x,point.y)
            path.points(points)
        })
        this.canvas.stage?.on('mousemove touchmove', () => {
            if (points.length==0) return
            if (path)
                path.destroy()
            path = new Konva.Line({
                stroke: this.color,
                opacity: this.opacity,
                dash: this.getDashDotArray(),
                lineCap: this.roundCap ? 'round' : "square",
                lineJoin: this.roundCap ? 'round' : "miter",
                strokeWidth: this.size,
                data: {type: "path"},
                tension: this.pathType=="curve"?0.5:0
            })
            point = this.canvas.stage?.getPointerPosition() as Vector2d
            path.points(points.concat([point.x, point.y]))
            this.canvas.activeLayer?.add(path)
        })
    }
    getDashDotArray(): number[] | undefined {
        return this.pathStyle === "dashed" ? this.dashArray.map((el) => el * this.size)
            : this.pathStyle === "dotted" ? this.dotArray.map((el) => el * this.size)
                : undefined;
    }
}
