import './header.css';

import * as React from 'react';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { Translate } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { NavLink as Link, RouteComponentProps } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { Row, Col } from 'reactstrap';

import Menu from './banner/menu';
import Search from './search/search';
import Demand from './demand/demand';
import Download from './download/download';
import { Home, Brand, Register, Login, Post } from './header-components';
import { AdminMenu, ManagerMenu, StaffMenu, CommonMenu, AccountMenu, LocaleMenu } from './menus';
import SearchPage from 'app/modules/search/search-page';

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

  handleLocaleChange = event => {
    this.props.onLocaleChange(event.target.value);
  };

  renderDevRibbon = () =>
    this.props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${this.props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const land = [
      {
        value: -1,
        key: 'selectLand'
      },
      {
        value: 0,
        key: 'Chung cu'
      },
      {
        value: 1,
        key: 'Nhà Riêng'
      }
    ];

    const range = [
      {
        value: 0,
        key: 'Dưới 1 tỷ'
      },
      {
        value: 1,
        key: '1 - 2 tỷ'
      },
      {
        value: 2,
        key: '2 - 5 tỷ'
      },
      {
        value: 3,
        key: 'trên 5 tỷ'
      }
    ];

    const { currentLocale, isAuthenticated, isAdmin, isManager, isStaff, isSwaggerEnabled, isInProduction } = this.props;
    const acreage = [
      {
        value: 0,
        key: '80 - 100m2'
      },
      {
        value: 1,
        key: '100 - 150m2'
      },
      {
        value: 2,
        key: 'trên 150m2'
      }
    ];

    const bedroom = [1, 2, 3, 4];
    const bathroom = [1, 2, 3, 4];
    return (
      <div id="app-header">
        <div className="container">
          <Navbar color="light" light expand="sm" className="jh-navbar">
            <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
            <Brand />
            <Collapse isOpen={this.state.menuOpen} navbar>
              <Nav id="header-tabs" className="ml-auto" navbar>
                {!isAuthenticated && <Register />}
                {!isAuthenticated && <Login />}
                {isAuthenticated && isStaff && <CommonMenu />}
                {isAuthenticated && isStaff && <StaffMenu />}
                {isAuthenticated && isManager && <ManagerMenu />}
                {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} showDatabase={!isInProduction} />}
                {isAuthenticated && <AccountMenu isAuthenticated={isAuthenticated} />}
                {isAuthenticated && <Post />}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}
