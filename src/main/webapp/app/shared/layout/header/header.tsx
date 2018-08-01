import './header.css';

import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <LoadingBar />
      </div>
    );
  }
}
