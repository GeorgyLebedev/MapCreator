import {Module} from "vuex";

interface brushState {
    size: number,
    opacity: number,
    color: string,
    brushType: string,
}

const BrushState: Module<brushState, any> = {
    namespaced: true,
    state: {
        size: 5,
        opacity: 1,
        color: "#000000",
        brushType: "color"
    },
    getters: {
        getBrushOptions: (state): brushState => state,
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
