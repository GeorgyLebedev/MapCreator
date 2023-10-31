import paper from "paper";
export default class canvas {
    constructor() {
	this.ref= null //ссылка на html-элемент canvas
	this.error="" //информация об ошибке
	this.resoX= 0 // физическая ширина холста
	this.CSSwidth= 1 //видимая ширина холста
	this.defaultWidth= 1 //видимая ширина холста без увеличения/уменьшения
	this.resoY= 0 // физическая высота холста
	this.CSSheight= 1 //видимая высота холста
	this.defaultHeight= 1 //видимая высота холста без увеличения/уменьшения
	this.scale= 1 //значение масштабирования
	this.XtoY= 1 //соотношение сторон холста
	this.offsetLeft= 0 //отступ слева
	this.offsetTop= 0 //отступ сверху
	this.background=null //фон холста
	this.backgroundOpt=null //параметры фона
    }
    setup(resolution, ref){
	this.ref=ref
	this.resoX = resolution.split('x', 2)[0] //установка ширины холста
	this.resoY = resolution.split('x', 2)[1] //установка высоты холста
	this.XtoY = this.resoX / this.resoY
	paper.setup(this.ref) //установка холста в paper.js
	this.setDefaultSizes() //установка размеров по умолчанию
	this.resetCoords() //сброс координат в paper.js
	this.setBackground({type: "color", value:"#eeeeee"}) //установка фонового цвета
    }
    resetCoords() {
	paper.view.zoom = 1 //масштабирование области просмотра
	paper.view.viewSize = new paper.Size(this.CSSwidth, this.CSSheight) //размер области просмотра равен видимому размеру холста
	paper.view.center = new paper.Point(0, 0) //координаты центра области просмотра в точке (0,0)
    }
    resetScale() { //сброс масштабирования
	this.scale = 1
	this.CSSwidth = this.defaultWidth
	this.CSSheight = this.defaultHeight
	this.resetCoords()
    }
    getCanvasArea() { //получение размеров доступной области для помещения холста
	let canvasArea = {
	    width: document.documentElement.clientWidth - document.getElementById('tools-panel').offsetWidth,
	    height: document.documentElement.clientHeight - document.getElementById('footer').offsetHeight - document.getElementById('header').offsetHeight
	}
	return canvasArea
    }
    setTranslate(x, y) { //установка смещения холста по x и y
	this.ref.style.transform = "translate(" + x + "px," + y + "px)"
	this.offsetLeft = x
	this.offsetTop = y
    }
    hardReset() { //полный сброс холста
	this.scale = 1
	this.CSSwidth = this.defaultWidth
	this.CSSheight = this.defaultHeight
	let area = this.getCanvasArea()
	this.setTranslate(((area.width - this.defaultWidth) / 2), ((area.height - this.defaultHeight) / 2))
	this.resetCoords()
    }
    setDefaultSizes(){ //установка размеров холста по умолчанию
	let area = this.getCanvasArea()
	//холст чаще всего подгоняется под доступную область по высоте
	//чтобы при масштабировании в 1 он был виден полностью
	if ((this.resoX>area.width || this.resoX<area.width ) && this.resoY>area.height) { //сравниваем размеры холста и доступной областью отображения
	    this.defaultHeight = area.height
	    this.defaultWidth = this.defaultHeight * this.XtoY
	}
	else if(this.resoX>area.width && this.resoY<area.height){
	    this.defaultWidth=area.width
	    this.defaultHeight=this.defaultWidth / this.XtoY
	}
	//если холст меньше доступной области, то его размеры по умолчанию равны его физическим размерам
	else {
	    this.defaultHeight=this.resoY
	    this.defaultWidth=this.resoX
	}
	this.hardReset()
	if(this.background) //если есть фон, обновить его отображение
	    this.updateBackground()
    }
    setBackground(background){ //установка фона
	this.removeBackground() //если фон есть, удаляем
	if(background.type=="color"){ //если тип фона -цвет
	    this.background = new paper.Layer({ //тогда рисуем слой с прямоугольником размером с холст с заданным цветом
		children: [new paper.Path.Rectangle({
		    point: new paper.Point(-this.CSSwidth / 2, -this.CSSheight / 2),
		    size: paper.view.viewSize,
		    fillColor: background.value,
		    name: "backgroundRectangle"
		})],
		position: paper.view.center
	    })
	    paper.project.addLayer(this.background)//добавляем слой на холст
	    this.background.sendToBack() //и отправляем на задний план
	}
	if(background.type=="image"){ //если тип фона - изображение
	    if(background.loadMode=="integrate") { //и тип загрузки - подгонка холста
		this.resoX=background.width //ширина холста равна ширине изображения
		this.resoY=background.height //высота холста равна  высоте изображения
		this.XtoY=this.resoX/this.resoY //пересчитываем соотношение сторон
		this.setDefaultSizes() //выставляем новые значения как значения по умолчанию
	    }
	    this.background = new paper.Layer({ //добавляем слой с изображением
		children: [new paper.Raster({
		    source: background.source,
		    position: paper.view.center,
		    name: "backgroundRectangle"
		})],
		position: paper.view.center
	    })
	    //подгоняем его под размеры по умолчанию
	    this.background.children["backgroundRectangle"].scale(this.defaultWidth/this.resoX, this.defaultHeight/this.resoY)
	    if(background.loadMode=="stretch") { //если тип загрузки - подгонка изображения
		this.background.children["backgroundRectangle"].scale( //масштабируем его относительно размеров холста
		    this.resoX/background.width,
		    this.resoY/background.height,
		)
	    }
	    paper.project.addLayer(this.background)//добавляем слой на холст
	    this.background.sendToBack()//и отправляем на задний план
	}
    }
    updateBackground(){ //перерисовка фона
	if(!this.background) return
	if(this.background.children["backgroundRectangle"].fillColor) {
	    let color = this.background.children["backgroundRectangle"].fillColor
	    this.background.children["backgroundRectangle"].remove()
	    let newRectangle = new paper.Path.Rectangle({
		point: new paper.Point(-this.CSSwidth / 2, -this.CSSheight / 2),
		size: paper.view.viewSize,
		fillColor: color,
		name: "backgroundRectangle"
	    })
	    this.background.addChild(newRectangle)
	}
	if(this.background.children["backgroundRectangle"].source){
	    this.background.children["backgroundRectangle"].matrix= new paper.Matrix()
	    this.background.children["backgroundRectangle"].scale(this.defaultWidth/this.resoX, this.defaultHeight/this.resoY)
	}
    }
    removeBackground(){ //удаление фона
	if(this.background) this.background.remove()
    }
    loadProject(jsonData){ //загрузка внешнего json-файла
	try{
	    paper.project.importJSON(jsonData)
	}
	catch (e) {
	    this.error=e
	    return
	}
	paper.project.clear() //если ошибок при загрузке не было, полностью очищаем холст
	paper.project.importJSON(jsonData) //и повторяем загрузку
    }
}
