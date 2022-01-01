/** Class representing an object that can be drawn on screen. */
class Obj {
  constructor(x, y, w = 0, l = 0) {
    this.id = this.generateId()
    this.x = x
    this.y = y
    this.w = w
    this.l = l

    this.params = []
  }

  generateId() {
    const str1 = Math.random().toString(36).substring(7)
    const str2 = Math.random().toString(36).substring(7)
    return str1 + str2
  }

  /**
   * Updates object params based on given inputs
   *
   * @param {(number[]\|number)} input - one or more numbers between 0 and 1
   */
  update(input) {
    const maxDist = this.l > this.w ? this.w : this.l
    const getRandomPointNearby = input => {
      // input is between 0 and 1
      const limitedInput = input * 0.5
      const res = (2 * limitedInput - 1) / Math.sqrt(2)
      return res * maxDist
    }
    this.x = this.x + getRandomPointNearby(input)
    this.y = this.y + getRandomPointNearby(input)
  }
}

class FuzzyGrid {
  constructor(objConstructor, width, length, xUnits, yUnits) {
    this._initGrid = [] // two-dimensional array
    this._initList = [] // simple array
    this.list = []
    this.objConstructor = objConstructor // constructor for objects

    const unitWidth = width / (xUnits + 1)
    const unitLength = length / (xUnits + 1)

    let objRow
    let newObj

    for (let i = 1; i <= xUnits + 1; i++) {
      objRow = []
      for (let j = 1; j <= yUnits + 1; j++) {
        newObj = new Obj(i * unitWidth, j * unitLength, unitWidth, unitLength)
        objRow.push(newObj)
        this._initList.push(newObj)
      }
      this._initGrid.push(objRow)
    }

    this._randomizeObjects()

    // build external objects from inner ones
    this._initList.forEach(initItem => {
      this.list.push(this.objConstructor(initItem.x, initItem.y, initItem.w))
    })
  }

  _updateObjects(input) {
    for (let obj of this._initList) {
      obj.update(input)
    }
  }

  _randomizeObjects() {
    for (let obj of this._initList) {
      obj.update(Math.random())
    }
  }

  apply(func) {
    for (let obj of this.list) {
      func(obj)
    }
  }
}

export default FuzzyGrid
