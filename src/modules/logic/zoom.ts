import {KonvaEventObject} from "konva/lib/Node";
import Canvas from "@/modules/logic/canvas";
import {Vector2d} from "konva/lib/types";
export function zoom(e: KonvaEventObject<WheelEvent>, step: number = 0, mode: undefined | string = undefined, canvas:Canvas): void {
    console.time('zoom')
    if(!canvas.stage) return
    e.evt.preventDefault()
    let newX, newY
    const canvasPoint = {
        x: 0,
        y: 0
    }
    let scale = canvas.scale
    if (!mode)
        mode = e.evt.deltaY > 0 ? "+" : "-"
    switch (mode) {
        case "+":
            step = Math.abs(step)
            break
        case "-":
            step = -step
            break
        case "=":
            break
    }
    if (mode == "+" || mode == "-") {
        canvasPoint.x = e.evt.pageX - canvas.offsetLeft
        canvasPoint.y = e.evt.pageY - canvas.offsetTop
        newX = canvasPoint.x - canvasPoint.x * ((scale + step) / scale)
        newY = canvasPoint.y - canvasPoint.y * ((scale + step) / scale)
        if (scale + step < 0.2 || scale + step > 5) return
        scale += step
        scale = Number(scale.toFixed(2))
    }
    else {
        canvasPoint.x = document.documentElement.clientWidth / 2 - canvas.offsetLeft
        canvasPoint.y = document.documentElement.clientHeight / 2 - canvas.offsetTop
        newX = canvasPoint.x - canvasPoint.x * (step / scale)
        newY = canvasPoint.y - canvasPoint.y * (step / scale)
        scale = step
    }
    canvas.activeLayer.listening(false)
    canvas.stage.height( canvas.defaultHeight * scale)
    canvas.stage.width( canvas.defaultWidth * scale)
    canvas.stage.scale({x:scale, y:scale})
    canvas.scale = scale
    newX=canvas.offsetLeft + newX
    newY=canvas.offsetTop + newY
    canvas.stage.container().style.transform = "translate(" + newX + "px," + newY + "px)"
    canvas.offsetLeft = newX
    canvas.offsetTop = newY
    canvas.activeLayer.listening(true)
    console.timeEnd('zoom')
}
