import {Module} from "vuex";
interface shapeState{
    shapeType: string
    stroke: string
    strokeWidth: number
    strokeEnabled: boolean
    fill: string
    fillEnabled: boolean
    opacity: number
    rotation: number
    sides: number
}
const ShapeState: Module<shapeState, any>={
    namespaced:true,
    state:{
        shapeType:"rectangle",
        stroke: "#000000",
        strokeWidth:1,
        strokeEnabled:true,
        fill:"#ffffff",
        fillEnabled:true,
        opacity:1,
        rotation:0,
        sides:5
    },
    getters:{
        getShapeOptions:(state):shapeState=>state,
        getShapeType:(state):string=>state.shapeType,
        getStrokeColor:(state):string=>state.stroke,
        getStrokeWidth:(state):number=>state.strokeWidth,
        getStrokeEnabled:(state):boolean=>state.strokeEnabled,
        getFillColor:(state):string=>state.fill,
        getFillEnabled:(state):boolean=>state.fillEnabled,
        getOpacity:(state):number=>state.opacity,
        getRotation:(state):number=>state.rotation,
        getSides:(state):number=>state.sides
    },
    mutations: {
        setShapeType: (state, value: string) => state.shapeType = value,
        setStrokeColor: (state, value: string) => state.stroke = value,
        setStrokeWidth: (state, value: number) =>state.strokeWidth = value,
        setStrokeEnabled: (state, value: boolean) => state.strokeEnabled = value,
        setFillColor: (state, value: string) => state.fill = value,
        setFillEnabled: (state, value: boolean) => state.fillEnabled = value,
        setOpacity: (state, value: number) => state.opacity = value,
        setRotation:(state, value:number)=>state.rotation=value,
        setSides: (state, value: number) => state.sides = value
    }
}
export default ShapeState
