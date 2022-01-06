import * as React from "react"

import NavigationToolbar from "./navigation-toolbar"
import headerIcon from "../images/icons/pearl-v2.svg"

const Header = ({ isHome, isPost }) => (
  <div className="header">
    <div className="header-nav-background"></div>
    <div className="header-container">
      <div className="header-content">
        <div className="header-icon-wrapper">
          <img className="header-icon" src={headerIcon} alt="header icon" />
        </div>
        <div className="header-text-wrapper">
          <h4 className="header-title">RJ Salvador</h4>
          <span className="header-text">Web developer, designer</span>
        </div>
      </div>
      <NavigationToolbar />
    </div>
  </div>
)

export default Header
