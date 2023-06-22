const stampOptions = {
    namespaced: true,
    state: {
        name: "stamp",
	size: 50,
	opacity: 1,
	rotation: 0,
	revert: "none",
	currentKit: {},
	currentStamp: "",
    },
    mutations: {
	updateStampOptions(state, option) {
	    state = Object.assign(state, option)
	    const selectedObject = this.getters["selection/getSelectedObject"]
	    if (Object.keys(selectedObject).length>0) {
		this.commit("selection/updateSelectedObject", state)
	    }
	},
	updateRotation(state, value){
	    state.rotation=value
	},
	updateSize(state, value){
	    state.size=value
	}
    }
}
export default stampOptions
