import {Module} from "vuex";
import iCursor from "@/components/mapCanvas/toolsPanel/cursorPanel/iCursor";


const CursorState: Module<iCursor, any> = {
    namespaced: true,
    state: {
        selectionTypes: ['stamp', 'shape', 'text'],
        contextMenuPos: {top: 0, bottom: 0, left: 0, right: 0},
        showContextMenu: false,
    },
    getters: {
        getCursorOptions:(state)=>state,
        getSelectionTypes:(state)=>state.selectionTypes,
        getContextMenuPos:(state)=> state.contextMenuPos,
        getMenuFlag:(state)=> state.showContextMenu
    },
    mutations:{
        setSelectionTypes:(state,value:string[])=>state.selectionTypes=value,
        setContextMenuPos:(state,value:object)=> state.contextMenuPos=value,
        setMenuFlag:(state, value:boolean)=> state.showContextMenu=value
    }
}
export default CursorState
