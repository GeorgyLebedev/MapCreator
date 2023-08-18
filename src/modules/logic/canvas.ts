import Konva from "konva";
import {KonvaEventObject} from "konva/lib/Node";
import {Vector2d} from "konva/lib/types";
import {zoom} from "@/modules/logic/zoom";
export default class canvas {
    private resoX: number
    public CSSwidth: number
    public defaultWidth: number
    private resoY: number
    public CSSheight: number
    public defaultHeight: number
    public scale: number
    private XtoY: number
    public offsetLeft: number
    public offsetTop: number
    private background: Konva.Layer | null
    public stage: Konva.Stage | null
    private readonly layersPool: Konva.Layer[]
    public activeLayer: Konva.Layer
    public backgroundLayer: Konva.Layer
    public topLayer: Konva.Layer

    constructor() {
        this.resoX = 0 // физическая ширина холста
        this.CSSwidth = 1 //видимая ширина холста
        this.defaultWidth = 1 //видимая ширина холста без увеличения/уменьшения
        this.resoY = 0 // физическая высота холста
        this.CSSheight = 1 //видимая высота холста
        this.defaultHeight = 1 //видимая высота холста без увеличения/уменьшения
        this.scale = 1 //значение масштабирования
        this.XtoY = 1 //соотношение сторон холста
        this.offsetLeft = 0 //отступ слева
        this.offsetTop = 0 //отступ сверху
        this.background = null //фон холста
        this.stage = null
        this.layersPool = []
        this.activeLayer = new Konva.Layer()
        this.topLayer = new Konva.Layer()
        this.backgroundLayer = new Konva.Layer()
    }

    setup(resolution: string, ref: string) {
        this.resoX = Number(resolution.split('x', 2)[0]) //установка ширины холста
        this.resoY = Number(resolution.split('x', 2)[1]) //установка высоты холста
        this.XtoY = this.resoX / this.resoY
        this.stage = new Konva.Stage({
            container: ref,
            width: this.resoX,
            height: this.resoY
        })

        this.layersPool.push(this.backgroundLayer)
        this.layersPool.push(this.activeLayer)
        this.layersPool.push(this.topLayer)
        this.stage.add(this.backgroundLayer)
        this.stage.add(this.activeLayer)
        this.stage.add(this.topLayer)
        this.backgroundLayer.zIndex(0)
        this.activeLayer.zIndex(1)
        this.topLayer.zIndex(2)
        this.backgroundLayer.listening(false)
        this.topLayer.listening(false)
        this.backgroundLayer.add(new Konva.Rect({
            x:0,
            y: 0,
            width: this.stage?.width(),
            height:this.stage?.height(),
            fill:"white"
        }))
        this.stage.on('wheel',(e)=>zoom(e, 0.2, undefined, this))
        	this.setDefaultSizes() //установка размеров по умолчанию
        /*
            this.resetCoords() //сброс координат в paper.js
            this.setBackground({type: "color", value:"#eeeeee"}) //установка фонового цвета*/
    }
    getCanvasArea() { //получение размеров доступной области для помещения холста
        return {
            width: document.getElementById('area')?.offsetWidth ?? 0,
            height: document.getElementById('area')?.offsetHeight ?? 0
        }
    }

    setDefaultSizes(){ //установка размеров холста по умолчанию
        if(!this.stage) return
        const area = this.getCanvasArea()
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
        else {
            this.defaultHeight=this.resoY
            this.defaultWidth=this.resoX
        }

        this.hardReset()
    }

    hardReset():void { //полный сброс холста
        this.scale = 1
        this.CSSwidth = this.defaultWidth
        this.CSSheight = this.defaultHeight
        const area = this.getCanvasArea()
        this.setTranslate(((area.width - this.defaultWidth) / 2), ((area.height - this.defaultHeight) / 2))
        this.resetCoords()
    }
    setTranslate(x:number, y:number) { //установка смещения холста по x и y
        if(!this.stage) return
        this.stage.container().style.transform = "translate(" + x + "px," + y + "px)"
        this.offsetLeft = x
        this.offsetTop = y
    }
    resetCoords():void {

    }
    /*
       resetScale() { //сброс масштабирования
       this.scale = 1
       this.CSSwidth = this.defaultWidth
       this.CSSheight = this.defaultHeight
       this.resetCoords()
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
       }*/
}
