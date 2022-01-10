import * as React from "react"

const SwitchableImage = ({ isLightUi, lightImgPath, darkImgPath, className, alt }) => {
  const imgPathToUse = isLightUi ? lightImgPath : darkImgPath;
  return (
    <img
      className={`switchable-image ${className}`}
      src={imgPathToUse}
      alt={alt}
    />
  )
}

export default SwitchableImage
