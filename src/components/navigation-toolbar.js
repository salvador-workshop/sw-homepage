import * as React from 'react';

import NavigationButton from './navigation-button';

const ENABLE_NAV_ARROWS = true;

const switchUiButton = ({isLightUi}) => {
  if (isLightUi) {
    return (
      <NavigationButton buttonId="light" buttonType="ui" isActive={isLightUi} />
    );
  }
  return (
    <NavigationButton buttonId="dark" buttonType="ui" isActive={!isLightUi} />
  );
};

const NavigationToolbar = ({isLightUi}) => {
  return (
    <div className="navigation-toolbar">
      <div className="nav-btn-container">
        <NavigationButton
          buttonId="home"
          buttonType="link"
          isActive={true} />
        <NavigationButton
          buttonId="services"
          buttonType="link"
          isActive={true}
        />
        { switchUiButton(isLightUi) }
      </div>
    </div>
  );
};

export default NavigationToolbar;
