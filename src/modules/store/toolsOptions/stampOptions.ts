import {Module} from "vuex";

interface stampState {
    size: number,
    opacity: number,
    rotation: number,
    currentKit: string,
    currentStamp: string
}

const StampState: Module<stampState, any> = {
    namespaced: true,
    state: {
        size: 50,
        opacity: 1,
        rotation: 0,
        currentKit: "",
        currentStamp: "",
    },
    getters: {
        getStampSize: (state): number => state.size,
        getStampOpacity: (state): number => state.opacity,
        getStampRotation: (state): number => state.rotation,
        getCurrentKit: (state): string => state.currentKit,
        getCurrentStamp: (state): string => state.currentStamp,
        getStampOptions: (state) => state
    },
    mutations: {
        setStampSize: (state, value): void => state.size = value,
        setStampOpacity: (state, value): void => state.opacity = value,
        setStampRotation: (state, value): void => state.rotation = value,
        setCurrentKit: (state, value): void => state.currentKit = value,
        setCurrentStamp: (state, value): void => state.currentStamp = value
    }
}
export default StampState
