import {Module} from "vuex";

interface shapeState {
    shapeType: string
    strokeColor: string
    strokeWidth: number
    strokeEnabled: boolean
    fillColor: string
    fillEnabled: boolean
    opacity: number
    rotation: number
    sides: number
}

const ShapeState: Module<shapeState, any> = {
    namespaced: true,
    state: {
        shapeType: "rectangle",
        strokeColor: "#000000",
        strokeWidth: 1,
        strokeEnabled: true,
        fillColor: "#ffffff",
        fillEnabled: true,
        opacity: 1,
        rotation: 0,
        sides: 5
    },
    getters: {
        getShapeOptions: (state): shapeState => state,
        getShapeType: (state): string => state.shapeType,
        getStrokeColor: (state): string => state.strokeColor,
        getStrokeWidth: (state): number => state.strokeWidth,
        getStrokeEnabled: (state): boolean => state.strokeEnabled,
        getFillColor: (state): string => state.fillColor,
        getFillEnabled: (state): boolean => state.fillEnabled,
        getOpacity: (state): number => state.opacity,
        getRotation: (state): number => state.rotation,
        getSides: (state): number => state.sides
    },
    mutations: {
        setShapeType: (state, value: string) => state.shapeType = value,
        setStrokeColor: (state, value: string) => state.strokeColor = value,
        setStrokeWidth: (state, value: number) => state.strokeWidth = value,
        setStrokeEnabled: (state, value: boolean) => state.strokeEnabled = value,
        setFillColor: (state, value: string) => state.fillColor = value,
        setFillEnabled: (state, value: boolean) => state.fillEnabled = value,
        setOpacity: (state, value: number) => state.opacity = value,
        setRotation: (state, value: number) => state.rotation = value,
        setSides: (state, value: number) => state.sides = value
    }
}
export default ShapeState
