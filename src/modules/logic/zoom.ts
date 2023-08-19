import paper from "paper";
import canvas from "@/modules/logic/canvas";

export function zoom(e:any, step = 0, mode:string|null = null, canvas:canvas){
    const event = window.event || e
    let newX, newY
    const canvasPoint = {
	x: 0,
	y: 0
    }
    let scale = canvas.scale
    if (!mode)
	mode = event.wheelDelta > 0 ? "+" : "-"
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
	canvasPoint.x = event.pageX - canvas.offsetLeft
	canvasPoint.y = event.pageY - canvas.offsetTop
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
    canvas.CSSheight = canvas.defaultHeight * scale
    canvas.CSSwidth = canvas.defaultWidth * scale
    paper.view.zoom = scale
    paper.view.viewSize = new paper.Size(canvas.CSSwidth, canvas.CSSheight)
    paper.view.center = new paper.Point(0, 0)
    canvas.scale = scale
    newX=canvas.offsetLeft + newX
    newY=canvas.offsetTop + newY
    canvas.ref.style.transform = "translate(" + newX + "px," + newY + "px)"
    canvas.offsetLeft = newX
    canvas.offsetTop = newY
}
