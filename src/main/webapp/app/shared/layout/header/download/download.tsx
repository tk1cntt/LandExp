import './download.css';
import * as React from 'react';

import { Translate } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class Download extends React.Component {

  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div className="download">
        <p>
          <Translate contentKey="download.title">Download App on Store</Translate>
        </p>
        <div className="app-icon">
          <span>
            <a href="">
              <FontAwesomeIcon icon="apple"/>
            </a>
          </span>
          <span>
            <a href="">
              <FontAwesomeIcon icon=""/>
            </a>
          </span>
        </div>
      </div>
    );
  }
}
