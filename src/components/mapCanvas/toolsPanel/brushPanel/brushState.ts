import {Module} from "vuex";

import iBrush from "./iBrush"

const BrushState: Module<iBrush, any> = {
    namespaced: true,
    state: {
        size: 5,
        opacity: 1,
        color: "#000000",
        brushType: "color"
    },
    getters: {
        getBrushOptions: (state): iBrush => state,
        getBrushSize: (state): number => state.size,
        getBrushOpacity: (state): number => state.opacity,
        getBrushColor: (state): string => state.color,
        getBrushType: (state): string => state.brushType
    },
    mutations: {
        setBrushSize: (state, size: number) => state.size = size,
        setBrushOpacity: (state, opacity: number) => state.opacity = opacity,
        setBrushColor: (state, color: string) => state.color = color,
        setBrushType: (state, brushType: string) => state.brushType = brushType
    }
}

export default BrushState
