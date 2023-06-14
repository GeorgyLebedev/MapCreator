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
	}
    }
}
export default stampOptions
