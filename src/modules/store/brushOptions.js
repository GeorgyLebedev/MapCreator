const brushOptions = {
    namespaced: true,
    state: {
        size: 5,
        opacity: 1,
        color: "#000000",
        brushType: "color"
    },
    mutations: {
        updateBrushOptions(state, option){
            state = Object.assign( state, option)
        }
    }
}

export default brushOptions
