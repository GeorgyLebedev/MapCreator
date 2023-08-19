import store from "@/modules/store/store";
import canvas from "@/modules/logic/canvas";
import * as paper from "paper" ;
export default function clean() {
    if (store.getters['cursorState/getCursorVisibility'])
        store.commit('cursorState/setCursorVisibility', false)
    const item=paper.project.activeLayer.children.find((el: any) => el.name === 'currentItem')
    console.log(item)
    if(item)
        item.remove()
  /*  this.activeLayer.children.filter(obj => (obj.name !== 'brushCursor' || obj.name !== 'pathCursor'));
    const element = canvas.activeLayer.find((el: any) => el.name() === 'activeNode');
    if (element && element[0]) {
        element[0].destroy();
    }*/
}
