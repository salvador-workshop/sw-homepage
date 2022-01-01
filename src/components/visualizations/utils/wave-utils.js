export const basicWave = x => {
  return Math.sin(x * Math.PI * 2) * 0.5 + 0.5
}

export const wave1 = x => {
  return (Math.sin(x * 10) + Math.sin(x * 5)) * 0.28 + 0.5
}

export const wave2 = x => {
  return (-Math.sin(x * 2) + Math.cos(x * 8)) * 0.26 + 0.47
}

export const wave3 = x => {
  return (Math.sin(x * 1.5) + -Math.cos(x * 5)) * 0.28 + 0.47
}

// Composes functions, returns one with 2 or 3 params
export const composeWaves = (xFunc, yFunc, timeFunc) => {
  let newFunc
  if (timeFunc) {
    newFunc = (x, y, time) => {
      const xRes = xFunc(x)
      const yRes = yFunc(y)
      const timeRes = timeFunc(time)
      return (xRes + yRes + timeRes) / 3
    }
  } else {
    newFunc = (x, y) => {
      const xRes = xFunc(x)
      const yRes = yFunc(y)
      return (xRes + yRes) / 2
    }
  }
  return newFunc
}

// const composedWave1 = composeWaves(wave2, wave1);
// const composedWave2 = composeWaves(wave2, wave3);
// const composedWave3 = composeWaves(wave2, wave1, basicWave);

export const getDistFromPoints = (p1, p2) => {
  const xDiff = p2.x - p1.x
  const yDiff = p2.y - p1.y
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
}

export const build3dRadialWave = waveFunc => {
  return (originPoint, point, time) => {
    const ogPoint = originPoint ? originPoint : { x: 0, y: 0 }
    const dist = getDistFromPoints(ogPoint, point)
    const funcInput = dist + time
    return waveFunc(funcInput)
  }
}

export const radialBasicWave = build3dRadialWave(basicWave)
export const radialWave1 = build3dRadialWave(wave1)
export const radialWave2 = build3dRadialWave(wave2)
export const radialWave3 = build3dRadialWave(wave3)
