import React from "react"
import ThreeCity from "./three-city"
import DynamicGrid from "./dynamic-grid"
import RisingPillars from "./rising-pillars"
import threeUtils from "./utils/three-utils"

class Visualizations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      overlayOff: false,
      currentVisual: 0,
    }
    this.visualsRef = React.createRef()
    this.fadeIn = this.fadeIn.bind(this)
    this.fadeOut = this.fadeOut.bind(this)
    this.resetVisual = this.resetVisual.bind(this)
    this.intervalId = null
    this.timeoutId = null
  }

  fadeIn() {
    try {
      this.setState({ overlayOff: true })
    } catch (e) {
      console.warn(
        "Visualization failed to load: Couldn't update state properly"
      )
    }
  }

  fadeOut() {
    try {
      this.setState({ overlayOff: false })
    } catch (e) {
      console.warn(
        "Visualization failed to load: Couldn't update state properly"
      )
    }
  }

  resetVisual() {
    // let nextVis = this.state.currentVisual + 1;
    // if (nextVis > 3) {
    //   nextVis = 1;
    // }
    try {
      this.setState({
        overlayOff: true,
        currentVisual: threeUtils.getRandomInt(1, 10),
      })
    } catch (e) {
      console.warn(
        "Visualization failed to load: Couldn't update state properly"
      )
    }
  }

  componentDidMount() {
    const reset = this.resetVisual
    // const fade = this.fadeOut;

    // const time = 8000; // 8 seconds
    // const that = this;

    // this.intervalId = window.setInterval (function () {
    //   reset ();
    //   that.timeoutId = setTimeout (function () {
    //     fade ();
    //   }, time - 500);
    // }, time);

    reset()
    // setTimeout (function () {
    //   fade ();
    // }, time - 500);
  }

  render() {
    let visual = <ThreeCity />
    let overlayClass = this.state.overlayOff
      ? "vizOverlay vizOverlayOff"
      : "vizOverlay"

    // switch (this.state.currentVisual) {
    //   case 2:
    //     visual = <DynamicGrid />;
    //     break;
    //   case 3:
    //     visual = <RisingPillars />;
    //     break;
    //   default:
    //     visual = <ThreeCity />;
    // }
    if (this.state.currentVisual < 7) {
      visual = <RisingPillars />
    } else if (this.state.currentVisual < 10) {
      visual = <DynamicGrid />
    }

    return (
      <div>
        <div className={overlayClass} />
        <div
          className={`vizWrapper visuals--${this.state.currentVisual}`}
          ref={this.visualsRef}
        >
          {visual}
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId)
    clearTimeout(this.timeoutId)
    this.intervalId = null
    this.timeoutId = null
  }
}

export default Visualizations
