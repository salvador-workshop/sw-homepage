import React from 'react';
import shuffle from 'lodash/shuffle';

import BrokenGrid from './utils/broken-grid';

// const PHI = (Math.sqrt(5) + 1) / 2;
// const BOX_DIVISION_SCALE = Math.PI + PHI;
const BOX_DIVISION_SCALE = Math.PI * 2;

// root path here == "static" directory
const GALLERY_DIR = '/gallery-wall/';

// you can print out the image list by running something
// like  `$ ls static/gallery-wall` on command line
const GALLERY_IMAGES = [
  '02f8432ef8475340c58b33f8f0bbc477e.jpg',
  '133c14c0d3034ba6a70bf4c84d3b547fa.jpg',
  '26b315827848563d0ed73e6c02d20c3b5.jpg',
  '27d5e7b1e5e561565e128eda564164763.jpg',
  '3d6263882434a23174f3a4d88d810c5f3.png',
  '62a66464b10a40df44dc7fff60e011b56.jpg',
  '66d1c5762f0cc15e1de0536130dbb425a.png',
  '7f123ede1a4eeab553c53d70ce5db5357.png',
  '87befdbfa2b58f87cdbc7a41b0e2ac507.jpg',
  'a3bafaad75b1e3a103bde3343d7618658.png',
  'b3221cfc70614681effacbe4da1c34271.jpg',
  'b57cdecc0a6f2aa582f260ae7f03c2d68.jpg',
  'b6084db4fb3361687f3ebc0d48a885f43.jpg',
  'b63780d46021c8552633360d48000d204.png',
  'cc35333d7b3c1f83a10d057863341208e.png',
  'd2101fb8ae76f6ced3aa3b25c7eedc778.jpg',
  'd22214da0b7674113840ccef0daa5e26c.png',
  'ee4fcd2f8af76d37c21d4411078ecac0f.jpg',
  'feba1f0b02364d86e7212a7d3d872f664.jpg',
]

const shuffledGalleryImages = shuffle(GALLERY_IMAGES);

let galleryImgCounter = 0;
const maxVal = shuffledGalleryImages.length;

const getGalleryImgIndex = () => {
  const currentCounter = galleryImgCounter;
  const nextCounter = currentCounter + 1;

  const quotient = nextCounter / (maxVal - 1);
  if (quotient > 1) {
    // new counter is too large. reset to a number that fits within max
    const quotientFloor = Math.floor(quotient);
    const toSubtract = maxVal * quotientFloor;
    galleryImgCounter = nextCounter - toSubtract;
  } else {
    galleryImgCounter = nextCounter;
  }
  return currentCounter;
}

class GalleryWall extends React.Component {
  constructor (props) {
    super (props);
    this.bGridRef = React.createRef ();
    this.initializeGrid = this.initializeGrid.bind(this);
    this.drawBox = this.drawBox.bind(this);
    this.buildCircleGrid = this.buildCircleGrid.bind(this);
    this.unitSize = 64;
    this.state = {
      grid: null,
      circleGrid: null,
    }
  }

  buildCircleGrid(inputGrid) {
    let filteredBoxes = [];
    if(inputGrid && inputGrid.filterBoxes) {

      const initializeBox = box => {
        box.intensity1 = 1;
      };

      const mappyFilter = (item) => {
        return item;
      }

      filteredBoxes = inputGrid.filterBoxes(mappyFilter, initializeBox);
    }
    return filteredBoxes;
  }
  
  initializeGrid(boxDivisionScale = BOX_DIVISION_SCALE) {
    let bDivisionScale = boxDivisionScale;
    this.mainBox = {
      x: 0,
      y: 0,
      w: 100,
      h: 100,
    };
    const minArea = this.mainBox.w * this.mainBox.h / bDivisionScale
    const boxGutter = 0;

    const rGrid = new BrokenGrid(
      this.mainBox.x,
      this.mainBox.y,
      this.mainBox.w,
      this.mainBox.h,
      minArea,
      boxGutter,
    );

    const cGrid = this.buildCircleGrid(rGrid);

    this.setState({
      grid: rGrid,
      circleGrid: cGrid,
    });
  }

  drawBox(gUnit) {
    const element = document.getElementsByClassName(`box--${gUnit.id}`)[0];

    if(element) {
      const bgCol = '#030D4F';

      element.style.left = `${gUnit.x}%`;
      element.style.top = `${gUnit.y}%`;
      element.style.width = `${gUnit.w}%`;
      element.style.height = `${gUnit.h}%`;
      element.style.border = `4px solid ${bgCol}`;
      
      element.style.backgroundColor = bgCol;
      element.style.backgroundPosition = 'center';
      element.style.backgroundSize = 'cover';
      element.style.backgroundRepeat = 'no-repeat';

      const img = shuffledGalleryImages[getGalleryImgIndex()];
      const imgPath = `${GALLERY_DIR}${img}`;
      element.style.backgroundImage = `url(${imgPath})`;
    }

  }

  render () {
    const cGrid = this.state.circleGrid;
    if(!cGrid) {
      return (
        <div
        className="gallery-wall-wrapper"
          ref={this.bGridRef}
        ></div>
      );
    }

    return (
      <div className="gallery-wall-container">
        <div
          className="gallery-wall-wrapper"
          ref={this.bGridRef}
        >
          {this.state.circleGrid && this.state.circleGrid.map((box, idx) => {
            return (
              <div key={idx} className={`box box--${box.id} gallery-box`} ></div>
            )
          })}
        </div>
      </div>
    );
  }

  componentDidMount () {
    const initFunc = this.initializeGrid;
    initFunc();
  }

  componentDidUpdate () {
    this.state.circleGrid.forEach((box) => {
      this.drawBox(box);
    });
  }
}

export default GalleryWall;
