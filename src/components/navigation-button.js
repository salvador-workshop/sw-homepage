import * as React from "react"
import { Link } from "gatsby"

import iconHome from "../images/icons/linea/basic_home.svg"
// import iconServices from "../images/icons/linea/basic_gear.svg"
import iconServices from "../images/icons/linea/basic_settings.svg"
import iconLight from "../images/icons/feather/sun.svg"
import iconDark from "../images/icons/feather/moon.svg"

const getLink = buttonId => {
  const linkMap = {
    home: "/",
    services: "/services",
  }

  if (!linkMap[buttonId]) {
    return "null"
  }

  return linkMap[buttonId]
}

const getIcon = buttonId => {
  const iconMap = {
    home: iconHome,
    services: iconServices,
    light: iconLight,
    dark: iconDark,
  }

  if (!iconMap[buttonId]) {
    return "null"
  }

  return iconMap[buttonId]
}

const NavigationButton = ({ buttonType, buttonId, isActive }) => {
  let classMod = isActive ? "active" : "disabled"

  if (!!buttonId) {
    if (buttonType === "link") {
      return (
        <Link to={getLink(buttonId)} itemProp="url" className="navigation-button-link">
          <div className={`navigation-button ${classMod}`}>
            <div className="navigation-icon-wrapper">
              <img
                className="navigation-icon"
                src={getIcon(buttonId)}
                alt="navigation icon"
              />
            </div>
          </div>
        </Link>
      )
    }

    if (buttonType === "ui") {
      // overriding for now, until light/dark switch is actually implemented
      classMod = 'disabled';
      return (
        <div className={`navigation-button ${classMod}`}>
          <div className="navigation-icon-wrapper">
            <img
              className="navigation-icon"
              src={getIcon(buttonId)}
              alt="navigation icon"
            />
          </div>
        </div>
      )
    }
  }

  return (
    <div className={`navigation-button ${classMod}`}>
      <div className="navigation-icon-wrapper"></div>
    </div>
  )
}

export default NavigationButton
