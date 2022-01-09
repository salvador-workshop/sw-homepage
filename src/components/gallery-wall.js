import React from 'react';
import shuffle from 'lodash/shuffle';

import BrokenGrid from './utils/broken-grid';

const PHI = (Math.sqrt(5) + 1) / 2;
const BOX_DIVISION_SCALE = Math.PI + PHI;

// root path here == "static" directory
const GALLERY_DIR = '/gallery-wall/';

// you can print out the image list by running something
// like  `$ ls static/gallery-wall` on command line
const GALLERY_IMAGES = [
  '0d0762ccffa762d3bf5d1514f545fb3de.png',
  '2a456e27370a062cb671e755f5adaf5a6.png',
  'a87aca142038b314b00aec467c87d0481.jpg',
  'dd52ec2ffecce787081d11060fde74e46.png',
  '130027fd1bfda16a42c8fbf51a1f3f730.png',
  '5831caabac44e34fcc3a1521ae58372c0.png',
  'b420bfc6e6b8f7fcb8e0747bf3a20fd37.jpg',
  'df1fc71a04433cbb6f51e137785271131.png',
  '15420e34045776146f67c2f271d747fdf.png',
  '70ffcaf73c447712b620653e80adf6dc0.jpg',
  'b7e741b8df316fbd146b31fe3820a3cc5.jpg',
  'e53f6a5b04cc6852cbceda5530cb8b7db.jpg',
  '15f24dc085d38a7dc330c670374d71b5e.jpg',
  '776c0a484f18c8eda452a0d1f4df6abc8.jpg',
  'bff158eaf7504ba8850ffdea74073ce68.png',
  'ea4e38823df3cc65e3e757ce7f4a7f223.jpg',
  '267055b34ba125e252e87028bb4dec10e.png',
  '8456edc2f4ac21ca554e704452a7f6d46.jpg',
  'c20c6762235aa072372c2ab5b058b2672.png',
  'f7dbfeeecfc880b8631152c7eebe70eeb.jpg',
  '26b00ec03cadcf58ad7ebff54c7ef1aa5.png',
  'a4be2d0ea2c014e608bc838fb48a581f1.jpg',
  'd5fbfe756dc7d7ac447487c03bfc61a66.jpg',
  'fe7a6e8a27b66e4525d6316ebcaa20c53.png',
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
  console.log('img index', currentCounter);
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
      element.style.left = `${gUnit.x}%`;
      element.style.top = `${gUnit.y}%`;
      element.style.width = `${gUnit.w}%`;
      element.style.height = `${gUnit.h}%`;
      element.style.backgroundColor = '#555555';
      element.style.border = '1px solid white';

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
