import { Mesh } from "three"
import utils from "./three-utils"

class Box {
  constructor(length = 0, width = 0, x = 0, y = 0) {
    this.id = Math.random().toString(36).substring(7).toUpperCase()
    this.mesh = {}
    this.x = x
    this.y = y
    this.length = length
    this.width = width
  }
}

class InfiniteBoxes {
  constructor(
    totalLength,
    numBoxes,
    width,
    y = 0,
    movePositive = false,
    gutter = 1
  ) {
    this.totalLength = totalLength
    this.boxes = []
    this.gutter = gutter
    this.movePos = movePositive

    const min = (totalLength / numBoxes) * 0.7
    const boxLengths = utils.splitRough(totalLength, numBoxes, min)
    let startingX = 0
    for (let len of boxLengths) {
      this.boxes.push(new Box(len, width, startingX, y))
      startingX += len + this.gutter
    }
  }

  moveBoxes() {
    let boxEdges
    let sortedEdges
    let maxX
    let limitReached
    let xVal
    for (let box of this.boxes) {
      xVal = this.movePos ? 0.6 : -0.6
      box.x += xVal

      if (this.movePos) {
        limitReached =
          box.x > this.totalLength + this.gutter * this.boxes.length
      } else {
        limitReached = box.x < 0
      }

      if (limitReached) {
        if (this.movePos) {
          box.x = 0
        } else {
          boxEdges = this.boxes.map(box => {
            return box.length + box.x
          })
          sortedEdges = boxEdges.sort((a, b) => {
            return b - a
          })
          maxX = sortedEdges[0]
          box.x = maxX + this.gutter
        }
      }
      box.mesh.position.set(box.x + box.length / 2, 0, box.y)
    }
  }
}

export default InfiniteBoxes
