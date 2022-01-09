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
      
      // const portrait = this.mainBox.h > this.mainBox.w;
      // let longSide;

      // if(portrait) {
      //   longSide = this.mainBox.h;
      // } else {
      //   longSide = this.mainBox.w;
      // }

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
  
  initializeGrid(minBoxArea = 35, boxGutter = 14) {
    if(!this.bGridRef.current) {
      return;
    }

    let mBoxArea = minBoxArea;
    let bGutter = boxGutter;

    if(this.bGridRef.current.clientWidth >= 580) {
      mBoxArea = 40;
      bGutter = 16;
    }
    if(this.bGridRef.current.clientWidth >= 750) {
      mBoxArea = 70;
      bGutter = 18;
    }
    if(this.bGridRef.current.clientWidth >= 1200) {
      mBoxArea = 100;
    }
    
    this.mainBox = {
      x: 0,
      y: 0,
      w: this.bGridRef.current.clientWidth,
      h: this.bGridRef.current.clientHeight,
    };
    
    const rGrid = new BrokenGrid(
      this.mainBox.x,
      this.mainBox.y,
      this.mainBox.w,
      this.mainBox.h,
      this.mainBox.w * this.mainBox.h / mBoxArea,
      bGutter,
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
      element.style.left = `${gUnit.x}px`;
      element.style.top = `${gUnit.y}px`;
      element.style.width = `${gUnit.w}px`;
      element.style.height = `${gUnit.h}px`;
      element.style.opacity = 1;
      element.style.backgroundColor = '#555555';
    }
  }

  render () {
    const cGrid = this.state.circleGrid;
    if(!cGrid) {
      return (
        <div
        className="bGridWrapper"
          ref={this.bGridRef}
        ></div>
      );
    }

    return (
      <div className="gallery-wall-wrapper-wrapper">
        <div
          className="bGridWrapper"
          ref={this.bGridRef}
        >
          {this.state.circleGrid && this.state.circleGrid.map((box, idx) => {
            return (
              <div key={idx} className={`box box--${box.id} bGridBox`} ></div>
            )
          })}
        </div>
      </div>
    );
  }

  componentDidMount () {
    const initFunc = this.initializeGrid;
    initFunc();

    ///////////////////////////////////////////////////////////////////////////////
    //   HANDLING WINDOW RESIZES

    function resizeGrid(evt) {
      initFunc();
    };
    const resizeHandler = evt => {
      resizeGrid(evt);
    };
    const delay = 100;  // Your delay here
    (() => {
      let resizeTaskId = null;
      window.addEventListener('resize', evt => {
        if (resizeTaskId !== null) {
          clearTimeout(resizeTaskId);
        }
        resizeTaskId = setTimeout(() => {
          resizeTaskId = null;
          resizeHandler(evt);
        }, delay);
      });
    })();
  }

  componentDidUpdate () {
    for(let box of this.state.circleGrid) {
      this.drawBox(box);
    }
  }
}

export default GalleryWall;
