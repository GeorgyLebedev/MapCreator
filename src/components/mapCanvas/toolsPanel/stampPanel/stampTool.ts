import * as paper from "paper" ;
import store from "@/modules/store/store";
import clean from "@/modules/services/canvasCleaner";
import iStamp from "@/components/mapCanvas/toolsPanel/stampPanel/iStamp";

export default class stampTool {
    options: iStamp
    instance: paper.Tool

    constructor() {
        this.options = {
            size: store.getters['stampOptions/getStampSize'],
            opacity: store.getters['stampOptions/getStampOpacity'],
            rotation: store.getters['stampOptions/getStampRotation'],
            currentKit: store.getters['stampOptions/getCurrentKit'],
            currentStamp: store.getters['stampOptions/getCurrentStamp']
        }
        this.instance = new paper.Tool()
        store.subscribe((mutation) => {
            if (mutation.type.startsWith("stampOptions/") && !store.getters['selection/getSelectedItem']) {
                Object.assign(this.options, store.getters['stampOptions/getStampOptions'])
                this.set()
            }
        })
    }

    set() {
        clean()
        store.commit('cursorState/setCursorStyle', 'none')
        let stamp: paper.Raster | undefined
        this.instance.onMouseMove = (event: paper.ToolEvent) => {
            if (stamp)
                stamp.remove()
            stamp = new paper.Raster({
                source: this.options.currentStamp,
                position: store.getters.getCenterFlag ? paper.view.center : event.point,
                size: this.options.size,
                opacity: this.options.opacity,
                rotation: this.options.rotation,
                name: "currentItem"
            })
            stamp.data.type = "stamp"
            stamp.data.options={...this.options}
            store.commit("updateSelectedTool", this.options)
        }
        this.instance.onMouseDown = () => {
            if (!stamp) return
            stamp.name = ""
            stamp.clone()
            store.commit('addChanges')
        }
    }

    activate() {
        this.set()
        this.instance.activate()
    }
}
