import {createStore} from 'vuex'
import cursorOptions from "@/modules/store/cursorOptions";
import brushOptions from "@/modules/store/brushOptions";
import stampOptions from "@/modules/store/stampOptions";
import shapeOptions from "@/modules/store/shapeOptions";
import pathOptions from "@/modules/store/pathOptions";
import textOptions from "@/modules/store/textOptions";
import colorsStore from "@/modules/store/colorsStore";
import selection from "@/modules/store/selection";

const store = createStore({
    state: {
	selectedTool: {},
	cursorStyle: "default",
	centerFlag:true
    },
    getters:{
        getSelectedToolName(state){
            return state.selectedTool.name
	},
        getCursorStyle(state){
            return state.cursorStyle
	},
	getCenterFlag(state){
            return state.centerFlag
	}
    },
    mutations: {
	setSelectedTool(state, tool) {
	    store.commit("removeCurrentItem")
	    if(selection.getters.getSelectedObject){
	        store.commit("selection/removeSelection")
	    }
	    if(cursorOptions.getters.getMenuFlag){
	        store.commit("cursorOptions/updateCursorOptions", {showContextMenu:false})
	    }
	    state.selectedTool={}
	    Object.assign(state.selectedTool, tool)
	    	switch (tool.name) {
		    case "cursor":
			store.commit("setCursorStyle", "default")
			break
		    case "brush":
		    case "stamp":
		    case "path":
		    case "text":
			store.commit("setCursorStyle", "none")
			break
		    case "shape":
			store.commit("setCursorStyle", "crosshair")
			break
		    case "zoom":
			store.commit("setCursorStyle", "zoom-in")
			break
		}
	    tool.activate()
	},
	setCenterItemFlag(state,value){
	    state.centerFlag=value
	},
	removeCurrentItem(state){
	    if(state.selectedTool.currentItem)
		state.selectedTool.currentItem.remove()
	    if(state.selectedTool.name=="path"||state.selectedTool.name=="brush")
		state.selectedTool.cursor.remove()
	},
	updateSelectedTool(state,tool){
	    state.selectedTool=tool
	},
	/*updateSelectedToolOptions(state,options){

	}*/
	setCursorStyle(state,style){
	    state.cursorStyle=style
	}
    },
    modules: {
	cursorOptions,
	brushOptions,
	stampOptions,
	shapeOptions,
	pathOptions,
	textOptions,
	colorsStore,
	selection
    }
})
export default store
