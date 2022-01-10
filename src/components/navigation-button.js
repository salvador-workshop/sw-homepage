import * as React from "react"
import { Link } from "gatsby"

import SwitchableImage from "./switchable-image"

import iconHome from "../images/icons/toolbar/icon-home-dark.svg"
import iconServices from "../images/icons/toolbar/icon-services-dark.svg"
import iconSun from "../images/icons/toolbar/icon-sun-dark.svg"
import iconMoon from "../images/icons/toolbar/icon-moon-dark.svg"

import iconHomeLight from "../images/icons/toolbar/icon-home-light.svg"
import iconServicesLight from "../images/icons/toolbar/icon-services-light.svg"
import iconSunLight from "../images/icons/toolbar/icon-sun-light.svg"
import iconMoonLight from "../images/icons/toolbar/icon-moon-light.svg"

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

const getIcon = (buttonId, isLightUi) => {
  const iconMap = {
    home: isLightUi ? iconHomeLight: iconHome,
    services: isLightUi ? iconServicesLight: iconServices,
    dark: isLightUi ? iconSunLight: iconSun,
    light: isLightUi ? iconMoonLight: iconMoon,
  }

  if (!iconMap[buttonId]) {
    return "null"
  }

  return iconMap[buttonId]
}

const NavigationButton = ({ buttonType, buttonId, isLightUi, isActive, onClick }) => {
  const activeStatus = isActive ? "active" : "disabled"

  if (!!buttonId) {
    if (buttonType === "link") {
      return (
        <Link to={getLink(buttonId)}
          itemProp="url"
          className="navigation-button-link"
          state={{ isLightUi: isLightUi }}
        >
          <div className={`navigation-button ${activeStatus} ${buttonId} ${buttonType}`}>
            <div className="navigation-icon-wrapper">
              <img
                className="navigation-icon"
                src={getIcon(buttonId, isLightUi)}
                alt="navigation icon"
              />
            </div>
          </div>
        </Link>
      )
    }

    if (buttonType === "ui") {
      // TODO - remove this override when light switching is implemented
      // const tempActiveStatus = 'disabled';

      return (
        <div className={`navigation-button ${activeStatus} ${buttonId} ${buttonType}`} onClick={onClick} role="switch">
          <div className="navigation-icon-wrapper">
            <img
              className="navigation-icon"
              src={getIcon(buttonId, isLightUi)}
              alt="navigation icon"
            />
          </div>
        </div>
      )
    }
  }

  return (
    <div className={`navigation-button ${activeStatus}`}>
      <div className="navigation-icon-wrapper"></div>
    </div>
  )
}

export default NavigationButton
