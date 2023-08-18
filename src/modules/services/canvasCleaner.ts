import Canvas from "@/modules/logic/canvas";
import Konva from "konva";
import store from "@/modules/store/store";

export default function clean(canvas: Canvas, selector?: Konva.Transformer) {
    canvas.stage?.off('mousedown')
    canvas.stage?.off('mousemove')
    canvas.stage?.off('mouseup')
    if (store.getters['cursorState/getCursorVisibility'])
        store.commit('cursorState/setCursorVisibility', false)
    const element = canvas.activeLayer.find((el: any) => el.name() === 'activeNode');
    if (element && element[0]) {
        element[0].destroy();
    }
}

