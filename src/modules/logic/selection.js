import paper from "paper";

export default class selection {
    constructor(canvas) {
        this.selectedObject=undefined
        this.selectionGroup=undefined
        this.canvas=canvas
    }
    set(item){
        if (this.selectionGroup || this.selectedObject)
            this.remove()
        this.selectionGroup = this.build(new paper.Group(), item)
        this.selectedObject = item
    }
    remove() {
        if (!this.selectedObject) return
        this.selectedObject.onMouseUp = this.selectedObject.onMouseDown = this.selectedObject.onMouseLeave = this.selectedObject.onMouseEnter = this.selectedObject.onMouseDrag = undefined
        this.selectionGroup.removeChildren()
        this.selectionGroup.remove()
        this.selectionGroup = undefined
        this.selectedObject=undefined
        this.canvas.styleCursor="default"
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
            this.canvas.styleCursor = 'grab'
        }
        item.onMouseLeave = () => {
            this.canvas.styleCursor = 'default'
        }
        item.onMouseDown = () => {
            this.canvas.styleCursor = 'grabbing'
        }
        item.onMouseUp = () => {
            this.canvas.styleCursor = 'grab'
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
                this.canvas.styleCursor = "default"
            }
            if (corner == 'topLeft' || corner == 'bottomRight') {
                boundSq.onMouseEnter = () => {
                    this.canvas.styleCursor = 'nwse-resize'
                }
            } else {
                boundSq.onMouseEnter = () => {
                    this.canvas.styleCursor = 'nesw-resize'
                }
            }
            group.addChild(boundSq)
        })
        let sqArray = [group.children['1corner'], group.children['2corner'], group.children['3corner'], group.children['4corner']]
       /* let brWidth = 0
        let brHeight = 0*/
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
                    item.set({
                        matrix: new paper.Matrix()
                    });
                    item.source = require('@/assets/Stamps/firstSet/stampEx.svg')
                    item.position=group.position
                    item.size=oldSize
                }
            }
        })
        boundCircle.onMouseLeave = () => {
            this.canvas.styleCursor = "default"
        }
        boundCircle.onMouseEnter = () => {
            this.canvas.styleCursor= 'url(' + require('@/assets/images/Service/rotate.png') + '), auto'
        }
        boundCircle.onMouseDown = (event) => {
            rotateStart = new paper.Point({
                x: event.point.x - boundCircle.position.x,
                y: event.point.y - boundCircle.position.y
            })
        }
        boundCircle.onMouseUp = () => {
            angle = undefined
         /*   if (item.data.type == 'stamp') {
                item = this.reRender(item, item.size)
                this.setSelected(item)
            }
            event.stop()*/
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
