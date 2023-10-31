import {createStore} from 'vuex'
import cursorOptions from "@/components/mapCanvas/toolsPanel/cursorPanel/cursorState";
import brushOptions from "@/components/mapCanvas/toolsPanel/brushPanel/brushState";
import stampOptions from "@/components/mapCanvas/toolsPanel/stampPanel/stampState";
import shapeOptions from "@/components/mapCanvas/toolsPanel/shapePanel/shapeState";
import pathOptions from "@/components/mapCanvas/toolsPanel/pathPanel/pathState";
import textOptions from "@/components/mapCanvas/toolsPanel/textPanel/textState";
import colorsStore from "@/components/mapCanvas/toolsPanel/colors/colorsStore";
import selection from "@/modules/store/toolsOptions/selectionState";
import modalFlags from "@/modules/store/modalFlags";
import userState from "@/modules/store/componentsOptions/loginPage";
import cursorState from "@/components/mapCanvas/cursorCircle/cursorState";
import AxiosRequest from "@/modules/services/axiosRequest";
import router from "@/router";
import mainState from "@/modules/store/componentsOptions/mainPage";
const store = createStore({
    state: {
	selectedTool: {},
	cursorStyle: "default",
	centerFlag: true,
	notification: {},
	changes: 0,
    },
    getters: {
	getCenterFlag(state) {
	    return state.centerFlag
	},
	getChangesCount(state) {
	    return state.changes
	}
    },
    mutations: {
	setNotification(state, data) {
	    let notification = {type: data[0], message: data[1]}
	    Object.assign(state.notification, notification)
	    setTimeout(() => {
		store.commit("clearNotification")
	    }, 15000)
	},
	clearNotification(state) {
	    state.notification = {}
	},
	clearChanges(state) {
	    state.changes = 0
	},
	addChanges(state) {
	    state.changes++
	},
	setCenterItemFlag(state, value) {
	    state.centerFlag = value
	},
	updateSelectedTool(state, tool) {
	    state.selectedTool = tool
	},
	updateSelectedObjectPanelOptions() {
	    let options = {}
	    const object = selection.state.selectedObject
	    switch (selection.state.selectedObject.data.type) {
		case "stamp":
		    options.opacity = object.opacity
		    options.rotation = object.rotation ? object.rotation : 0
		    options.size = object.size.width
		    store.commit("stampOptions/updateStampOptions", options)
		    break
		case "text":
		    options.content = object.content
		    options.fontFamily = object.fontFamily
		    options.fontSize = object.fontSize
		    options.justification = object.justification
		    options.opacity = object.opacity
		    options.rotation = object.rotation ? object.rotation : 0
		    options.fillColor = object.data.isFill ? object.fillColor.toCSS(true) : "transparent"
		    options.strokeColor = object.data.isBorder ? object.strokeColor.toCSS(true) : "transparent"
		    options.strokeWidth = object.data.isBorder ? object.strokeWidth : 0
		    options.shadowColor = object.data.isShadow ? object.shadowColor.toCSS(true) : "transparent"
		    options.shadowBlur = object.data.isShadow ? object.shadowBlur : 0
		    options.shadowOffset = object.shadowOffset
		    options.isBorder = object.data.isBorder
		    options.isFill = object.data.isFill
		    options.isShadow = object.data.isShadow
		    store.commit("textOptions/updateTextOptions", options)
		    break
		case "shape":
		    options.strokeColor = object.data.isBorder ? object.strokeColor.toCSS(true) : "transparent"
		    options.fillColor = object.data.isFill ? object.fillColor.toCSS(true) : "transparent"
		    options.strokeWidth = object.data.isBorder ? object.strokeWidth : 0
		    options.opacity = object.opacity
		    options.rotation = object.rotation ? object.rotation : 0
		    options.isBorder = object.data.isBorder
		    options.isFill = object.data.isFill
		    store.commit("shapeOptions/updateShapeOptions", options)
		    break
	    }
	},
	setCursorStyle(state, style) {
	    state.cursorStyle = style
	}
    },
    actions: {
	async logOut() {
	    localStorage.clear()
	    try {
		await new AxiosRequest('auth/logout', 'post').sendRequest()
		await router.push('/Login')
	    } catch (e) {
		store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
	    }
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
	selection,
	modalFlags,
	userState,
	cursorState,
	mainState
    }
})
export default store
