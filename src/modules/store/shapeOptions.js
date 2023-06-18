const shapeOptions = {
    namespaced: true,
    state: {
        name: "shape",
        shapeType: "rectangle",
        strokeWidth: 1,
        strokeColor: "#000000",
        fillColor: "#ffffff",
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        sides: 5,
        isArbitrary: false,
        isFill: true,
        isBorder: true,
        initPoint: undefined
    },
    mutations: {
        updateShapeOptions(state, option) {
            state = Object.assign(state, option)
            const selectedObject = this.getters["selection/getSelectedObject"]
            if (selectedObject) {
                this.commit("selection/updateSelectedObject", state)
            }
        }
    }
}
export default shapeOptions
