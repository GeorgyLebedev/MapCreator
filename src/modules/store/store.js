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
	centerFlag:true,
	notification:{},
	changes: 0,
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
	},
	getChangesCount(state){
            return state.changes
	}
    },
    mutations: {
        setNotification(state, data){
            let notification={type:data[0], message:data[1]}
            Object.assign(state.notification,notification)
	    setTimeout(()=>{
	        store.commit("clearNotification")
	    },15000)
	},
	clearNotification(state){
            state.notification={}
	},
	clearChanges(state){
            state.changes=0
	},
	addChanges(state){
            state.changes++
	},
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
	updateSelectedObjectPanelOptions(){
            let options={}
	    const object=selection.state.selectedObject
           switch (selection.state.selectedObject.data.type) {
	       case "stamp":
		   options.opacity=object.opacity
		   options.rotation=object.rotation?object.rotation:0
		   options.size=object.size.width
		   store.commit("stampOptions/updateStampOptions",options)
	           break
	       case "text":
		   options.content = object.content
		   options.fontFamily = object.fontFamily
		   options.fontSize = object.fontSize
		   options.justification = object.justification
		   options.opacity = object.opacity
		   options.rotation=object.rotation?object.rotation:0
		   options.fillColor = object.data.isFill ? object.fillColor.toCSS(true) : "transparent"
		   options.strokeColor = object.data.isBorder ? object.strokeColor.toCSS(true) : "transparent"
		   options.strokeWidth = object.data.isBorder ? object.strokeWidth : 0
		   options.shadowColor = object.data.isShadow ? object.shadowColor.toCSS(true) : "transparent"
		   options.shadowBlur = object.data.isShadow ? object.shadowBlur : 0
		   options.shadowOffset = object.shadowOffset
		   options.isBorder = object.data.isBorder
		   options.isFill = object.data.isFill
		   options.isShadow = object.data.isShadow
		    store.commit("textOptions/updateTextOptions",options)
	           break
	       case "shape":
		   options.strokeColor = object.data.isBorder ? object.strokeColor.toCSS(true) : "transparent"
		   options.fillColor = object.data.isFill ? object.fillColor.toCSS(true) : "transparent"
		   options.strokeWidth = object.data.isBorder ? object.strokeWidth : 0
		   options.opacity = object.opacity
		   options.rotation=object.rotation?object.rotation:0
		   options.isBorder = object.data.isBorder
		   options.isFill = object.data.isFill
		   store.commit("shapeOptions/updateShapeOptions",options)
	           break
	   }
	},
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
