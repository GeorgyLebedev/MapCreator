import {createStore} from 'vuex'
import cursorOptions from "@/modules/store/cursorOptions";
import brushOptions from "@/modules/store/brushOptions";
import stampOptions from "@/modules/store/stampOptions";
import shapeOptions from "@/modules/store/shapeOptions";
import pathOptions from "@/modules/store/pathOptions";
import textOptions from "@/modules/store/textOptions";
import colorsStore from "@/modules/store/colorsStore";
const store = createStore({
    modules:{
        cursorOptions,
	brushOptions,
	stampOptions,
	shapeOptions,
	pathOptions,
	textOptions,
	colorsStore
    }
})
export default store
