import * as React from "react"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ location, title, children, className, isPost, isLightUi, onLightUiChanged }) => {
  console.log(isLightUi, onLightUiChanged);
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  // const isLightUi = false;

  // const onLightUiChanged = () => {
  //   console.log('onLightUiChanged()');
  //   return 0
  // };

  const cName = className ? className : '';

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <div className="main-background">
        <div className="overlay"></div>
        <div className="effect"></div>
      </div>

      <div className={`main-layout ${cName}`}>
        <Header isHome={isRootPath} isPost={isPost} isLightUi={isLightUi} onLightUiChanged={onLightUiChanged}/>
        <div className="main-wrapper">
          <main className="main-container">
            {children}
          </main>
        </div>
        <Footer isHome={isRootPath} isPost={isPost} />
        <div className="overlay"></div>
        <div className="effect"></div>
      </div>

      <div className="main-foreground">
        <div className="overlay"></div>
        <div className="effect"></div>
      </div>
    </div>
  )
}

export default Layout
