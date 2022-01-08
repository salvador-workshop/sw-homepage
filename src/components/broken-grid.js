import React from 'react';
import BrokenGrid from './utils/broken-grid';
import { getDistFromPoints, radialWave3 } from './utils/wave-utils';
// import"from""./broken-grid.module.css"

class BrokenGridView extends React.Component {
  constructor (props) {
    super (props);
    this.bGridRef = React.createRef ();
    this.initializeGrid = this.initializeGrid.bind(this);
    this.drawBox = this.drawBox.bind(this);
    this.buildCircleGrid = this.buildCircleGrid.bind(this);
    this.intervalId = null;
    this.unitSize = 64;
    this.state = {
      grid: null,
      circleGrid: null,
    }
  }

  buildCircleGrid(inputGrid) {
    let filteredBoxes = [];
    if(inputGrid && inputGrid.filterBoxes) {
      const radialOrigin = {
        x: this.mainBox.w / 2,
        y: this.mainBox.h / 2
      };
      
      const portrait = this.mainBox.h > this.mainBox.w;
      let longSide;

      if(portrait) {
        longSide = this.mainBox.h;
      } else {
        longSide = this.mainBox.w;
      }

      const maxDist = (longSide / 2) * 0.9;
      const intensityAdj = box => {
        const boxCenter = {
          x: box.x + box.w / 2,
          y: box.y + box.h / 2
        };
        const dist = getDistFromPoints(radialOrigin, boxCenter);
        let intensityRes = 1 - dist / maxDist;
        if (intensityRes < 0) {
          intensityRes = 0;
        }
        box.intensity1 = intensityRes;
      };

      const dummyFilter = (item) => {
        return item;
      }

      filteredBoxes = inputGrid.filterBoxes(dummyFilter, intensityAdj);
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

    this.setState({
      grid: rGrid,
      circleGrid: this.buildCircleGrid(rGrid),
    });
  }

  drawBox(gUnit) {
    const element = document.getElementsByClassName(`box--${gUnit.id}`)[0];
    if(element) {
      element.style.left = `${gUnit.x}px`;
      element.style.top = `${gUnit.y}px`;
      element.style.width = `${gUnit.w}px`;
      element.style.height = `${gUnit.h}px`;
      element.style.opacity = gUnit.intensity3;
      if(gUnit.intensity2 === 1) {
        // blue
        element.style.backgroundColor = '#223459';
      } else if(gUnit.intensity2 === 2) {
        // yellow
        element.style.backgroundColor = '#af6f2e';
      } else  {
        // grey
        element.style.backgroundColor = '#555555';
      }
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

    const subsetIdx = Math.ceil(cGrid.length * 0.25);
    const subsetIdx2 = cGrid.length - Math.ceil(cGrid.length * 0.25);
    const subset = cGrid.slice(0, subsetIdx);
    const subset2 = cGrid.slice(subsetIdx2, cGrid.length);
    
    for(let box of subset) {
      box.intensity1 = box.intensity1 * 0.7;
      box.intensity2 = 1;
    }

    for(let box of subset2) {
      box.intensity1 = box.intensity1 * 0.5;
      box.intensity2 = 2;
    }

    for(let box of cGrid) {
      this.drawBox(box);
    }

    const updateFrequency = 20;
    const inputMultiplier = 1 / 125;
    const centerPoint = {
      x: 15,
      y: 30,
    };

    if(this.intervalId) {
      // clear existing interval id
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.intervalId = setInterval(() => {
      for(let box of this.state.circleGrid) {
        const intensity = radialWave3(
          centerPoint,
          {x: box.x * inputMultiplier, y: box.y * inputMultiplier},
          Date.now() / 1000,
        );
        const avgIntensity = (box.intensity1 + (intensity * 0.75)) / 2;
        box.intensity3 = avgIntensity;
        this.drawBox(box);
      }
    }, 1000 / updateFrequency);

    return (
      <div className="broken-grid-wrapper-wrapper">
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

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

export default BrokenGridView;
