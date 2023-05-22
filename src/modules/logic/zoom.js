import paper from "paper";

export function zoom(e, step = 0, mode = null, canvas){
    let event = window.event || e
    let newX, newY
    let canvasPoint = {
	x: null,
	y: null
    }
    let cObj = canvas
    let scale = cObj.scale
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
	canvasPoint.x = event.pageX - cObj.offsetLeft
	canvasPoint.y = event.pageY - cObj.offsetTop
	newX = canvasPoint.x - canvasPoint.x * ((scale + step) / scale)
	newY = canvasPoint.y - canvasPoint.y * ((scale + step) / scale)
	if (scale + step < 0.2 || scale + step > 5) return
	scale += step
	scale = Number(scale.toFixed(2))
    }
    if (mode == "=") {
	canvasPoint.x = document.documentElement.clientWidth / 2 - cObj.offsetLeft
	canvasPoint.y = document.documentElement.clientHeight / 2 - cObj.offsetTop
	newX = canvasPoint.x - canvasPoint.x * (step / scale)
	newY = canvasPoint.y - canvasPoint.y * (step / scale)
	scale = step
    }
    cObj.CSSheight = cObj.defaultHeight * scale
    cObj.CSSwidth = cObj.defaultWidth * scale
    paper.view.zoom = scale
    paper.view.viewSize = new paper.Size(cObj.CSSwidth, cObj.CSSheight)
    paper.view.center = new paper.Point(0, 0)
    cObj.scale = scale
    newX=cObj.offsetLeft + newX
    newY=cObj.offsetTop + newY
    cObj.ref.style.transform = "translate(" + newX + "px," + newY + "px)"
    cObj.offsetLeft = newX
    cObj.offsetTop = newY
}
