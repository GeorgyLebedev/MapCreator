import paper from "paper";
import store from "@/modules/store/store";
export default class selectionLogic {
    constructor() {
        this.selectedObject=undefined
        this.selectionGroup=undefined
        store.subscribe((mutation)=>{
            if(mutation.type=="selection/removeSelection"){
                this.remove()
            }
        })
    }
    set(item){
        if (this.selectionGroup || this.selectedObject)
            this.remove()
        this.selectionGroup = this.build(new paper.Group(), item)
        store.commit("selection/setSelectionGroup",this.selectionGroup)
        this.selectedObject = item
        store.commit("selection/setSelectedObject",this.selectedObject)
    }
    remove() {
        if (!this.selectedObject) return
        this.selectedObject.onMouseUp = this.selectedObject.onMouseDown = this.selectedObject.onMouseLeave = this.selectedObject.onMouseEnter = this.selectedObject.onMouseDrag = undefined
        this.selectionGroup.removeChildren()
        this.selectionGroup.remove()
        this.selectionGroup = undefined
        this.selectedObject=undefined
        store.commit("selection/removeSelection")
        store.commit('setCursorStyle', 'default')
    }
    build(group, item){
        if(!item) return
        let rotateStart, rotateEnd, angle = 0
        let boundRect = new paper.Path.Rectangle({
            rectangle: item.strokeBounds,
            strokeColor: '#42aaff',
            strokeWidth: 1,
            name: "rect"
        })
        let boundCircleFull = new paper.Path.Circle({
            center: boundRect.position,
            radius: Math.sqrt((item.strokeBounds.width * item.strokeBounds.width + item.strokeBounds.height * item.strokeBounds.height)) / 2,
            strokeColor: "#000000",
            fillColor: "#000000",
            strokeWidth: 0.001,
            opacity: 1e-6,
            name: "circle"
        })
        let boundCircle = boundCircleFull.exclude(boundRect)
        boundCircleFull.remove()
        item.onMouseEnter = () => {
            store.commit('setCursorStyle', 'grab')
        }
        item.onMouseLeave = () => {
            store.commit('setCursorStyle', 'default')
        }
        item.onMouseDown = () => {
            store.commit('setCursorStyle', 'grabbing')
        }
        item.onMouseUp = () => {
            store.commit('setCursorStyle', 'grab')
        }
        let corners = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft']
        let twoLast = []
        const baseCoef = boundRect.bounds['bottomRight'].getDistance(boundRect.bounds['topLeft'])
        group.removeChildren()
        corners.forEach((corner, index) => {
            let boundSq = new paper.Path.Rectangle({
                width: 10,
                height: 10,
                position: boundRect.bounds[corner],
                fillColor: "#42aaff",
                name: (index + 1) + "corner"
            })
            boundSq.bringToFront()
            boundSq.onMouseLeave = () => {
                store.commit('setCursorStyle', 'default')
            }
            if (corner == 'topLeft' || corner == 'bottomRight') {
                boundSq.onMouseEnter = () => {
                    store.commit('setCursorStyle', 'nwse-resize')
                }
            } else {
                boundSq.onMouseEnter = () => {
                    store.commit('setCursorStyle',  'nesw-resize')
                }
            }
            group.addChild(boundSq)
        })
        let sqArray = [group.children['1corner'], group.children['2corner'], group.children['3corner'], group.children['4corner']]
        sqArray.forEach((square, index) => {
            square.onMouseDrag = (event) => {
                square.position = event.point
                square.data.oppositeSq = (sqArray[index + 2]) ? sqArray[index + 2].position : sqArray[index - 2].position
                corners.forEach((corner, i) => {
                    sqArray[i].position = boundRect.bounds[corner]
                })
                switch (index) {
                    case 0:
                        if (event.point.x > square.data.oppositeSq.x || event.point.y > square.data.oppositeSq.y)
                            return
                        break;
                    case 1:
                        if (event.point.x < square.data.oppositeSq.x || event.point.y > square.data.oppositeSq.y)
                            return
                        break;
                    case 2:
                        if (event.point.x < square.data.oppositeSq.x || event.point.y < square.data.oppositeSq.y)
                            return
                        break;
                    case 3:
                        if (event.point.x > square.data.oppositeSq.x || event.point.y < square.data.oppositeSq.y)
                            return
                        break;
                }
                let scaleFactor = (square.data.oppositeSq.getDistance(event.point)) / (baseCoef)
                if (twoLast.length < 2) {
                    twoLast.push(scaleFactor)
                    item.scale(1 / twoLast[0], square.data.oppositeSq)
                    item.scale(scaleFactor, square.data.oppositeSq)
                } else {
                    item.scale(1 / twoLast[0], square.data.oppositeSq)
                    item.scale(twoLast[1], square.data.oppositeSq)
                    twoLast[0] = twoLast[1]
                    twoLast[1] = scaleFactor
                }
                group.removeChildren()
                group = this.build(group, item)
            }
            square.onMouseUp = () => {
                twoLast = []
                if (item.data.type == 'stamp') {
                    let oldSize=item.bounds.size
                    let rotate=item.rotation?item.rotation:0
                    item.matrix= new paper.Matrix()
                    item.source = item.data.stamp
                    item.position=group.position
                    item.rotation=rotate
                    item.size=oldSize
                }
            }
        })
        boundCircle.onMouseLeave = () => {
            store.commit('setCursorStyle', 'default')
        }
        boundCircle.onMouseEnter = () => {
            store.commit('setCursorStyle', 'url(' + require('@/assets/images/Service/rotate.png') + '), auto')
        }
        boundCircle.onMouseDown = (event) => {
            rotateStart = new paper.Point({
                x: event.point.x - boundCircle.position.x,
                y: event.point.y - boundCircle.position.y
            })
        }
        boundCircle.onMouseUp = () => {
            angle = undefined
        }
        boundCircle.onMouseDrag = (event) => {
            if (angle) {
                item.rotation -= angle
                item.position = boundRect.position
            }
            rotateEnd = new paper.Point({
                x: event.point.x - boundCircle.position.x,
                y: event.point.y - boundCircle.position.y
            })
            angle = rotateStart.getDirectedAngle(rotateEnd)
            item.rotation += angle
            group.removeChildren()
            group = this.build(group, item)
            item.position = boundRect.position
        }
        item.onMouseDrag = (event) => {
            item.position.x += event.delta.x
            item.position.y += event.delta.y
            group.position.x += event.delta.x
            group.position.y += event.delta.y
        }
        group.addChild(boundRect)
        group.addChild(boundCircle)
        group.bringToFront()
        return group
    }
}
