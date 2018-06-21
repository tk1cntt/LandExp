import './menu.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="menu-on-header">
        <div className="logo">
          <a href="/">
            <img src="static/images/logo.png" alt="LandExp" />
          </a>
        </div>
        <ul className="menu">
          <li>
            <a href="">
              <Translate contentKey="menu.left.buy">Buy</Translate>
            </a>
          </li>
          <li>
            <a href="">
              <Translate contentKey="menu.left.rent">Rent</Translate>
            </a>
          </li>
          <li>
            <a href="">
              <Translate contentKey="menu.left.help">Help</Translate>
            </a>
          </li>
          <li>
            <a href="">
              <Translate contentKey="menu.left.news">News</Translate>
            </a>
          </li>
        </ul>

        <ul className="menu right-menu">
          <li>
            <Link to={'/dang-ky'}>
              <Translate contentKey="menu.right.register">Register</Translate>
            </Link>
          </li>
          <li>
            <Link to={'/dang-nhap'}>
              <Translate contentKey="menu.right.login">Login</Translate>
            </Link>
          </li>
          <li>
            <a className="button" href="">
              <Translate contentKey="menu.right.postNews">Post News</Translate>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
