import {Module} from "vuex";
import store from "@/modules/store/store";
import iColors from "@/components/mapCanvas/toolsPanel/colors/iColors";
const ColorsState:Module<iColors, any>={
    namespaced:true,
	state:{
	lastColor:null,
	    recentColors: Array(8).fill(null),
	    paletteColors: Array(24).fill(null),
    },
    getters:{
	getPaletteColors(state){
	    return state.paletteColors
	},
	getRecentColors(state){
	    return state.recentColors
	},
	getLastColor(state){
	    return state.lastColor
	}
    },
    mutations:{
	updateRecentColors(state, color:string) {
	    if (color == "transparent") return
	    if (state.recentColors.indexOf(color) != -1) return
	    if (state.recentColors.length < 8)
		state.recentColors.unshift(color)
	    else {
		state.recentColors = state.recentColors.slice(0, 7)
		state.recentColors.unshift(color)
	    }
	},
	updateLastColor(state, color){
	    if (state.lastColor != color) {
		state.lastColor = color;
		setTimeout(() => {
		    if (color == state.lastColor) {
			store.commit('colorsStore/updateRecentColors', color)
		    }
		}, 2000);
	    }
	},
	updatePalette(state,options){
	    state.paletteColors[options.index] = options.color
	},
	setPalette(state,palette){
	    state.paletteColors=palette
	}
    }
}
export default ColorsState
