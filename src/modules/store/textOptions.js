const textOptions = {
    namespaced: true,
    state: {
	content: "Текст",
	fontFamily: "Cambria",
	fontSize: 50,
	justification: "left",
	fillColor: "#ffffff",
	strokeColor: "#000000",
	strokeWidth: 1,
	shadowColor: "#000000",
	shadowBlur: 1,
	shOffsetX: 0,
	shOffsetY: 0,
	opacity: 1,
	rotation: 0,
	isBorder: true,
	isFill: true,
	isShadow: false
    },
    mutations: {
	updateTextOptions(state, option){
	    state = Object.assign( state, option)
	}
    }
}
export default textOptions
