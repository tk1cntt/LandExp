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
      <div id="app-header">
        <Container>
          <div className="jh-navbar">
            <Navbar color="light" light expand="sm">
              <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
              <Brand />
              <Buy />
              <Rent />
              <News />
              <Support />
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
        </Container>
      </div>
    );
  }
}
