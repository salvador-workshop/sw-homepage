import * as React from "react"

import NavigationButton from "./navigation-button"

const ENABLE_NAV_ARROWS = true;

const NavigationToolbar = () => {
  const isNavArrowActive = ENABLE_NAV_ARROWS;
  return (
    <div className="navigation-toolbar">
      <div className="nav-btn-container nav-btn-container-left">
        <NavigationButton buttonId="home" buttonType="link" isActive={true} />
        <NavigationButton buttonId="services" buttonType="link" isActive={true} />
      </div>
      <div className="nav-btn-container nav-btn-container-right">
        <NavigationButton
          buttonId="light"
          buttonType="ui"
          isActive={isNavArrowActive}
        />
        <NavigationButton
          buttonId="dark"
          buttonType="ui"
          isActive={isNavArrowActive}
        />
      </div>
    </div>
  )
}

export default NavigationToolbar
