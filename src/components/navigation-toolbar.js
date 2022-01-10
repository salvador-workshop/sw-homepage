import * as React from 'react';

import NavigationButton from './navigation-button';

// const ENABLE_NAV_ARROWS = true;

const switchUiButton = (isLightUi, onLightUiChanged) => {
  if (isLightUi) {
    return (
      <NavigationButton buttonId="light" buttonType="ui" isLightUi={isLightUi} isActive={isLightUi} onClick={onLightUiChanged}/>
    );
  }
  return (
    <NavigationButton buttonId="dark" buttonType="ui" isLightUi={isLightUi} isActive={!isLightUi} onClick={onLightUiChanged} />
  );
};

const NavigationToolbar = ({isLightUi, onLightUiChanged}) => {
  return (
    <div className="navigation-toolbar">
      <div className="nav-btn-container">
        <NavigationButton
          buttonId="home"
          buttonType="link"
          isLightUi={isLightUi}
          isActive={true} />
        <NavigationButton
          buttonId="services"
          buttonType="link"
          isLightUi={isLightUi}
          isActive={true}
        />
        { switchUiButton(isLightUi, onLightUiChanged) }
      </div>
    </div>
  );
};

export default NavigationToolbar;
