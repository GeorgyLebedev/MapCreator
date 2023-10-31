import store from "@/modules/store/store";
import {Module} from "vuex";
interface selectionState {
	selection:{
		item:paper.Item|null,
		group: paper.Group|null
	}

}

const SelectionState:Module<selectionState, any>={
	namespaced:true,
	state:{
		selection: {
			item:null,
			group:null
		}
	},
	mutations:{
		setSelectedItem(state:selectionState, item:paper.Item){
			state.selection.item=item
			if(!item.data?.type) return
			else switch (item.data.type){
				case 'stamp':
					store.commit('stampOptions/setStampOptions', item.data.options)
					break
				case 'shape':
					store.commit('shapeOptions/setShapeOptions', item.data.options)
					break
				case 'text':
					store.commit('textOptions/setTextOptions', item.data.options)
					break
			}
		},
		removeSelectedItem:(state:selectionState)=>state.selection.item=null,
		setSelectionGroup:(state:selectionState, group:paper.Group)=>state.selection.group=group,
		removeSelectionGroup:(state:selectionState)=>state.selection.group=null
	},
	getters:{
		getSelectedItem:(state:selectionState)=>state.selection.item,
		getSelectionGroup:(state:selectionState)=>state.selection.group
	}
}
export default SelectionState
