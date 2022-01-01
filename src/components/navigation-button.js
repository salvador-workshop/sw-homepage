import * as React from "react"
import { Link } from "gatsby"

import iconHome from "../images/icons/linea/basic_home.svg"
import iconAbout from "../images/icons/line-icons/profile-male.svg"
import iconCv from "../images/icons/line-icons/document.svg"
import iconLeft from "../images/icons/feather/chevron-left.svg"
import iconRight from "../images/icons/feather/chevron-right.svg"

const getLink = buttonId => {
  const linkMap = {
    home: "/",
    about: "/about",
    cv: "/cv",
  }

  if (!linkMap[buttonId]) {
    return "null"
  }

  return linkMap[buttonId]
}

const getIcon = buttonId => {
  const iconMap = {
    home: iconHome,
    about: iconAbout,
    cv: iconCv,
    left: iconLeft,
    right: iconRight,
  }

  if (!iconMap[buttonId]) {
    return "null"
  }

  return iconMap[buttonId]
}

const NavigationButton = ({ buttonType, buttonId, isActive }) => {
  const classMod = isActive ? "active" : "disabled"

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
