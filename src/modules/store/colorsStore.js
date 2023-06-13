const colorsStore={
    namespaced: true,
    state: {
        lastColor: null,
	recentColors: Array(8).fill('transparent'),
	paletteColors: Array(24).fill(null),
    },
    mutations: {
	updateRecentColors(state, color) {
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
			this.commit('colorsStore/updateRecentColors', color)
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
export default colorsStore
