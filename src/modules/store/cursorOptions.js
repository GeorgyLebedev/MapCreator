const cursorOptions = {
    namespaced: true,
    state: {
        name: "cursor",
        selectionTypes: ['stamp', 'shape', 'text'],
        contextMenuPos: {top:0, bottom:0, left:0, right:0},
        showContextMenu: false,
    },
    mutations: {
        updateCursorOptions(state, option) {
            state = Object.assign( state, option)
        },
    },
    getters:{
        getContextMenuPos(state){
            return state.contextMenuPos
        },
        getMenuFlag(state){
            return state.showContextMenu
        }
    }
}

export default cursorOptions
