import React from 'react';
import { isMobile } from 'react-device-detect';

import LayoutDesktop from './layout-desktop';
import LayoutMobile from './layout-mobile';

export class App extends React.Component {
  render() {
    if (isMobile) {
      return <LayoutMobile />;
    }
    return <LayoutDesktop />;
  }
}

export default App;
