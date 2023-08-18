import Canvas from "@/modules/logic/canvas";
import store from "@/modules/store/store";
import Konva from "konva";
import Stage = Konva.Stage;
import {KonvaEventObject} from "konva/lib/Node";
export default class cursorTool {
    selectionTypes: string[]
    contextMenuPos: {top?: number, bottom?: number, left?: number, right?: number}
    showContextMenu: boolean
    selector: Konva.Transformer
    canvas:Canvas
    selected:any
    constructor(canvas:Canvas) {
        this.selectionTypes=store.getters['cursorOptions/getSelectionTypes']
        this.contextMenuPos=store.getters['cursorOptions/getContextMenuPos']
        this.showContextMenu=store.getters['cursorOptions/getMenuFlag']
        this.canvas=canvas
        this.selector= new Konva.Transformer({
            anchorFill: "#fda443",
            enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            anchorStroke: "#fda443",
            borderStroke: "#fda443",
            padding:5
        })
        this.selected=null
        store.subscribe((mutation)=>{
            if(mutation.type=='setSelectedTool' && this.selected){
                this.removeSelect()
            }
        })
    }

    set(){
        store.commit('cursorState/setCursorStyle', 'default')
        this.canvas.activeLayer?.add(this.selector)
        // При клике на холсте
        this.canvas.stage?.on('click', (e:KonvaEventObject<MouseEvent>)=> {
            if(e.evt.button===2) return
            if(store.getters["cursorOptions/getMenuFlag"])
                store.commit('cursorOptions/setMenuFlag', false)
            if(this.selectionTypes.indexOf(e.target.attrs.data?.type)==-1) return
            if(!(e.target instanceof Stage) && (!this.selected || this.selected!=e.target)){
                store.commit('cursorState/setCursorStyle', 'grab')
                this.selected = e.target;
                this.selected.on('mouseenter touchstart',()=>{
                    store.commit('cursorState/setCursorStyle', 'grab')
                })
                this.selected.on('mouseleave touchend',()=>{
                    store.commit('cursorState/setCursorStyle', 'default')
                })
                this.selected.on('click',(e:KonvaEventObject<MouseEvent>)=>{
                    if (e.evt.button===2) {
                        const windowX = document.documentElement.clientWidth
                        const windowY = document.documentElement.clientHeight
                        this.contextMenuPos = {}
                        if ((windowX - e.evt.clientX) < 300)
                            this.contextMenuPos.right = windowX - e.evt.clientX
                        else
                            this.contextMenuPos.left = e.evt.clientX
                        if ((windowY - e.evt.clientY) < 300)
                            this.contextMenuPos.bottom = windowY - e.evt.clientY
                        else
                            this.contextMenuPos.top = e.evt.clientY
                        store.commit('cursorOptions/setMenuFlag', true)
                        store.commit('cursorOptions/setContextMenuPos', this.contextMenuPos)
                    }
                    else if(e.evt.button!==2 && store.getters["cursorOptions/getMenuFlag"])
                        store.commit('cursorOptions/setMenuFlag', false)
                })
                this.selected.on('dragstart',()=>{
                    if(store.getters["cursorOptions/getMenuFlag"])
                    store.commit('cursorOptions/setMenuFlag', false)
                })
                this.selected.setAttrs({draggable:true})
                this.selector.nodes([this.selected])
                store.commit('selectionOptions/setSelectedObject',this.selected)
                console.log(this.selected)
            }
            else{
               this.removeSelect()
            }
        });
        window.addEventListener('keydown',(e:KeyboardEvent)=>{
            if(!this.selector.nodes())  return
            if (e.keyCode === 46) {
                this.selector.nodes().forEach( (node)=>node.destroy())
                this.selector.nodes([])
                this.selected=null
                store.commit('selectionOptions/unsetSelectedObject')
                store.commit('cursorState/setCursorStyle', 'default')
            }})
    }
    removeSelect(){
        if(!this.selected) return
        this.selected.off()
        this.selected.setAttrs({draggable:false})
        store.commit('selectionOptions/unsetSelectedObject')
        this.selector.nodes([]);
    }
/*    contextMenuVisible(flag, position = null) {
	this.showContextMenu = flag
	let windowX = document.documentElement.clientWidth
	let windowY = document.documentElement.clientHeight
	if (flag) {

	}
	store.commit("cursorOptions/updateCursorOptions", this)
    }*/
}
