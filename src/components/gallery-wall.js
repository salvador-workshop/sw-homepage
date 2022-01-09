import React from 'react';
import BrokenGrid from './utils/broken-grid';

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
        box.intensity2 = 0.25 + (0.75 * Math.random());
      };

      const mappyFilter = (item) => {
        return item;
      }

      filteredBoxes = inputGrid.filterBoxes(mappyFilter, initializeBox);
    }
    return filteredBoxes;
  }
  
  initializeGrid(boxDivisionScale = 7) {
    let bDivisionScale = boxDivisionScale;
    this.mainBox = {
      x: 0,
      y: 0,
      w: 100,
      h: 100,
    };
    const minArea = this.mainBox.w * this.mainBox.h / bDivisionScale
    const boxGutter = 0;

    console.log('init', this.bGridRef.current.clientWidth, this.mainBox)

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
      element.style.opacity = gUnit.intensity2;
      element.style.backgroundColor = '#555555';
      element.style.border = '1px solid white';

      // const galleryImg = document.createElement('img')
      // galleryImg.classList.add('gallery-img-wrapper');
      // galleryImg.src='https://via.placeholder.com/300x200?text=WIP';
      
      // const imgWrapper = document.createElement('div');
      // imgWrapper.classList.add('gallery-img-wrapper');
  
      // imgWrapper.append(galleryImg)
      // element.append(imgWrapper)

      element.style.backgroundImage = "url(https://via.placeholder.com/300x200?text=WIP)";
      element.style.backgroundPosition = 'center';
      element.style.backgroundSize = 'cover';
      element.style.backgroundRepeat = 'no-repeat';
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
    for(let box of this.state.circleGrid) {
      this.drawBox(box);
    }
    
    const displayedBoxes = document.getElementsByClassName(`gallery-box`);
    console.log('update', this.bGridRef.current.clientWidth, displayedBoxes, this.state)
  }
}

export default GalleryWall;
