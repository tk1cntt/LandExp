import './demand.css';
import * as React from 'react';

import { Translate } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';

export default class Demand extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>
          <Translate contentKey="demand.title">What are your demand ?</Translate>
        </h2>
        <div className="select-box">
          <label className="radio-container">
            <Translate contentKey="demand.buy">Buy</Translate>
            <input type="radio" name="radio" />
            <span className="checkmark" />
          </label>

          <label className="radio-container">
            <Translate contentKey="demand.rent">Rent</Translate>
            <input type="radio" name="radio" />
            <span className="checkmark" />
          </label>
        </div>
      </div>
    );
  }
}
