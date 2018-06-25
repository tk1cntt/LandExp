import * as React from 'react';

import { Row, Col, Alert } from 'reactstrap';
import { Translate } from 'react-jhipster';

export default class Title extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
        <h2 className="title">
          <Translate component="div" contentKey="home.grid.title">
            New news
        </Translate>
          <span>'Thứ 5, ngày 31 tháng 05 năm 2018'</span>
        </h2>
      </Row>
    );
  }
}
