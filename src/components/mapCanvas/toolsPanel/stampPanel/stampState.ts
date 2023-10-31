import {Module} from "vuex";
import iStamp from "./iStamp";


const StampState: Module<iStamp, any> = {
    namespaced: true,
    state: {
        size: 50,
        opacity: 1,
        rotation: 0,
        currentKit: "",
        currentStamp: "",
    },
    getters: {
        getSize: (state): number => state.size,
        getOpacity: (state): number => state.opacity,
        getRotation: (state): number => state.rotation,
        getCurrentKit: (state): string => state.currentKit,
        getCurrentStamp: (state): string => state.currentStamp,
        getStampOptions: (state):iStamp => state
    },
    mutations: {
        setStampOptions:(state, options)=> Object.assign(state, options),
        setSize: (state, value): void => state.size = value,
        setOpacity: (state, value): void => state.opacity = value,
        setRotation: (state, value): void => state.rotation = value,
        setCurrentKit: (state, value): void => state.currentKit = value,
        setCurrentStamp: (state, value): void => state.currentStamp = value
    }
}
export default StampState
