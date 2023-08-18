import { Module } from "vuex";
import {left} from "@popperjs/core";
interface cursorPosition{
    top:number,
    left: number
}
interface CursorState{
    position: cursorPosition,
    style: string,
    size: number,
    visible: boolean
}
const cursorState: Module<CursorState, any> = {
    namespaced: true,
    state:():CursorState=>({
        position: {top:0, left:0},
        style: "default",
        size: 1,
        visible:false
    }),
    getters:{
        getCursorPosition:(state)=>state.position,
        getCursorStyle:(state)=>state.style,
        getCursorSize:(state)=>state.size,
        getCursorVisibility:(state)=>state.visible
    },
    mutations:{
        setCursorPosition:(state,position)=> state.position=position,
        setCursorStyle:(state, style)=>state.style=style,
        setCursorSize:(state, size)=>state.size=size,
        setCursorVisibility:(state,value)=>state.visible=value
    }
}
export default cursorState
