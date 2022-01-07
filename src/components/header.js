import * as React from "react"

import NavigationToolbar from "./navigation-toolbar"

const Header = ({ isHome, isPost }) => (
  <div className="header">
    <div className="header-container">
      <div className="header-content">
        <div className="header-icon-wrapper">
          <img className="header-icon" src="/full-white.svg" alt="header icon" />
        </div>
        <div className="header-toolbar-wrapper">
          <NavigationToolbar />
        </div>
      </div>
    </div>
  </div>
)

export default Header
