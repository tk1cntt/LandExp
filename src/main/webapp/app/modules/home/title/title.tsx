import * as React from 'react';

import { Translate } from 'react-jhipster';

export default class Title extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const float = 'left';
    return (
      <h2 className="title">
        <Translate style={{ float }} component="div" contentKey="home.grid.title">
          New news
        </Translate>
        <span>{this.props.title.time}</span>
      </h2>
    );
  }
}
