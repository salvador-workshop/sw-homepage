import sample from "lodash/sample"
import shuffle from "lodash/shuffle"
import { Vector3 } from "three"

///////////////////////////////////////////////////////////////////////////////
//   UTILS
///////////////////////////////////////////////////////////////////////////////

/**
 * Returns a sorted set of floats between
 * the given min and max.
 */
const splitNumber = (value, numSplits, discreteVals = true) => {
  const result = []
  const points = []
  const numPoints = discreteVals ? numSplits - 1 : numSplits
  let randyVal

  for (let i = 0; i < numPoints; i++) {
    randyVal = Math.random()
    points.push(randyVal * value)
  }

  points.sort(function (a, b) {
    return a - b
  })
  if (discreteVals) {
    points.push(value)
  }

  for (let j = 0; j < points.length; j++) {
    if (j === 0) {
      result.push(points[j])
    } else {
      result.push(points[j] - points[j - 1])
    }
  }
  return result
}

/**
 * Splits a number "roughly"
 */
const splitRough = (valToSplit, numSplit, min, discreteVals = true) => {
  if (min * numSplit >= valToSplit) {
    // invalid case!
    return null
  }
  const roughArr = []
  const shareables = valToSplit - min * numSplit
  const shareableSplit = splitNumber(shareables, numSplit, discreteVals)
  let arrVal
  for (let i = 0; i < numSplit; i++) {
    if (!discreteVals && i !== 0) {
      arrVal = min + shareableSplit[i] + roughArr[i - 1]
    } else {
      arrVal = min + shareableSplit[i]
    }
    roughArr.push(arrVal)
  }
  return discreteVals ? roughArr : shuffle(roughArr)
}

/**
 * Returns a randomrandom integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Returns a value between minValue and maxValue (both inclusive), where
 * x = minValue returns minValue
 * x = (period / 2) returns maxValue
 * x = (period * 2) returns minValue
 * x = (period * 2.5) returns maxValue
 * x = (period * 3) returns minValue
 * etc...
 */
const periodicFunction = (x, period, minValue, maxValue) => {
  const cosArg = (x * Math.PI) / (period / 2)
  const amplitude = (maxValue - minValue) / 2
  return Math.cos(cosArg) * -amplitude + (amplitude + minValue)
}

/**
 * Returns a set of coords (x, y) tracing a circle
 * where period == time of cycle, and radius ==
 * radius of the circle. The circle is centred at (0, 0)
 */
const circleFunction = (input, period, radius) => {
  const inputArg = (input * Math.PI) / (period / 2)
  const yCoord = Math.sin(inputArg) * radius
  const xCoord = Math.cos(inputArg) * radius
  return {
    x: xCoord,
    y: yCoord,
  }
}

/**
 * Returns a set of coords (x, y, z) representing a point on a sphere
 * with the given radius. The sphere is centered at (0, 0, 0)
 */
const getRandomSphereCoordinate = radius => {
  const xyCoords = circleFunction(getRandomInt(0, 100), 100, radius)
  const xRadius = Math.abs(xyCoords.x)
  const xzCoords = circleFunction(getRandomInt(0, 100), 100, xRadius)
  return {
    x: xzCoords.x,
    y: xyCoords.y,
    z: xzCoords.y,
  }
}

/**
 * Returns a set of coords (x, y, z) representing a point on a cylinder
 * with the given radius. The cylinder is centered at (0, 0, 0)
 */
const getRandomCylinderCoordinate = (radius, height) => {
  const xzCoords = circleFunction(getRandomInt(0, 100), 100, radius)
  const halfHeight = height / 2
  const yCoord = getRandomInt(-halfHeight, halfHeight)
  return {
    x: xzCoords.x,
    y: yCoord,
    z: xzCoords.y,
  }
}

/**
 * Returns a random normalized vector.
 */
const getRandomVector = () => {
  const newVector = new Vector3(
    getRandomInt(-5, 5),
    getRandomInt(-5, 5),
    getRandomInt(-5, 5)
  )
  return newVector.normalize()
}

/**
 * Returns a list of evenly-distributed random coords
 * in a given space (as a box defined by x, y, z args)
 */
const randomizeEvenly = (numPoints, box) => {
  // get the cube root of numPoints. The box is divided
  // into even sections using this number.
  const cubedPoints = Math.cbrt(numPoints)
  if (!Number.isInteger(cubedPoints)) {
    throw new Error(
      "randomizeEvenly() requires a cubic integer (like 8, 27, 64)"
    )
  }

  const coords = []
  let yCoords
  let zCoords
  let xCoords

  for (let i = 0; i < cubedPoints; i++) {
    xCoords = splitRough(
      box.x,
      cubedPoints,
      (box.x / cubedPoints) * 0.45,
      false
    )
    yCoords = splitRough(
      box.y,
      cubedPoints,
      (box.y / cubedPoints) * 0.45,
      false
    )
    for (let yCoord of yCoords) {
      zCoords = splitRough(
        box.z,
        cubedPoints,
        (box.z / cubedPoints) * 0.45,
        false
      )
      for (let zCoord of zCoords) {
        coords.push({
          x: sample(xCoords),
          y: yCoord,
          z: zCoord,
        })
      }
    }
  }

  return coords
}

// Core implementation of ease-in/ease-out
// Returns a value between 0 and 1
// Starts at 1 if flip == true
const ease = (input, period, flip = false) => {
  if (input <= 0) {
    return flip ? 1 : 0
  }
  if (input >= period) {
    return flip ? 0 : 1
  }
  let cosResult = Math.cos((input * Math.PI) / period)
  if (flip) {
    cosResult = -cosResult
  }
  return cosResult * -0.5 + 0.5
}

const easeCircular = (input, period, flip = false) => {
  if (input <= 0 || input >= period) {
    return flip ? 1 : 0
  }
  let cosResult = Math.cos((input * Math.PI) / (period / 2))
  if (flip) {
    cosResult = -cosResult
  }
  return cosResult * -0.5 + 0.5
}

const easeIn = (input, period) => {
  return ease(input, period)
}
const easeOut = (input, period) => {
  return ease(input, period, true)
}
const easeInOut = (input, period) => {
  return easeCircular(input, period, false)
}
const easeOutIn = (input, period) => {
  return easeCircular(input, period, true)
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
const rjShuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const threeUtils = {
  splitNumber: splitNumber,
  splitRough: splitRough,
  getRandomInt: getRandomInt,
  periodicFunction: periodicFunction,
  circleFunction: circleFunction,
  getRandomSphereCoordinate: getRandomSphereCoordinate,
  getRandomCylinderCoordinate: getRandomCylinderCoordinate,
  getRandomVector: getRandomVector,
  randomizeEvenly: randomizeEvenly,
  easeIn: easeIn,
  easeOut: easeOut,
  easeInOut: easeInOut,
  easeOutIn: easeOutIn,
  rjShuffle: rjShuffle,
}

export default threeUtils
