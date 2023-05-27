import paper from "paper";
export default class canvas {
    constructor() {
	this.ref= null
	this.error=""
	this.resoX= 0
	this.CSSwidth= 1
	this.defaultWidth= 1
	this.resoY= 0
	this.CSSheight= 1
	this.defaultHeight= 1
	this.scale= 1
	this.XtoY= 1
	this.offsetLeft= 0
	this.offsetTop= 0
	this.background=null
	this.backgroundOpt=null
    }
    setup(resolution, ref){
        this.ref=ref
	this.resoX = resolution.split('x', 2)[0]
	this.resoY = resolution.split('x', 2)[1]
	this.XtoY = this.resoX / this.resoY
	paper.setup(this.ref)
	this.setDefaultSizes()
	this.resetCoords()
	this.setBackground({type: "color", value:"#eeeeee"})
    }
    resetCoords() {
	paper.view.zoom = 1
	paper.view.viewSize = new paper.Size(this.CSSwidth, this.CSSheight)
	paper.view.center = new paper.Point(0, 0)
    }
    resetScale() {
	this.scale = 1
	this.CSSwidth = this.defaultWidth
	this.CSSheight = this.defaultHeight
	this.resetCoords()
    }
    getCanvasArea() {
	let canvasArea = {
	    width: document.documentElement.clientWidth - document.getElementById('toolsPanel').offsetWidth,
	    height: document.documentElement.clientHeight - document.getElementById('footer').offsetHeight - document.getElementById('header').offsetHeight
	}
	return canvasArea
    }
    setTranslate(x, y) {
	this.ref.style.transform = "translate(" + x + "px," + y + "px)"
	this.offsetLeft = x
	this.offsetTop = y
    }
    hardReset() {
	this.scale = 1
	this.CSSwidth = this.defaultWidth
	this.CSSheight = this.defaultHeight
	let area = this.getCanvasArea()
	this.setTranslate(((area.width - this.defaultWidth) / 2), ((area.height - this.defaultHeight) / 2))
	this.resetCoords()
    }
    setDefaultSizes(){
	let area = this.getCanvasArea()
	if ((this.resoX>area.width || this.resoX<area.width ) && this.resoY>area.height) {
	    this.defaultHeight = area.height
	    this.defaultWidth = this.defaultHeight * this.XtoY
	}
	else if(this.resoX>area.width && this.resoY<area.height){
	    this.defaultWidth=area.width
	    this.defaultHeight=this.defaultWidth / this.XtoY
	}
	else {
	    this.defaultHeight=this.resoY
	    this.defaultWidth=this.resoX
	}
	this.hardReset()
	if(this.background)
	    this.updateBackground()
    }
    setBackground(background){
	if(this.background) this.background.remove()
        if(background.type=="color"){
	    this.background = new paper.Layer({
		children: [new paper.Path.Rectangle({
		    point: new paper.Point(-this.CSSwidth / 2, -this.CSSheight / 2),
		    size: paper.view.viewSize,
		    fillColor: background.value,
		    name: "backgroundRectangle"
		})],
		position: paper.view.center
	    })
	    paper.project.addLayer(this.background)
	    this.background.sendToBack()
	}
	if(background.type=="image"){
	    if(background.loadMode=="integrate") {
		this.removeBackground()
		this.resoX=background.width
		this.resoY=background.height
		this.XtoY=this.resoX/this.resoY
		this.setDefaultSizes()
	    }
	    this.background = new paper.Layer({
		children: [new paper.Raster({
		    source: background.source,
		    position: paper.view.center,
		    name: "backgroundRectangle"
		})],
		position: paper.view.center
	    })
	    if(background.loadMode=="stretch") {
		this.background.children["backgroundRectangle"].scale(
		    this.resoX/background.width,
		    this.resoY/background.height,
		    )
	    }
	    paper.project.addLayer(this.background)
	    this.background.sendToBack()
	}
    }
    updateBackground(){
        if(!this.background) return
        let color=this.background.children["backgroundRectangle"].fillColor
	this.background.children["backgroundRectangle"].remove()
	let newRectangle= new paper.Path.Rectangle({
	    point: new paper.Point(-this.CSSwidth / 2, -this.CSSheight / 2),
	    size: paper.view.viewSize,
	    fillColor: color,
	    name: "backgroundRectangle"
	})
      	this.background.addChild(newRectangle)
    }
    removeBackground(){
	if(this.background)this.background.remove()
    }
    loadProject(jsonData){
        try{
            paper.project.importJSON(jsonData)
	}
	catch (e) {
            this.error=e
	    return
	}
	paper.project.clear()
	paper.project.importJSON(jsonData)
    }
}
