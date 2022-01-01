import React from "react"
import * as THREE from "three"
import sample from "lodash/sample"
import chroma from "chroma-js"
import utils from "./utils/three-utils"
import FuzzyGrid from "./utils/fuzzy-grid"
import { radialWave3 } from "./utils/wave-utils"

class RisingPillars extends React.Component {
  constructor(props) {
    super(props)
    this.pillarsRef = React.createRef()
  }

  render() {
    return (
      <div className="threejs-content-wrapper rising-pillars-wrapper">
        <div
          className="rising-pillars-container"
          ref={this.pillarsRef}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: '#000000',
            // zIndex: -200,
          }}
        />
      </div>
    )
  }

  componentDidMount() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })

    ///////////////////////////////////////////////////////////////////////////////
    //   CONSTANTS

    const LIGHT_POS = new THREE.Vector3(1, 5, 1)
    const UPDATES_PER_SECOND = 24
    const GRID_WIDTH = 360
    const GRID_LENGTH = 360
    const GRID_UNIT_WIDTH = 13
    const GRID_UNIT_LENGTH = 13
    const PILLAR_BASE_HEIGHT = 25
    const WAVE_CENTER_POINT = {
      x: -900,
      y: 1878,
    }
    const CAMERA_HEIGHT = 110
    const CAMERA_ROTATION_PERIOD = 75
    const CAMERA_ROTATION_RADIUS = 110
    const CAMERA_TARGET = new THREE.Vector3(GRID_LENGTH / 2, -5, GRID_WIDTH / 2)

    ///////////////////////////////////////////////////////////////////////////////
    //   THREE.JS ESSENTIALS

    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera(
      45,
      this.pillarsRef.current.clientWidth /
        this.pillarsRef.current.clientHeight,
      1,
      1000
    )
    this.renderer.setSize(
      this.pillarsRef.current.clientWidth,
      this.pillarsRef.current.clientHeight
    )
    this.pillarsRef.current.appendChild(this.renderer.domElement)
    let light = new THREE.DirectionalLight("white", 1)
    light.position.set(LIGHT_POS.x, LIGHT_POS.y, LIGHT_POS.z)
    scene.add(light)

    const lightest = "7eabbe"
    const darkest = chroma(lightest).darken(3)
    const colorScale = chroma.scale([darkest, lightest])
    const backgroundCol = chroma("#a0753f").num()
    this.renderer.setClearColor(backgroundCol, 1)

    ///////////////////////////////////////////////////////////////////////////////
    //   MAIN OBJECTS

    // Creating pillars
    const pillarGroup = new THREE.Group()
    let newPillar
    let pillarGeometry
    let pillarMaterial

    class AnimationClock {
      constructor(period) {
        this.period = period ? period : 1
      }

      /**
       * Simple sine oscillator.
       *
       * @param {number} inputOffset - offset value added to timestamp (seconds)
       * @return {number} A number between 0 and 1
       */
      getValue(inputOffset = 0) {
        const currentTime = Date.now() / 1000
        const cosArg =
          ((currentTime + inputOffset) * Math.PI) / (this.period / 2)
        const amplitude = 0.5
        return Math.cos(cosArg) * -amplitude + amplitude
      }
    }

    // constructor ignores length
    const pillarConstructor = (x, y, width) => {
      const radiusPadding = Math.random() * 4
      const radius = width / 13 + radiusPadding
      pillarGeometry = new THREE.CylinderBufferGeometry(
        radius,
        radius,
        PILLAR_BASE_HEIGHT,
        16
      )
      pillarMaterial = new THREE.MeshLambertMaterial({
        color: colorScale(
          sample([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0])
        ).hex(),
        flatShading: true,
      })
      newPillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
      newPillar.position.setX(x)
      newPillar.position.setY(PILLAR_BASE_HEIGHT / 2)
      newPillar.position.setZ(y)
      return newPillar
    }

    const pillarGrid = new FuzzyGrid(
      pillarConstructor,
      GRID_WIDTH,
      GRID_LENGTH,
      GRID_UNIT_WIDTH,
      GRID_UNIT_LENGTH
    )
    pillarGrid.list.forEach(pillar => {
      pillarGroup.add(pillar)
    })
    scene.add(pillarGroup)

    ///////////////////////////////////////////////////////////////////////////////
    //   MAIN RENDER/UPDATE LOOPS

    const clock = new AnimationClock(4)

    this.intervalId = window.setInterval(function () {
      const currentTime = Date.now() / 1000

      pillarGrid.apply(pillar => {
        const pillarPosMultiplier = 0.01
        const pillarPos = {
          x: pillar.position.x * pillarPosMultiplier,
          y: pillar.position.z * pillarPosMultiplier,
        }
        const scaleMultiplier = radialWave3(
          WAVE_CENTER_POINT,
          pillarPos,
          currentTime
        )
        const wave1 = scaleMultiplier
        const wave2 = clock.getValue() * 0.6 + 0.4
        const newScale = wave1 * wave2 + 0.25
        pillar.scale.set(1, newScale, 1)
        pillar.position.setY((newScale / 2) * PILLAR_BASE_HEIGHT)
      })

      const cameraCoords = utils.circleFunction(
        currentTime,
        CAMERA_ROTATION_PERIOD,
        CAMERA_ROTATION_RADIUS
      )
      const cameraPos = new THREE.Vector3(
        cameraCoords.x + GRID_LENGTH / 2,
        CAMERA_HEIGHT,
        cameraCoords.y + GRID_WIDTH / 2
      )
      camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z)
      camera.lookAt(CAMERA_TARGET)
    }, 1000 / UPDATES_PER_SECOND)

    // Render loop
    const that = this
    let render = function () {
      requestAnimationFrame(render)
      that.renderer.render(scene, camera)
    }

    render()

    ///////////////////////////////////////////////////////////////////////////////
    //   HANDLING WINDOW RESIZES

    const canvasElement = this.pillarsRef.current
    function resizeRenderer(evt) {
      camera.aspect = canvasElement.clientWidth / canvasElement.clientHeight
      that.renderer.setSize(
        canvasElement.clientWidth,
        canvasElement.clientHeight
      )
      camera.updateProjectionMatrix()
    }

    const resizeHandler = evt => {
      resizeRenderer(evt)
    }

    const delay = 100 // Your delay here
    ;(() => {
      let resizeTaskId = null
      window.addEventListener("resize", evt => {
        if (resizeTaskId !== null) {
          clearTimeout(resizeTaskId)
        }
        resizeTaskId = setTimeout(() => {
          resizeTaskId = null
          resizeHandler(evt)
        }, delay)
      })
    })()
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId)
    this.intervalId = null
  }
}

export default RisingPillars
