import * as React from "react"

import NavigationToolbar from "./navigation-toolbar"

const Footer = ({ isHome, isPost }) => (
  <div className="footer">
    <div className="footer-nav-background"></div>
    <div className="footer-container">
      <NavigationToolbar />
      <div className="footer-text-wrapper">
        <p className="footer-text">
          <span>© {new Date().getFullYear()}</span>
          <span className="text-spacer">//</span>
          <span>R. J. Salvador</span>
          <span className="text-spacer">//</span>
          <span>Toronto, Canada</span>
        </p>
      </div>
    </div>
  </div>
)

export default Footer
