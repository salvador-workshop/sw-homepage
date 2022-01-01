import sample from "lodash/sample"

import RjQueue from "./rj-queue"

class GridQueue {
  constructor(width, length, availableValues) {
    this._queue = new RjQueue()
    this._width = width
    this._length = length
    this._availableValues = availableValues

    for (let i = 0; i < length; i++) {
      this._queue.enqueue(this.createNewRow())
    }
  }

  createNewRow() {
    const arr = []
    for (let i = 0; i < this._width; i++) {
      arr.push(sample(this._availableValues))
    }
    return arr
  }

  update() {
    this._queue.dequeue()
    this._queue.enqueue(this.createNewRow())
  }

  toString() {
    return this._queue.toString()
  }

  toArray() {
    return this._queue.toArray()
  }
}

export default GridQueue
