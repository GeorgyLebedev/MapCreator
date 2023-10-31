import * as paper from "paper" ;
import store from "@/modules/store/store";
import clean from "@/modules/services/canvasCleaner";
import iCursor from "@/components/mapCanvas/toolsPanel/cursorPanel/iCursor";

export default class cursorTool implements iCursor {
    selectionTypes: string[]
    contextMenuPos: { top?: number, bottom?: number, left?: number, right?: number }
    showContextMenu: boolean
    selected: any
    instance: paper.Tool

    constructor() {
        this.selectionTypes = store.getters['cursorOptions/getSelectionTypes']
        this.contextMenuPos = store.getters['cursorOptions/getContextMenuPos']
        this.showContextMenu = store.getters['cursorOptions/getMenuFlag']
        this.instance = new paper.Tool()
        store.subscribe((mutation) => {
            if (mutation.type.startsWith("cursorOptions/")) {
                Object.assign(this, store.getters['cursorOptions/getCursorOptions'])
                this.set()
            }
        })
        if (store.getters.getSelectedToolName == "cursor")
            this.set()
    }

    set() {
        clean()
        store.commit('cursorState/setCursorStyle', 'default')
        this.instance.onMouseDown = (e: any) => {
            if (this.showContextMenu) store.commit('cursorOptions/setMenuFlag', false)
            const obj = e.item //получаем объект при клике
            if (obj?.id == store.getters['selection/getSelectionGroup']?.id) return
            if (store.getters['selection/getSelectedItem'] && obj != store.getters['selection/getSelectedItem'])
                store.commit('selection/removeSelectedItem')
            if (!obj || obj.name == "backgroundRectangle") return //если объекта нет или он не принадлежит текущему слою
            if (obj && this.selectionTypes.indexOf(obj?.data?.type) == -1) return //если тип объекта не выбран в опциях
            if ((obj.id == store.getters["selection/getSelectedItem"]?.id) && (e.event.which == 3))
                this.contextMenuVisible(true, e.event)
            store.commit('selection/setSelectedItem', obj)
        }
        this.instance.onKeyDown = (event: paper.KeyEvent) => {
            if (event.key == 'delete' && store.getters["selection/getSelectedItem"]) {
                this.removeItem(store.getters["selection/getSelectedItem"])
            }
            if (event.key == 'escape' && store.getters["selection/getSelectedItem"]) {
                store.commit('selection/removeSelectedItem')
            }
        }
        store.commit("updateSelectedTool", this)
    }

    activate() {
        this.set()
        this.instance.activate()
    }

    copyItem(item = store.getters["selection/getSelectedItem"]) {
        if (!item) return
        const newItem = item.clone()
        newItem.position.x += 20
        newItem.position.y += 20
        if (item.data.type)
            newItem.data.type = item.data.type
        paper.project.activeLayer.addChild(newItem)
        store.commit('selection/removeSelectedItem')
        store.commit('selection/setSelectedItem', newItem)
        store.commit('addChanges')
    }

    removeItem(item = store.getters["selection/getSelectedItem"]) {
        if (!item) return
        store.commit('selection/removeSelectedItem')
        item.remove()
        store.commit('addChanges')
    }

    setToFront(item = store.getters["selection/getSelectedItem"]) {
        if (!item) return
        store.commit('selection/removeSelectedItem')
        item.bringToFront()
        store.commit('selection/setSelectedItem', item)
        store.commit('addChanges')
    }

    setToBack(item = store.getters["selection/getSelectedItem"]) {
        if (!item) return
        store.commit('selection/removeSelectedItem')
        item.sendToBack()
        store.commit('selection/setSelectedItem', item)
        store.commit('addChanges')
    }

    contextMenuVisible(flag: boolean, position: null | { clientX: number, clientY: number } = null) {
        this.showContextMenu = flag
        const windowX = document.documentElement.clientWidth
        const windowY = document.documentElement.clientHeight
        if (flag && position) {
            this.contextMenuPos = {}
            if ((windowX - position.clientX) < 300)
                this.contextMenuPos.right = windowX - position.clientX
            else
                this.contextMenuPos.left = position.clientX
            if ((windowY - position.clientY) < 300)
                this.contextMenuPos.bottom = windowY - position.clientY
            else
                this.contextMenuPos.top = position.clientY
        }
    }
}
