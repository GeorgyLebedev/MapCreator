import store from "@/modules/store/store";

const selection = {
    namespaced: true,
    state: {
	selectionGroup: {},
	selectedObject: {}
    },
    mutations: {
	setSelectionGroup(state, group) {
	    state.selectionGroup = group
	},
	setSelectedObject(state, object) {
	    state.selectedObject = object
	    if (["stamp", "text", "shape"].indexOf(object.data.type) != -1) {
		store.commit("updateSelectedObjectPanelOptions")
	    }
	},
	updateSelectedObject(state, options) {
	    Object.assign(state.selectedObject,options)
	 /*   if(state.selectedObject.data.type=="stamp") {
		let size = options.size
		state.selectedObject.size=size
		state.selectedObject.source=state.selectedObject.data.currentStamp
		state.selectedObject.size=size
	    }*/
	},
	removeSelection(state) {
	    state.selectionGroup = {}
	    state.selectedObject = {}
	}
    },
    getters: {
	getSelectedObject(state) {
	    return state.selectedObject
	},
	getSelectionGroup(state) {
	    return state.selectionGroup
	}
    }
}
export default selection
