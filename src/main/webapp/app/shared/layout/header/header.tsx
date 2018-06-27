import './header.css';

import * as React from 'react';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse, Container } from 'reactstrap';
import { Translate } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { NavLink as Link, RouteComponentProps } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand, Buy, Rent, News, Support, Register, Login, Post } from './header-components';
import { AdminMenu, ManagerMenu, StaffMenu, CommonMenu, AccountMenu, LocaleMenu } from './menus';
import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isStaff: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { currentLocale, isAuthenticated, isAdmin, isManager, isStaff, isSwaggerEnabled, isInProduction } = this.props;
    const bedroom = [1, 2, 3, 4];
    const bathroom = [1, 2, 3, 4];
    return (
      <header>
        <div className="container">
          <div className="row">
            <div className="logo">
              <a href="/index.html">
                <img src="/static/images/logo.png" alt="LandExp" />
              </a>
            </div>
            <ul className="menu left-menu">
              <li>
                <a href>Mua</a>
              </li>
              <li>
                <a href>Thuê</a>
              </li>
              <li>
                <a href>Trợ giúp</a>
              </li>
              <li>
                <a href>Tin tức</a>
              </li>
            </ul>
            <ul className="menu right-menu">
              <li>
                <a href>Đăng ký</a>
              </li>
              <li>
                <a href>Đăng nhập</a>
              </li>
              <li>
                <a type="button" className="button" href="dang-tin.html">
                  Đăng tin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
