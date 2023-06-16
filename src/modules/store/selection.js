const selection={
    namespaced:true,
    state: {
	selectionGroup: {},
	selectedObject: {}
    },
    mutations:{
      setSelectionGroup(state, group){
          state.selectionGroup=group
      },
      setSelectedObject(state,object){
          state.selectedObject=object
      },
      removeSelection(state){
	  state.selectionGroup= {}
	  state.selectedObject= {}
      }
    },
    getters:{
        getSelectedObject(state){
            return state.selectedObject
	},
	getSelectionGroup(state){
	    return state.selectionGroup
	}
    }
}
export default selection
