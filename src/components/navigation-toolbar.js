import * as React from "react"

import NavigationButton from "./navigation-button"

const ENABLE_NAV_ARROWS = false;

const NavigationToolbar = ({ isHome, isPost }) => {
  const isNavArrowActive = !!isPost && ENABLE_NAV_ARROWS;
  return (
    <div className="navigation-toolbar">
      <div className="nav-btn-container nav-btn-container-left">
        <NavigationButton buttonId="home" buttonType="link" isActive={true} />
        <NavigationButton buttonId="cv" buttonType="link" isActive={true} />
        <NavigationButton buttonId="about" buttonType="link" isActive={true} />
      </div>
      <div className="nav-btn-container nav-btn-container-right">
        <NavigationButton
          buttonId="left"
          buttonType="ui"
          isActive={isNavArrowActive}
        />
        <NavigationButton
          buttonId="right"
          buttonType="ui"
          isActive={isNavArrowActive}
        />
      </div>
    </div>
  )
}

export default NavigationToolbar
