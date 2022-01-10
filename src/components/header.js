import * as React from "react"

import NavigationToolbar from "./navigation-toolbar"
import SwitchableImage from "./switchable-image"

const Header = ({ isHome, isPost, isLightUi, onLightUiChanged }) => (
  <div className="header">
    <div className="header-container">
      <div className="header-content">
        <div className="header-icon-wrapper">
          <SwitchableImage
            className="header-icon"
            darkImgPath="/full-white.svg"
            lightImgPath="/full-black.svg"
            isLightUi={isLightUi}
            alt="header icon"
          />
        </div>
        <div className="header-flex-spacer" />
        <div className="header-toolbar-wrapper">
          <NavigationToolbar isLightUi={isLightUi} onLightUiChanged={onLightUiChanged}/>
        </div>
      </div>
    </div>
  </div>
)

export default Header
