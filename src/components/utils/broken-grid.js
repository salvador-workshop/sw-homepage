import utils from './three-utils';

class Box {
  constructor(x, y, w, h) {
    this.id = this.generateId();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.intensity1 = 1;
    this.intensity2 = 0;
    this.intensity3 = 0;
  }

  generateId() {
    const str1 = Math.random()
      .toString(36)
      .substring(7);
    const str2 = Math.random()
      .toString(36)
      .substring(7);
    return str1 + str2;
  }
}

class BrokenGrid {
  constructor(x, y, width, height, minArea, gutter = 0) {
    this.boxes = [];
    this.minArea = minArea;
    this.gutter = gutter;
    const startBox = new Box(x, y, width, height);
    this.divideBox(startBox);
    utils.rjShuffle(this.boxes);
  }

  divideBox(box, minArea) {
    if (box.w * box.h <= this.minArea) {
      // box is small enough, and will not be divided further
      this.boxes.push(box);
      return;
    } else {
      // box is big enough to be divided some more
      const splitBoxes = this.splitBox(box);
      this.divideBox(splitBoxes[0]);
      this.divideBox(splitBoxes[1]);
    }
  }

  // Splits one box into two.
  splitBox(box) {
    const boxes = [];
    let newSides = [];
    const portrait = box.h > box.w;
    if (portrait) {
      newSides = utils.splitRough(box.h, 2, box.h * 0.3);

      boxes.push(new Box(box.x, box.y, box.w, newSides[0]));
      boxes.push(
        new Box(
          box.x,
          box.y + newSides[0] + this.gutter,
          box.w,
          newSides[1] - this.gutter
        )
      );
    } else {
      newSides = utils.splitRough(box.w, 2, box.w * 0.3);

      boxes.push(new Box(box.x, box.y, newSides[0], box.h));
      boxes.push(
        new Box(
          box.x + newSides[0] + this.gutter,
          box.y,
          newSides[1] - this.gutter,
          box.h
        )
      );
    }

    return boxes;
  }

  applyFunc(func) {
    for (let box of this.boxes) {
      func(box);
    }
  }

  filterBoxes(filterFunc, transformFunc) {
    const filtered = this.boxes.filter(filterFunc, transformFunc);
    if(transformFunc) {
      for(let box of filtered) {
        transformFunc(box);
      }
    }
    return filtered;
  }
}

export default BrokenGrid;
