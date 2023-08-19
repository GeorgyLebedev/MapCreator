import * as paper from "paper" ;
import store from "@/modules/store/store";
import clean from "@/modules/services/canvasCleaner";
export default class stampTool {
	size: number
	opacity: number
	rotation: number
	currentKit: string
	currentStamp: string
	instance: paper.Tool
    constructor() {
        this.instance=new paper.Tool()
		this.size = store.getters['stampOptions/getStampSize']
		this.opacity = store.getters['stampOptions/getStampOpacity']
		this.rotation = store.getters['stampOptions/getStampRotation']
		this.currentKit = store.getters['stampOptions/getCurrentKit']
		this.currentStamp = store.getters['stampOptions/getCurrentStamp']
		store.subscribe((mutation) => {
			if (mutation.type.startsWith("stampOptions/") && !store.getters['selectionOptions/getSelectedObject']){
				Object.assign(this, store.getters['stampOptions/getStampOptions'])
				this.set()
			}
		})
    }
    set(){
		clean()
		store.commit('cursorState/setCursorStyle', 'none')
		let stamp:paper.Raster|undefined
	this.instance.onMouseMove = (event:paper.ToolEvent) => {
	    if (stamp)
		stamp.remove()
	    stamp = new paper.Raster({
		source:  this.currentStamp,
		position: store.getters.getCenterFlag?paper.view.center:event.point,
		size: this.size,
		opacity: this.opacity,
		rotation: this.rotation,
			name:"currentItem"
	    })
	    stamp.data.currentKit = this.currentKit
	    stamp.data.currentStamp = this.currentStamp
	    stamp.data.type="stamp"
	    store.commit("updateSelectedTool", this)
	}
	this.instance.onMouseDown = () => {
		if(!stamp) return
		stamp.name=""
	    stamp.clone()
	    store.commit('addChanges')
	}
    }
    activate(){
	this.set()
	this.instance.activate()
    }
}
