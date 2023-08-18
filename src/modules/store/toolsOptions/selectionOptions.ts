import { Module } from "vuex";
import Konva from "konva";

interface selectionState {
    selectedObject: Konva.Node | null;
}

const SelectionState: Module<selectionState, any> = {
    namespaced:true,
    state: {
        selectedObject: null,
    },
    getters: {
        getSelectedObject: (state) => state.selectedObject,
        getSelectedObjectType: (state) => state.selectedObject?.attrs?.data?.type,
        getSelectedObjectAttrs: (state) => state.selectedObject?.attrs,
    },
    mutations: {
        setSelectedObject: (state, object: Konva.Node) => state.selectedObject = object,
        unsetSelectedObject:(state)=> state.selectedObject=null
    },
};

export default SelectionState;
