class RjQueue {
  constructor() {
    this._array = []
  }

  enqueue(val) {
    this._array.push(val)
  }

  dequeue() {
    if (!this.isEmpty()) {
      const poppedVal = this._array[0]
      this._array = this._array.slice(1, this._array.length)
      return poppedVal
    }
    return null
  }

  peek() {
    if (!this.isEmpty()) {
      const poppedVal = this._array[0]
      return poppedVal
    }
    return null
  }

  isEmpty() {
    return this._array.length === 0
  }

  toArray() {
    return this._array.slice(0)
  }

  toString() {
    return JSON.stringify(this.toArray(), null, 2)
  }
}

export default RjQueue
