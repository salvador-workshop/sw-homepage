import * as React from "react"

const Footer = ({ isHome, isPost }) => (
  <div className="footer">
    {/* <div className="footer-nav-background"></div> */}
    <div className="footer-container">
      <div className="footer-text-wrapper">
        <p className="footer-text">
          <span>© {new Date().getFullYear()}</span>
          <span className="text-spacer">//</span>
          <span>Salvador Workshop</span>
          <span className="text-spacer">//</span>
          <span>Toronto, Canada</span>
        </p>
      </div>
    </div>
  </div>
)

export default Footer
