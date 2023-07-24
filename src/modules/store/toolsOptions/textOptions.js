const textOptions = {
    namespaced: true,
    state: {
        name: "text",
	content: "Текст",
	fontFamily: "Cambria",
	fontSize: 50,
	justification: "left",
	fillColor: "#ffffff",
	strokeColor: "#000000",
	strokeWidth: 1,
	shadowColor: "#000000",
	shadowBlur: 1,
	shadowOffset:[0,0],
	opacity: 1,
	rotation: 0,
	isBorder: true,
	isFill: true,
	isShadow: false
    },
    mutations: {
	updateTextOptions(state, option){
	    //console.log(option)
	    state = Object.assign(state, option)
	    const selectedObject = this.getters["selection/getSelectedObject"]
	    if (Object.keys(selectedObject).length>0) {
		this.commit("selection/updateSelectedObject", state)
	    }
	},
	updateRotation(state, value){
	    state.rotation=value
	}
    }
}
export default textOptions
