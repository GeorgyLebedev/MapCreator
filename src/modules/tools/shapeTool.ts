import Canvas from "@/modules/logic/canvas";
import store from "@/modules/store/store";
import Clicker from "@/modules/logic/clicker";
import Konva from "konva";
import {Vector2d} from "konva/lib/types";
import clean from "@/modules/services/canvasCleaner";
const clicker=new Clicker()

export default class shapeTool {
    shapeType: string
    stroke: string
    strokeWidth: number
    strokeEnabled: boolean
    fill: string
    fillEnabled: boolean
    opacity: number
    rotation: number
    sides: number
    canvas:Canvas
    constructor(canvas:Canvas) {
        this.shapeType=store.getters['shapeOptions/getShapeType']
        this.stroke=store.getters['shapeOptions/getStrokeColor']
        this.strokeWidth=store.getters['shapeOptions/getStrokeWidth']
        this.strokeEnabled=store.getters['shapeOptions/getStrokeEnabled']
        this.fill=store.getters['shapeOptions/getFillColor']
        this.fillEnabled=store.getters['shapeOptions/getFillEnabled']
        this.opacity=store.getters['shapeOptions/getOpacity']
        this.rotation=store.getters['shapeOptions/getRotation']
        this.sides=store.getters['shapeOptions/getSides']
        this.canvas=canvas
        store.subscribe((mutation) => {
            if (mutation.type.startsWith("shapeOptions/") && !store.getters['selectionOptions/getSelectedObject']){
                Object.assign(this, store.getters['shapeOptions/getShapeOptions'])
                this.canvas.activeLayer.draw()
                this.set()
            }
        })
    }
    set(){
        clean(this.canvas)
        store.commit('cursorState/setCursorStyle', 'crosshair')
        switch (this.shapeType) {
            case 'rectangle':
                this.setRectangleBuilder()
                break
            case 'triangle':
                this.setRegularPolygonBuilder(3)
                break
            case 'circle':
                this.setEllipseBuilder()
                break
            case 'polygon':
                this.setRegularPolygonBuilder(this.sides)
                break
            case 'arbitrary':
                this.setArbitraryShapeBuilder()
                store.commit('cursorState/setCursorStyle', 'none')
                store.commit('cursorState/setCursorSize', this.strokeWidth)
                store.commit('cursorState/setCursorVisibility', true)
                break
        }
    }
    setRectangleBuilder(){
        let rect:Konva.Rect, startPoint:Vector2d|null, endPoint:Vector2d|null
        this.canvas.stage?.on('mousedown touchstart',()=>{
            if(startPoint){
                this.canvas.activeLayer.add(rect.clone())
                rect.destroy()
                startPoint=null
                endPoint=null
                return
            }
            startPoint=this.canvas.stage?.getPointerPosition() as Vector2d
        })
        this.canvas.stage?.on('mousemove touchmove',()=>{
            if(!startPoint) return
            endPoint=this.canvas.stage?.getPointerPosition() as Vector2d
            if(rect) rect.destroy()
            rect=new Konva.Rect({
                x:startPoint.x,
                y:startPoint.y,
                width:endPoint.x-startPoint.x,
                height:endPoint.y-startPoint.y,
                stroke: this.stroke,
                strokeWidth:this.strokeWidth,
                strokeEnabled:this.strokeEnabled,
                fill: this.fill,
                fillEnabled:this.fillEnabled,
                opacity: this.opacity,
                rotation:this.rotation,
                data:{type:'shape'}
            })
            this.canvas.activeLayer.add(rect)
        })
    }
    setEllipseBuilder(){
        let circle:Konva.Shape,startPoint:Vector2d|null, endPoint:Vector2d|null
        this.canvas.stage?.on('mousedown touchstart',()=>{
            if(startPoint){
                this.canvas.activeLayer.add(circle.clone())
                circle.destroy()
                startPoint=null
                endPoint=null
                return
            }
            startPoint=this.canvas.stage?.getPointerPosition() as Vector2d
        })
        this.canvas.stage?.on('mousemove touchmove',()=>{
            if(!startPoint) return
            endPoint=this.canvas.stage?.getPointerPosition() as Vector2d
            if(circle) circle.destroy()
            circle=new Konva.Circle({
                x: startPoint.x,
                y: startPoint.y,
                radius: Math.sqrt((endPoint.x-startPoint.x)**2+(endPoint.y-startPoint.y)**2)/2,
                fill: this.fill,
                fillEnabled:this.fillEnabled,
                stroke: this.stroke,
                strokeEnabled:this.strokeEnabled,
                strokeWidth: this.strokeWidth,
                rotation:this.rotation,
                opacity: this.opacity,
                data: {type: "shape"},
            })
            this.canvas.activeLayer.add(circle)
        })
    }
    setRegularPolygonBuilder(sides:number){
        let polygon:Konva.Shape,startPoint:Vector2d|null, endPoint:Vector2d|null
        this.canvas.stage?.on('mousedown touchstart',()=>{
            if(startPoint){
                this.canvas.activeLayer.add(polygon.clone())
                polygon.destroy()
                startPoint=null
                endPoint=null
                return
            }
            startPoint=this.canvas.stage?.getPointerPosition() as Vector2d
        })
        this.canvas.stage?.on('mousemove touchmove',()=>{
            if(!startPoint) return
            endPoint=this.canvas.stage?.getPointerPosition() as Vector2d
            if(polygon) polygon.destroy()
            polygon=new Konva.RegularPolygon({
                x: startPoint.x,
                y: startPoint.y,
                sides: sides,
                radius: Math.sqrt((endPoint.x-startPoint.x)**2+(endPoint.y-startPoint.y)**2)/2,
                fill: this.fill,
                fillEnabled:this.fillEnabled,
                stroke: this.stroke,
                strokeEnabled:this.strokeEnabled,
                strokeWidth: this.strokeWidth,
                rotation:this.rotation,
                opacity: this.opacity,
                data: {type: "shape"},
            })
            this.canvas.activeLayer.add(polygon)
        })
    }
    setArbitraryShapeBuilder(){
        let path: Konva.Line
        let points:number[]=[]
        let point: Vector2d | null
        this.canvas.stage?.on('mousedown touchstart', () => {
            if(clicker.doubleClick() && points.length!==0){
                path.setAttr('closed', true)
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
                stroke: this.stroke,
                opacity: this.opacity,
                strokeEnabled: this.strokeEnabled,
                fillEnabled:this.fillEnabled,
                fill:this.fill,
                lineCap:  "square",
                lineJoin:  "miter",
                strokeWidth: this.strokeWidth,
                data: {type: "shape"},
            })
            point = this.canvas.stage?.getPointerPosition() as Vector2d
            path.points(points.concat([point.x, point.y]))
            this.canvas.activeLayer?.add(path)
        })
    }
}
