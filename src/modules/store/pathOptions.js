const pathOptions = {
    namespaced: true,
    state: {
        name: "path",
        size: 1,
        opacity: 1,
        color: "#000000",
        pathType: "line",
        roundCap: true,
        style: "default",
        dashArray: [10, 5],
        dotArray: [1, 5]
    },
    mutations: {
        updatePathOptions(state, option){
            state = Object.assign( state, option)
        }
    }
}

export default pathOptions
