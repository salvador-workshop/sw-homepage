class GridUnit {
  constructor(x, y, xCenter, yCenter) {
    this.id = this.generateId()
    this.x = x
    this.y = y
    this.xCenter = xCenter
    this.yCenter = yCenter
    this.intensity1 = 0
    this.intensity2 = 0
  }

  generateId() {
    const str1 = Math.random().toString(36).substring(7)
    const str2 = Math.random().toString(36).substring(7)
    return str1 + str2
  }
}

class DynamicGrid {
  constructor(boxWidth, boxHeight, unitSize) {
    this.grid = []
    this.gridCollapsed = []

    const xPadding = boxWidth % unitSize
    const yPadding = boxHeight % unitSize

    this.xUnits = (boxWidth - xPadding) / unitSize
    this.yUnits = (boxHeight - yPadding) / unitSize

    let x
    let y
    let half
    let gUnit

    for (let i = 0; i < this.xUnits; i++) {
      this.grid.push([])
      for (let j = 0; j < this.yUnits; j++) {
        x = unitSize * i + xPadding / 2
        y = unitSize * j + yPadding / 2
        half = unitSize / 2
        gUnit = new GridUnit(x, y, x + half, y + half)
        this.grid[i].push(gUnit)
        this.gridCollapsed.push(gUnit)
      }
    }
  }

  applyFunc(func) {
    for (let gridRow of this.grid) {
      for (let gridUnit of gridRow) {
        func(gridUnit)
      }
    }
  }

  getGridAsArray() {
    return this.gridCollapsed
  }
}

export default DynamicGrid
