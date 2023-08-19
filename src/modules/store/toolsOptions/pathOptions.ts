import {Module} from "vuex";

enum pathTypes{
    line="line",
    polyline="polyline",
    curve="curve"
}
enum pathStyles{
    default="default",
    dashed="dashed",
    dotted="dotted"
}
interface pathState{
    size:number,
    opacity:number,
    color:string,
    pathType: pathTypes,
    roundCap: boolean,
    pathStyle:pathStyles,
    dashArray: number[],
    dotArray: number[]
}
const PathState: Module<pathState, any> = {
    namespaced: true,
    state: {
        size: 1,
        opacity: 1,
        color: "#000000",
        pathType: pathTypes.line,
        roundCap: true,
        pathStyle: pathStyles.default,
        dashArray: [5, 5],
        dotArray: [0.5, 5]
    },
    getters:{
        getPathOptions:(state)=>state,
        getPathSize:(state)=>state.size,
        getPathOpacity:(state)=>state.opacity,
        getPathColor:(state)=>state.color,
        getPathType:(state)=>state.pathType,
        getPathRoundCap:(state)=>state.roundCap,
        getPathStyle:(state)=>state.pathStyle,
        getPathDashArray:(state)=>state.dashArray,
        getPathDotArray:(state)=>state.dotArray,
    },
    mutations: {
        setPathSize:(state, value:number)=>state.size=value,
        setPathOpacity:(state, value:number)=>state.opacity=value,
        setPathColor:(state, value:string)=>state.color=value,
        setPathType:(state, value:string)=>state.pathType=value as pathTypes,
        setPathRoundCap:(state, value:boolean)=>state.roundCap=value,
        setPathStyle:(state, value:string)=>state.pathStyle=value as pathStyles,
        setPathDashArray:(state, value:number[])=>state.dashArray=value,
        setPathDotArray:(state, value:number[])=>state.dotArray=value,
    }
}

export default PathState
