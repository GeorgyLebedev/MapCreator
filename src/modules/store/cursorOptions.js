const cursorOptions = {
    namespaced: true,
    state: {
        selectionTypes: ['stamp', 'shape', 'text']
    },
    mutations: {
        updateCursorOptions(state, option) {
            state = Object.assign( state, option)
        },

    }
}

export default cursorOptions
