const cursorOptions = {
    namespaced: true,
    state: {
        name: "cursor",
        selectionTypes: ['stamp', 'shape', 'text']
    },
    mutations: {
        updateCursorOptions(state, option) {
            state = Object.assign( state, option)
        },
    }
}

export default cursorOptions
