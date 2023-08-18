import {createStore} from 'vuex'
import cursorOptions from "@/modules/store/toolsOptions/cursorOptions";
import brushOptions from "@/modules/store/toolsOptions/brushOptions";
import stampOptions from "@/modules/store/toolsOptions/stampOptions";
import shapeOptions from "@/modules/store/toolsOptions/shapeOptions";
import pathOptions from "@/modules/store/toolsOptions/pathOptions";
import textOptions from "@/modules/store/toolsOptions/textOptions";
import colorsStore from "@/modules/store/toolsOptions/colorsStore";
import modalFlags from "@/modules/store/modalFlags";
import selectionOptions from "@/modules/store/toolsOptions/selectionOptions";
import userState from "@/modules/store/componentsOptions/loginPage";
import cursorState from "@/modules/store/cursorState";
import AxiosRequest from "@/modules/services/axiosRequest";
import router from "@/router";
import mainState from "@/modules/store/componentsOptions/mainPage";
const store = createStore({
    state: {
	selectedTool: "cursor",
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
	},
	getSelectedTool:(state)=> state.selectedTool
    },
    mutations: {
	setSelectedTool:(state, value)=> state.selectedTool=value,
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
	modalFlags,
	selectionOptions,
	userState,
	mainState,
	cursorState
    }
})
export default store
